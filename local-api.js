/* Sprechraum yerel API köprüsü.
   Masaüstünde `node server.mjs` çalışıyorsa /api/* istekleri sunucuya gider.
   Sunucu yoksa (GitHub Pages, iOS/Android kabuğu, çevrimdışı) aynı istekler
   tarayıcı içindeki sınav motoruna (exam-engine.js) yönlendirilir. */
(function(){
  'use strict';
  const nativeFetch=window.fetch.bind(window);
  const USER_SOURCES_KEY='sprechraumUserSources';
  let modePromise=null,builtinPromise=null;

  function jsonResponse(status,data){return new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8'}})}
  function apiRoute(input){
    try{
      const url=new URL(typeof input==='string'?input:input.url,location.href);
      if(url.origin!==location.origin)return null;
      const i=url.pathname.indexOf('/api/');
      return i<0?null:url.pathname.slice(i);
    }catch{return null}
  }
  async function detectServer(){
    // Yalnızca gerçek Sprechraum sunucusu /api/ping'e bu cevabı verir.
    try{
      const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),1500);
      const r=await nativeFetch('/api/ping',{signal:controller.signal,cache:'no-store'});clearTimeout(timer);
      if(!r.ok)return false;const d=await r.json();return d?.server==='sprechraum';
    }catch{return false}
  }
  function mode(){
    if(!modePromise)modePromise=detectServer().then(server=>{
      window.SPRECHRAUM_MODE=server?'server':'local';
      document.documentElement.dataset.engine=window.SPRECHRAUM_MODE;
      // Sunucu yokken her cümlede "ses paketi hazır değil" uyarısı çıkmasın: doğrudan cihaz sesi.
      if(!server)try{if(localStorage.getItem('fastNativeVoice')===null)localStorage.setItem('fastNativeVoice','true')}catch{}
      return window.SPRECHRAUM_MODE;
    });
    return modePromise;
  }

  function builtinSources(){
    if(!builtinPromise)builtinPromise=nativeFetch('data/sprechen-themen.json').then(r=>{if(!r.ok)throw Error('Tema paketi yüklenemedi');return r.json()}).then(x=>[x]).catch(()=>{builtinPromise=null;return []});
    return builtinPromise;
  }
  function userSources(){try{return JSON.parse(localStorage.getItem(USER_SOURCES_KEY)||'[]')}catch{return []}}
  function saveUserSources(list){localStorage.setItem(USER_SOURCES_KEY,JSON.stringify(list))}
  async function loadSources(){return [...await builtinSources(),...userSources()].filter(x=>x.themes?.length)}

  const engine=window.createSprechraumEngine({
    loadSources,
    callOllama:()=>Promise.reject(new Error('Bu cihazda yerel yapay zekâ modeli kurulu değil')),
    ollamaFetch:()=>Promise.reject(new Error('Bu cihazda yerel yapay zekâ modeli kurulu değil'))
  });

  async function readBody(init){try{return init?.body?JSON.parse(init.body):{}}catch{return {}}}
  function decodeBase64Utf8(b64){const bin=atob(b64),bytes=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);return new TextDecoder().decode(bytes)}

  async function uploadSource(p){
    const type=String(p.type||'').toLowerCase();
    if(type==='pdf')return jsonResponse(400,{error:'PDF içe aktarma şu an yalnızca masaüstü sürümünde çalışıyor. Metni TXT olarak ekleyebilirsin.'});
    if(!['txt','md','json'].includes(type))return jsonResponse(400,{error:'Desteklenmeyen dosya türü'});
    const text=decodeBase64Utf8(p.data||'');
    if(!text.trim())return jsonResponse(400,{error:'Dosya boş'});
    const themes=engine.parseThemes(text);
    const item={id:`u-${Date.now()}`,name:String(p.name||'Kaynak').slice(0,160),type,size:`${(text.length/1024).toFixed(1)} KB`,chars:text.length,text:'',themes};
    try{saveUserSources([...userSources(),item])}catch{return jsonResponse(507,{error:'Cihazda yeterli alan yok'})}
    return jsonResponse(200,{id:item.id,name:item.name,type,size:item.size,chars:item.chars,themes:themes.length});
  }

  const ENGINE_ROUTES={
    'POST /api/chat':'ollama','POST /api/lesson/evaluate':'lessonEvaluate','POST /api/telc-b1/writing/evaluate':'telcWritingEvaluate',
    'POST /api/words/translate':'translateWord','POST /api/exam/task-guide':'examTaskGuide','POST /api/exam/task-question':'examTaskQuestion',
    'POST /api/exam/start':'examStart','POST /api/exam/hints':'examHints','POST /api/exam/respond':'examRespond',
    'GET /api/themes':'themesList','GET /api/library':'libraryList'
  };
  const OFFLINE_ONLY={
    'GET /api/tts/status':[503,{ok:false,error:'Yüksek kaliteli ses paketi bu cihazda yok; cihaz sesi kullanılıyor.'}],
    'POST /api/tts':[503,{error:'Cihaz sesi kullanılıyor'}],
    'POST /api/health':[200,{ok:false,model:'',models:[]}],
    'POST /api/models/catalog':[503,{error:'Model yöneticisi mobil sürümde hazırlanıyor.'}],
    'POST /api/models/pull':[503,{error:'Model yöneticisi mobil sürümde hazırlanıyor.'}],
    'POST /api/models/delete':[503,{error:'Model yöneticisi mobil sürümde hazırlanıyor.'}]
  };

  async function localApi(route,init={}){
    const key=`${String(init.method||'GET').toUpperCase()} ${route}`;
    if(key==='POST /api/library')return uploadSource(await readBody(init));
    if(ENGINE_ROUTES[key]){const r=await engine.call(ENGINE_ROUTES[key],await readBody(init));return jsonResponse(r.status,r.data)}
    if(OFFLINE_ONLY[key])return jsonResponse(...OFFLINE_ONLY[key]);
    return jsonResponse(404,{error:'Bu işlem çevrimdışı sürümde yok'});
  }

  window.fetch=async function(input,init){
    const route=apiRoute(input);
    if(!route)return nativeFetch(input,init);
    if(await mode()==='server')return nativeFetch(input,init);
    const opts=init||(typeof input==='string'?{}:{method:input.method});
    // AbortSignal desteği: iptal edilen istek gerçek fetch gibi AbortError fırlatır.
    if(opts.signal?.aborted)throw new DOMException('Aborted','AbortError');
    return localApi(route,opts);
  };
  mode();
})();
