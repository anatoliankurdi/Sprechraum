const SPRECHRAUM_EXAMS=[
  {id:'telc-b1',provider:'telc',level:'B1',title:'telc Deutsch B1',short:'telc B1',accent:'blue',sections:[
    {id:'schriftlich',title:'Schriftliche Prüfung',subtitle:'Okuma, dil yapı taşları, dinleme ve yazma',modules:[
      {id:'lesen',icon:'▤',title:'Leseverstehen',description:'Metinleri anlama ve bilgileri eşleştirme',parts:['Teil 1','Teil 2','Teil 3']},
      {id:'sprachbausteine',icon:'Aa',title:'Sprachbausteine',description:'Gramer ve kelime kullanımını sınav biçiminde çalış',parts:['Teil 1','Teil 2']},
      {id:'hoeren',icon:'◖',title:'Hörverstehen',description:'Genel, ayrıntılı ve seçici dinleme',parts:['Teil 1','Teil 2','Teil 3']},
      {id:'schreiben',icon:'✎',title:'Schriftlicher Ausdruck',description:'Göreve uygun mektup veya e-posta yazma',parts:['Schreiben']}
    ]},
    {id:'muendlich',title:'Mündliche Prüfung',subtitle:'Mevcut çalışan konuşma pratiklerin',modules:[
      {id:'vorstellen',icon:'◉',title:'Kontaktaufnahme',description:'Kendini tanıt ve partnerinle iletişim kur',parts:['Teil 1'],action:'vorstellen'},
      {id:'thema',icon:'◫',title:'Über ein Thema sprechen',description:'Deneyimini, fikrini ve gerekçeni anlat',parts:['Teil 2']},
      {id:'planen',icon:'◇',title:'Gemeinsam etwas planen',description:'Öneri yap, tepki ver ve ortak karar al',parts:['Teil 3'],action:'planen'}
    ]}
  ]},
  {id:'telc-b2',provider:'telc',level:'B2',title:'telc Deutsch B2',short:'telc B2',accent:'indigo',sections:[
    {id:'schriftlich',title:'Schriftliche Prüfung',subtitle:'Tüm alt bölümler için büyüyebilir içerik yapısı',modules:[
      {id:'lesen',icon:'▤',title:'Leseverstehen',description:'B2 düzeyi metin ve görevler',parts:['Teil 1','Teil 2','Teil 3']},
      {id:'sprachbausteine',icon:'Aa',title:'Sprachbausteine',description:'B2 gramer ve kelime kullanımı',parts:['Teil 1','Teil 2']},
      {id:'hoeren',icon:'◖',title:'Hörverstehen',description:'B2 dinleme görevleri',parts:['Teil 1','Teil 2','Teil 3']},
      {id:'schreiben',icon:'✎',title:'Schriftlicher Ausdruck',description:'B2 yazma görevi',parts:['Schreiben']}
    ]},
    {id:'muendlich',title:'Mündliche Prüfung',subtitle:'Hazırlık ve sınav simülasyonları',modules:[
      {id:'sprechen-1',icon:'◉',title:'Präsentation',description:'Bir konuyu yapılandırarak sun',parts:['Teil 1']},
      {id:'sprechen-2',icon:'◇',title:'Diskussion und Planung',description:'Tartış, gerekçelendir ve ortak sonuca ulaş',parts:['Teil 2','Teil 3']}
    ]}
  ]},
  {id:'dtz-b1',provider:'g.a.s.t.',level:'A2–B1',title:'Deutsch-Test für Zuwanderer',short:'DTZ A2–B1',accent:'green',sections:[
    {id:'schriftlich',title:'Schriftliche Prüfung',subtitle:'Hören, Lesen ve Schreiben',modules:[
      {id:'hoeren',icon:'◖',title:'Hören',description:'Günlük durumları ve konuşmaları anlama',parts:['Teil 1','Teil 2','Teil 3','Teil 4']},
      {id:'lesen',icon:'▤',title:'Lesen',description:'İlan, mesaj, e-posta ve metinleri anlama',parts:['Teil 1','Teil 2','Teil 3','Teil 4','Teil 5']},
      {id:'schreiben',icon:'✎',title:'Schreiben',description:'Göreve uygun kısa yazılı iletişim',parts:['Schreiben']}
    ]},
    {id:'muendlich',title:'Mündliche Prüfung',subtitle:'Mevcut çalışan avatar pratikleri',modules:[
      {id:'vorstellen',icon:'◉',title:'Sich vorstellen',description:'Kendini düzenli ve anlaşılır tanıt',parts:['Teil 1'],action:'vorstellen'},
      {id:'bild',icon:'▧',title:'Bild beschreiben',description:'Resmi anlat ve kişisel deneyimini paylaş',parts:['Teil 2'],action:'bild'},
      {id:'planen',icon:'◇',title:'Gemeinsam etwas planen',description:'Partnerinle bir çözüm veya plan oluştur',parts:['Teil 3'],action:'planen'}
    ]}
  ]},
  {id:'goethe-b1',provider:'Goethe-Institut',level:'B1',title:'Goethe-Zertifikat B1',short:'Goethe B1',accent:'violet',sections:[
    {id:'module',title:'Prüfungsmodule',subtitle:'Her modülün ayrı alıştırma ve denemeleri',modules:[
      {id:'lesen',icon:'▤',title:'Lesen',description:'Beş bölümden oluşan okuma çalışmaları',parts:['Teil 1','Teil 2','Teil 3','Teil 4','Teil 5']},
      {id:'hoeren',icon:'◖',title:'Hören',description:'Dört bölümden oluşan dinleme çalışmaları',parts:['Teil 1','Teil 2','Teil 3','Teil 4']},
      {id:'schreiben',icon:'✎',title:'Schreiben',description:'Üç farklı yazma görevi',parts:['Teil 1','Teil 2','Teil 3']},
      {id:'sprechen',icon:'◉',title:'Sprechen',description:'Planlama, sunum ve sorulara cevap',parts:['Teil 1','Teil 2','Teil 3'],action:'planen'}
    ]}
  ]},
  {id:'goethe-b2',provider:'Goethe-Institut',level:'B2',title:'Goethe-Zertifikat B2',short:'Goethe B2',accent:'coral',sections:[
    {id:'module',title:'Prüfungsmodule',subtitle:'B2 kaynakları eklendikçe aynı yapıda açılacak',modules:[
      {id:'lesen',icon:'▤',title:'Lesen',description:'B2 okuma modülü',parts:['Teil 1','Teil 2','Teil 3','Teil 4']},
      {id:'hoeren',icon:'◖',title:'Hören',description:'B2 dinleme modülü',parts:['Teil 1','Teil 2','Teil 3','Teil 4']},
      {id:'schreiben',icon:'✎',title:'Schreiben',description:'B2 yazma modülü',parts:['Teil 1','Teil 2']},
      {id:'sprechen',icon:'◉',title:'Sprechen',description:'B2 sözlü modülü',parts:['Teil 1','Teil 2']}
    ]}
  ]}
];

function examCenterEnsureStudent(student=currentStudent()){
  if(!student)return null;
  student.examPlan=student.examPlan||{targetExam:'telc-b1',exams:{}};
  student.examPlan.targetExam=SPRECHRAUM_EXAMS.some(exam=>exam.id===student.examPlan.targetExam)?student.examPlan.targetExam:'telc-b1';
  student.examPlan.exams=student.examPlan.exams||{};
  for(const exam of SPRECHRAUM_EXAMS){
    student.examPlan.exams[exam.id]=student.examPlan.exams[exam.id]||{date:'',completed:[],scores:[],modules:{},lastActivity:null};
  }
  return student.examPlan;
}

function examCenterCurrent(){const plan=examCenterEnsureStudent();return SPRECHRAUM_EXAMS.find(exam=>exam.id===plan?.targetExam)||SPRECHRAUM_EXAMS[0]}
function examCenterTrack(examId=examCenterCurrent().id){return examCenterEnsureStudent()?.exams?.[examId]||{date:'',completed:[],scores:[],modules:{}}}
function examCenterModuleCount(exam){return exam.sections.reduce((sum,section)=>sum+section.modules.reduce((partSum,module)=>partSum+module.parts.length,0),0)}
function examCenterProgress(exam=examCenterCurrent()){const track=examCenterTrack(exam.id),total=Math.max(1,examCenterModuleCount(exam)),done=new Set(track.completed||[]).size;return {done,total,percent:Math.min(100,Math.round(done/total*100))}}
function examCenterDate(date){if(!date)return {label:'Sınav tarihini ekle',days:null};const target=new Date(`${date}T23:59:59`),days=Math.ceil((target-Date.now())/86400000);return {label:new Intl.DateTimeFormat('tr-TR',{day:'numeric',month:'long',year:'numeric'}).format(target),days}}
function examCenterDaysCopy(days){if(days===null)return'Tarihi ekleyince çalışma planın oluşur';if(days<0)return'Sınav tarihi geçti';if(days===0)return'Bugün sınav günü';return `${days} gün kaldı`}

function examCenterRenderModule(module,exam,track){
  const telcPractice=exam.id==='telc-b1'&&!!window.SprechraumTelcB1&&['lesen','sprachbausteine','hoeren','schreiben'].includes(module.id),completed=(track.completed||[]).filter(id=>id.startsWith(`${module.id}:`)).length,available=!!module.action||telcPractice,partCount=module.parts.length;
  return `<article class="exam-module-card ${available?'available':'planned'}"><div class="exam-module-icon">${module.icon}</div><div class="exam-module-copy"><small>${completed} / ${partCount} TAMAMLANDI</small><h4>${escapeHtml(module.title)}</h4><p>${escapeHtml(module.description)}</p><div class="exam-part-pills">${module.parts.map((part,index)=>`<span class="${(track.completed||[]).includes(`${module.id}:${index+1}`)?'done':''}">${escapeHtml(part)}</span>`).join('')}</div></div><button type="button" data-exam-id="${exam.id}" data-exam-module-id="${module.id}" data-exam-module-action="${telcPractice?'telc-b1-practice':module.action||'planned'}" aria-label="${escapeHtml(module.title)} bölümünü aç">${available?'Başla':'Yakında'} <span>→</span></button></article>`
}

function examCenterRender(){
  const app=document.querySelector('#examCenterApp');if(!app)return;
  const exam=examCenterCurrent(),track=examCenterTrack(exam.id),progress=examCenterProgress(exam),date=examCenterDate(track.date),student=currentStudent();
  app.innerHTML=`<section class="exam-center-hero ${exam.accent}"><div class="exam-center-hero-main"><span class="exam-brand">${escapeHtml(exam.provider)} · ${escapeHtml(exam.level)}</span><h2>${escapeHtml(exam.title)}</h2><p>${escapeHtml(student?.name||'Öğrenci')}, rehberin, alıştırmaların, tam denemelerin ve gelişimin bu sınavın altında birlikte tutulur.</p><div class="exam-center-meta"><span><small>SINAV TARİHİ</small><b>${escapeHtml(date.label)}</b></span><span><small>KALAN SÜRE</small><b>${escapeHtml(examCenterDaysCopy(date.days))}</b></span></div></div><button type="button" class="exam-change-button" data-exam-center-action="change"><span>⇄</span><b>Sınavı değiştir</b><small>İlerlemen silinmez</small></button></section>
  <section class="exam-center-progress"><div><small>GENEL HAZIRLIK</small><b>%${progress.percent}</b></div><i><u style="width:${progress.percent}%"></u></i><p><strong>${progress.done}</strong> / ${progress.total} alt bölüm tamamlandı</p></section>
  <nav class="exam-center-actions" aria-label="Sınav araçları"><button type="button" data-exam-center-action="guide"><span>▥</span><b>Sınav rehberi</b><small>Akış, süre ve puanlama</small></button><button type="button" data-exam-center-action="practice"><span>▦</span><b>Alıştırmalar</b><small>Tüm Teil ve testler</small></button><button type="button" data-exam-center-action="simulation"><span>◷</span><b>Tam deneme</b><small>Süreli sınav akışı</small></button><button type="button" data-exam-center-action="progress"><span>↗</span><b>Gelişimim</b><small>Güçlü ve eksik alanlar</small></button></nav>
  <section class="exam-center-roadmap" id="examPracticeRoadmap"><header><div><span class="eyebrow">SINAVIN KENDİ AKIŞI</span><h3>Alıştırmalar ve alt bölümler</h3><p>Kaynaklar eklendikçe her Teil, test ve gramer bağlantısı bu yapının içinde açılır.</p></div><button type="button" data-exam-center-action="grammar">Gramer kütüphanesi →</button></header>${exam.sections.map((section,index)=>`<section class="exam-flow-section"><div class="exam-flow-heading"><span>${String(index+1).padStart(2,'0')}</span><div><h3>${escapeHtml(section.title)}</h3><p>${escapeHtml(section.subtitle)}</p></div></div><div class="exam-module-grid">${section.modules.map(module=>examCenterRenderModule(module,exam,track)).join('')}</div></section>`).join('')}</section>`;
}

function examCenterOpenTarget(){
  const dialog=document.querySelector('#examTargetDialog'),plan=examCenterEnsureStudent(),selected=plan.targetExam;
  document.querySelector('#examTargetOptions').innerHTML=SPRECHRAUM_EXAMS.map(exam=>{const progress=examCenterProgress(exam),track=examCenterTrack(exam.id);return `<label class="exam-target-option ${exam.id===selected?'selected':''}"><input type="radio" name="targetExam" value="${exam.id}" ${exam.id===selected?'checked':''}><span class="exam-target-logo ${exam.accent}">${escapeHtml(exam.provider.slice(0,2))}</span><span><b>${escapeHtml(exam.title)}</b><small>${track.date?examCenterDate(track.date).label:'Tarih eklenmedi'} · %${progress.percent} tamamlandı</small></span><em>✓</em></label>`}).join('');
  document.querySelector('#examTargetDate').value=examCenterTrack(selected).date||'';
  dialog.showModal();
}

function examCenterSelectTarget(input){
  document.querySelectorAll('.exam-target-option').forEach(option=>option.classList.toggle('selected',option.contains(input)));
  document.querySelector('#examTargetDate').value=examCenterTrack(input.value).date||'';
}

function examCenterSaveTarget(){
  const input=document.querySelector('input[name="targetExam"]:checked');if(!input)return;
  const student=currentStudent(),plan=examCenterEnsureStudent(student),old=plan.targetExam;plan.targetExam=input.value;plan.exams[input.value].date=document.querySelector('#examTargetDate').value||'';saveStudentProfiles();document.querySelector('#examTargetDialog').close();examCenterSyncStudent();toast(old===input.value?'Sınav planın güncellendi.':'Hedef sınavın değişti; önceki ilerlemen korunuyor.');
}

function examCenterSyncStudent(){examCenterEnsureStudent();saveStudentProfiles();examCenterRender();examCenterRenderProgress();examCenterSyncMini()}
function examCenterSyncMini(){const exam=examCenterCurrent(),track=examCenterTrack(exam.id),progress=examCenterProgress(exam),date=examCenterDate(track.date);document.querySelector('#examGoalMiniLevel').textContent=`${exam.short} yolculuğu`;document.querySelector('#examGoalMiniPercent').textContent=`%${progress.percent}`;document.querySelector('#examGoalMiniBar').style.width=`${progress.percent}%`;document.querySelector('#examGoalMiniText').textContent=`Hedef: ${exam.short} · ${date.days===null?'tarih ekle':examCenterDaysCopy(date.days)}`}

function examCenterRenderProgress(){
  const root=document.querySelector('#examProgressOverview');if(!root)return;const exam=examCenterCurrent(),track=examCenterTrack(exam.id),progress=examCenterProgress(exam),date=examCenterDate(track.date),scores=track.scores||[],average=scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):null;
  root.innerHTML=`<section class="exam-progress-overview ${exam.accent}"><div><small>HEDEF SINAV</small><h3>${escapeHtml(exam.title)}</h3><p>${escapeHtml(examCenterDaysCopy(date.days))}${date.days===null?' — planını oluşturmak için tarih ekle.':` · ${escapeHtml(date.label)}`}</p></div><div class="exam-progress-ring" style="--value:${progress.percent}"><span><b>${progress.percent}%</b><small>hazırlık</small></span></div><div class="exam-progress-actions"><button type="button" data-exam-center-action="change">Hedefi düzenle</button><button type="button" data-exam-center-action="open">Sınav merkezine git</button></div><footer><span><small>ALT BÖLÜM</small><b>${progress.done}/${progress.total}</b></span><span><small>DENEME ORTALAMASI</small><b>${average===null?'—':`${average}/100`}</b></span><span><small>KAYIT</small><b>Bu öğrenciye özel</b></span></footer></section>`;
}

function examCenterHandleAction(action){
  if(action==='change')return examCenterOpenTarget();
  if(action==='guide')return navigate('exam-guide');
  if(action==='practice'){document.querySelector('#examPracticeRoadmap')?.scrollIntoView({behavior:'smooth',block:'start'});return}
  if(action==='simulation')return toast('Tam sınav denemeleri kaynaklar eklendikçe burada açılacak.');
  if(action==='progress')return navigate('progress');
  if(action==='grammar')return navigate('grammar');
  if(action==='open')return navigate('exam');
}

function examCenterHandleModule(action,moduleId,examId){
  if(action==='telc-b1-practice'&&examId==='telc-b1')return window.SprechraumTelcB1?.open(moduleId);
  if(action==='planen'){state.mode='planen';return navigate('practice')}
  if(action==='vorstellen'||action==='bild')return openOralPart(action);
  toast('Bu alt bölümün kaynak ve testleri hazırlanıyor.');
}

document.addEventListener('click',event=>{const action=event.target.closest('[data-exam-center-action]'),module=event.target.closest('[data-exam-module-action]');if(action)return examCenterHandleAction(action.dataset.examCenterAction);if(module)return examCenterHandleModule(module.dataset.examModuleAction,module.dataset.examModuleId,module.dataset.examId)});
document.querySelector('#examTargetOptions')?.addEventListener('change',event=>{if(event.target.matches('input[name="targetExam"]'))examCenterSelectTarget(event.target)});
document.querySelector('#saveExamTarget')?.addEventListener('click',examCenterSaveTarget);

window.SprechraumExamCenter={render:examCenterRender,renderProgress:examCenterRenderProgress,syncStudent:examCenterSyncStudent,catalog:SPRECHRAUM_EXAMS};
examCenterSyncStudent();
