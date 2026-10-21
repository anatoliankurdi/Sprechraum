(function(){
  const DATA=window.TELC_B1_PRACTICE;
  if(!DATA)return;
  const session={moduleId:'lesen',partIndex:0,answers:{},checked:false};
  const esc=value=>typeof escapeHtml==='function'?escapeHtml(String(value??'')):String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const student=()=>typeof currentStudent==='function'?currentStudent():null;
  function track(){
    const s=student();if(!s)return null;
    s.examPlan=s.examPlan||{targetExam:'telc-b1',exams:{}};
    s.examPlan.exams=s.examPlan.exams||{};
    const t=s.examPlan.exams['telc-b1']=s.examPlan.exams['telc-b1']||{date:'',completed:[],scores:[],modules:{},lastActivity:null};
    t.modules=t.modules||{};t.modules.telcB1Practice=t.modules.telcB1Practice||{parts:{},writing:[]};
    return t;
  }
  function save(){if(typeof saveStudentProfiles==='function')saveStudentProfiles();window.SprechraumExamCenter?.renderProgress?.()}
  function module(){return DATA.modules[session.moduleId]}
  function part(){return module().parts[session.partIndex]}
  function progressFor(id){return track()?.modules?.telcB1Practice?.parts?.[id]||null}
  function open(moduleId){
    if(!DATA.modules[moduleId])return;
    session.moduleId=moduleId;session.partIndex=0;session.answers={};session.checked=false;render();
  }
  function close(){window.SprechraumExamCenter?.render?.()}
  function optionsFor(q,p){return q.options||p.sharedOptions||{}}
  function renderQuestion(q,p){
    const picked=session.answers[q.n],opts=optionsFor(q,p);
    return `<article class="telc-question ${session.checked?(picked===q.answer?'correct':'wrong'):''}"><header><b>${q.n}</b><p>${esc(q.prompt)}</p>${q.audio?`<button type="button" class="telc-play" data-telc-audio="${q.n}" aria-label="Metni dinle">▶</button>`:''}</header>${q.audio&&session.checked?`<details class="telc-source"><summary>Transkript</summary><p>${esc(q.audio)}</p></details>`:''}<div class="telc-options">${Object.entries(opts).map(([key,label])=>`<button type="button" data-telc-answer="${q.n}" data-value="${esc(key)}" class="${picked===key?'selected':''} ${session.checked&&key===q.answer?'answer-key':''}" ${session.checked?'disabled':''}><i>${esc(key.toUpperCase())}</i><span>${esc(label)}</span></button>`).join('')}</div>${session.checked&&picked!==q.answer?`<small class="telc-correction">Doğru cevap: <b>${esc(q.answer.toUpperCase())}</b> · ${esc(opts[q.answer])}</small>`:''}</article>`;
  }
  function renderPart(p){
    if(session.moduleId==='schreiben')return renderWriting(p);
    const previous=progressFor(p.id);
    return `<section class="telc-practice-body">
      ${p.audio?`<div class="telc-audio-note"><button type="button" class="telc-play" data-telc-audio="part">▶ Dinle</button><div><b>Ses metni</b><p>Cihazın Almanca sesiyle okunur. Önce soruları oku, sonra dinle.</p></div></div>${session.checked?`<details class="telc-source"><summary>Transkript</summary><p>${esc(p.audio)}</p></details>`:''}`:''}
      <header class="telc-part-head"><div><small>${esc(module().title)}</small><h2>${esc(p.title)}</h2><p>${esc(p.instruction)}</p></div>${previous?`<span class="telc-best">En iyi: %${previous.best}</span>`:''}</header>
      ${p.source?`<details class="telc-source" open><summary>${esc(p.sourceTitle||'Metin')}</summary><p>${esc(p.source)}</p></details>`:''}
      ${p.sharedOptions?`<details class="telc-wordbank"><summary>Seçenekleri göster</summary><div>${Object.entries(p.sharedOptions).map(([k,v])=>`<span><b>${esc(k.toUpperCase())}</b>${esc(v)}</span>`).join('')}</div></details>`:''}
      <div class="telc-question-list">${p.questions.map(q=>renderQuestion(q,p)).join('')}</div>
      <footer class="telc-submit-row">${session.checked?'<button type="button" class="secondary" data-telc-action="retry">Tekrar çöz</button>':''}<button type="button" data-telc-action="check" ${session.checked||Object.keys(session.answers).length<p.questions.length?'disabled':''}>${session.checked?'Değerlendirildi':'Bölümü değerlendir'}</button></footer>
    </section>`;
  }
  function render(){
    const root=document.querySelector('#examCenterApp');if(!root)return;
    const m=module(),p=part();
    root.innerHTML=`<section class="telc-practice-shell"><header class="telc-practice-top"><button type="button" data-telc-action="back">← Sınav merkezi</button><div><small>${esc(DATA.title)} · ${esc(DATA.pack)}</small><h1>${esc(m.title)}</h1></div><span>Yerel kayıt</span></header><nav class="telc-part-tabs">${m.parts.map((item,index)=>`<button type="button" data-telc-part="${index}" class="${index===session.partIndex?'active':''} ${progressFor(item.id)?'done':''}"><i>${progressFor(item.id)?'✓':index+1}</i>${esc(item.title.split('·')[0].trim())}</button>`).join('')}</nav>${renderPart(p)}</section>`;
    root.scrollIntoView({block:'start'});
  }
  function playAudio(key){
    const p=part(),text=key==='part'?p.audio:p.questions.find(q=>String(q.n)===key)?.audio;
    if(!text||!('speechSynthesis'in window)){if(typeof toast==='function')toast('Bu cihazda Almanca ses kullanılamıyor.');return}
    speechSynthesis.cancel();
    // Röportajdaki konuşmacılar "—" ile ayrılır; her bölüm ayrı cümle olarak okunur.
    const voices=speechSynthesis.getVoices().filter(v=>/^de/i.test(v.lang));
    text.split(' — ').forEach((chunk,i)=>{const u=new SpeechSynthesisUtterance(chunk.replace(/^[^:]{2,20}:\s*/,''));u.lang='de-DE';u.rate=.92;if(voices.length)u.voice=voices[i%Math.min(2,voices.length)];speechSynthesis.speak(u)});
  }
  function choose(number,value){if(session.checked)return;session.answers[number]=value;render()}
  function check(){
    const p=part();if(!p.questions||Object.keys(session.answers).length<p.questions.length)return;
    const correct=p.questions.filter(q=>session.answers[q.n]===q.answer).length,percent=Math.round(correct/p.questions.length*100),t=track();
    const entry=t.modules.telcB1Practice.parts[p.id]=t.modules.telcB1Practice.parts[p.id]||{attempts:0,best:0,last:0};
    entry.attempts++;entry.last=percent;entry.best=Math.max(entry.best,percent);entry.updatedAt=new Date().toISOString();
    t.completed=t.completed||[];const completeKey=`${session.moduleId}:${session.partIndex+1}`;if(percent>=60&&!t.completed.includes(completeKey))t.completed.push(completeKey);
    t.scores=t.scores||[];t.scores.push(percent);if(t.scores.length>50)t.scores=t.scores.slice(-50);t.lastActivity=new Date().toISOString();save();session.checked=true;render();
    if(typeof toast==='function')toast(`${correct}/${p.questions.length} doğru · %${percent}`);
  }
  function retry(){session.answers={};session.checked=false;render()}
  function renderWriting(p){
    const history=track()?.modules?.telcB1Practice?.writing||[],last=history.at(-1);
    return `<section class="telc-practice-body telc-writing"><header class="telc-part-head"><div><small>Schriftlicher Ausdruck</small><h2>${esc(p.title)}</h2><p>${esc(p.instruction)}</p></div>${last?`<span class="telc-best">Sonuç: ${last.total}/15</span>`:''}</header><article class="telc-writing-task"><small>AUFGABE</small><h3>${esc(p.task)}</h3><ul>${p.bullets.map(b=>`<li><span>□</span>${esc(b.label)}</li>`).join('')}</ul><p>Betreff · Anrede · Einleitung · alle vier Punkte · Schluss und Grußformel</p></article><label class="telc-letter"><span>E-postanı Almanca yaz <b id="telcWordCount">0 kelime</b></span><textarea id="telcWritingText" rows="14" placeholder="Betreff: ...\n\nLieber Jonas,\n..."></textarea></label><div class="telc-submit-row"><button type="button" data-telc-action="evaluate-writing">TELC ölçütleriyle değerlendir</button></div><div id="telcWritingResult"></div></section>`;
  }
  async function evaluateWriting(){
    const input=document.querySelector('#telcWritingText'),button=document.querySelector('[data-telc-action="evaluate-writing"]'),result=document.querySelector('#telcWritingResult'),text=input?.value.trim()||'';
    if(text.split(/\s+/).filter(Boolean).length<35){if(typeof toast==='function')toast('Değerlendirme için en az 35 kelime yaz.');return}
    button.disabled=true;button.textContent='Yerel öğretmen değerlendiriyor…';
    try{
      const settings=(typeof state!=='undefined'&&state.settings)||{};
      const response=await fetch('/api/telc-b1/writing/evaluate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text,ollamaUrl:settings.url||'http://127.0.0.1:11434',model:settings.model||'gemma3:4b-it-qat'})});
      const data=await response.json();if(!response.ok)throw Error(data.error||'Değerlendirme yapılamadı');
      const t=track(),record={...data,at:new Date().toISOString(),wordCount:text.split(/\s+/).filter(Boolean).length};t.modules.telcB1Practice.writing.push(record);t.modules.telcB1Practice.writing=t.modules.telcB1Practice.writing.slice(-20);t.completed=t.completed||[];if(data.total>=9&&!t.completed.includes('schreiben:1'))t.completed.push('schreiben:1');t.scores=t.scores||[];t.scores.push(Math.round(data.total/15*100));save();
      result.innerHTML=writingResult(data);result.scrollIntoView({behavior:'smooth',block:'start'});
    }catch(error){result.innerHTML=`<div class="telc-eval error"><b>Değerlendirme tamamlanamadı</b><p>${esc(error.message)}</p></div>`}finally{button.disabled=false;button.textContent='TELC ölçütleriyle değerlendir'}
  }
  function writingResult(d){
    return `<section class="telc-eval"><header><div><small>DENEME DEĞERLENDİRMESİ · ${d.engine==='ollama'?'YEREL OLLAMA':'YEREL KURAL KONTROLÜ'}</small><h3>${d.total} / 15 puan</h3></div><span>%${Math.round(d.total/15*100)}</span></header><div class="telc-score-grid"><span><small>Aufgabenbewältigung</small><b>${d.scores.task}/5</b></span><span><small>Kommunikative Gestaltung</small><b>${d.scores.communication}/5</b></span><span><small>Formale Richtigkeit</small><b>${d.scores.accuracy}/5</b></span></div><p>${esc(d.summaryTr)}</p><h4>Görev noktaları</h4><ul class="telc-coverage">${d.coverage.map(c=>`<li class="${c.covered?'yes':'no'}"><b>${c.covered?'✓':'!'} ${esc(c.label)}</b><span>${esc(c.feedbackTr||'')}</span></li>`).join('')}</ul>${d.corrections?.length?`<h4>Düzeltmeler</h4><div class="telc-corrections">${d.corrections.map(c=>`<p><del>${esc(c.original)}</del><ins>${esc(c.corrected)}</ins><small>${esc(c.reasonTr||'')}</small></p>`).join('')}</div>`:''}<h4>Çalışabileceğin kalıplar</h4><div class="telc-redemittel">${(d.redemittel||[]).map(x=>`<span>${esc(x)}</span>`).join('')}</div><small class="telc-disclaimer">Bu sonuç çalışma amaçlı yapay zekâ değerlendirmesidir; resmi telc sınav sonucu değildir.</small></section>`;
  }
  document.addEventListener('click',event=>{
    const audio=event.target.closest('[data-telc-audio]');if(audio)return playAudio(audio.dataset.telcAudio);
    const answer=event.target.closest('[data-telc-answer]');if(answer)return choose(answer.dataset.telcAnswer,answer.dataset.value);
    const tab=event.target.closest('[data-telc-part]');if(tab){session.partIndex=Number(tab.dataset.telcPart);session.answers={};session.checked=false;return render()}
    const action=event.target.closest('[data-telc-action]')?.dataset.telcAction;
    if(action==='back')return close();if(action==='check')return check();if(action==='retry')return retry();if(action==='evaluate-writing')return evaluateWriting();
  });
  document.addEventListener('input',event=>{if(event.target.id==='telcWritingText'){const count=event.target.value.trim()?event.target.value.trim().split(/\s+/).length:0;const label=document.querySelector('#telcWordCount');if(label)label.textContent=`${count} kelime`}});
  window.SprechraumTelcB1={open,render};
})();
