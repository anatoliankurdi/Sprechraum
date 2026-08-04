(()=>{
  const intro=document.getElementById('sprechraumIntro');
  if(!intro)return;
  const model=document.getElementById('introMascotModel'),nameNode=document.getElementById('introStudentName'),skip=document.getElementById('introSkip'),reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let finished=false,exitTimer=0,entrancePlayed=false,sequenceStarted=false;
  const getStudentName=()=>{try{const profiles=JSON.parse(localStorage.getItem('sprechraumStudentProfiles')||'[]'),currentId=localStorage.getItem('sprechraumCurrentStudent');return (profiles.find(profile=>profile.id===currentId)||profiles[0])?.name||'İlyas'}catch{return'İlyas'}};
  const finish=()=>{if(finished)return;finished=true;clearTimeout(exitTimer);intro.classList.add('is-leaving');intro.setAttribute('aria-hidden','true');setTimeout(()=>{intro.remove();document.body.classList.remove('sprechraum-intro-active')},520)};
  const startSequence=()=>{if(sequenceStarted)return;sequenceStarted=true;setTimeout(()=>intro.classList.add('show-greeting'),850);setTimeout(()=>intro.classList.add('show-question'),1700);exitTimer=setTimeout(finish,4000)};
  const revealModel=()=>{if(entrancePlayed)return;entrancePlayed=true;intro.classList.add('show-mascot');try{model.currentTime=0;const result=model.play?.({repetitions:1});if(result?.catch)result.catch(()=>{})}catch{}startSequence()};
  nameNode.textContent=getStudentName();document.body.classList.add('sprechraum-intro-active');requestAnimationFrame(()=>intro.classList.add('show-brand'));
  model.addEventListener('load',revealModel,{once:true});model.addEventListener('error',()=>{model.classList.add('has-error');revealModel()},{once:true});
  setTimeout(revealModel,reduceMotion?120:1800);
  skip.addEventListener('click',finish);document.addEventListener('keydown',event=>{if(event.key==='Escape'||event.key==='Enter')finish()},{once:true});
})();
