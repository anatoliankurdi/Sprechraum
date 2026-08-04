(function () {
  const course = window.SPRECHRAUM_A1_COURSE;
  if (!course) return;
  const KEY = 'sprechraum-a1-path-v2';
  const boundRoots = new WeakSet();
  let root = null;
  let state = {
    screen: 'path', lessonId: null, phase: 0, heard: [], matched: [], matchSelection: {},
    quizIndex: 0, quizSelected: '', quizChecked: false, buildChosen: [], buildChecked: false,
    activeLetter: -1, introPlaying: false, pronunciationIndex: 0,
    pronunciationStatus: 'idle', pronunciationTranscript: '', pronunciationAttempts: 0
  };
  let alphabetIntroRun = 0;
  let lastAutoSpeechKey = '';
  let alphabetAdvanceTimer = 0;
  let pronunciationRecognition = null;

  const readProgress = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{"completed":[],"xp":0}') } catch { return { completed: [], xp: 0 } } };
  const saveProgress = progress => localStorage.setItem(KEY, JSON.stringify(progress));
  const esc = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const allLessons = () => course.units.flatMap((unit, unitIndex) => unit.lessons.map((lesson, lessonIndex) => ({ ...lesson, unit, unitIndex, lessonIndex })));
  const lessonById = id => allLessons().find(lesson => lesson.id === id);
  const currentLesson = () => lessonById(state.lessonId);
  const progress = () => readProgress();
  const total = course.totalLessons;
  const percent = () => Math.round(progress().completed.length / total * 100);
  const normalize = value => String(value).toLocaleLowerCase('de-DE').replace(/[.!?,;:…]/g, '').replace(/\s+/g, ' ').trim();
  const spokenName = item => item[5] || item[0];
  const phoneticHelp = item => item[3] || item[1];
  const pronunciationRule = item => item[4] || `${item[0]} sesini ${item[1]} kelimesinde dinle.`;
  const shuffle = array => array.map((value, index) => ({ value, key: (index * 17 + 11) % 31 })).sort((a, b) => a.key - b.key).map(item => item.value);

  async function speak(text, rate = .84) {
    if (window.SprechraumAudio?.speak) {
      const played = await window.SprechraumAudio.speak(text, { resume:false, lang:'de' });
      if (played) return true;
    }
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE'; utterance.rate = rate; utterance.pitch = 1;
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices.find(voice => /^de[-_]/i.test(voice.lang) && /premium|enhanced|natural|anna|petra|katja/i.test(voice.name)) || voices.find(voice => /^de[-_]/i.test(voice.lang)) || null;
    return new Promise(resolve => {
      utterance.onend = () => resolve(true);
      utterance.onerror = () => resolve(false);
      speechSynthesis.speak(utterance);
    });
  }

  function render(target = root) {
    root = target;
    if (!root) return;
    root.classList.add('a1-course-host');
    bindRoot(root);
    state.screen === 'lesson' ? renderLesson() : renderPath();
  }

  function levelTabs() {
    return `<nav class="a1-level-tabs" aria-label="Gramer seviyesi">${['A1','A2','B1','B2','C1','C2'].map(level => `<button type="button" data-grammar-level="${level}" class="${level === 'A1' ? 'active' : ''}">${level}</button>`).join('')}</nav>`;
  }

  function renderPath() {
    const p = progress(), completed = new Set(p.completed), unlockIndex = p.completed.length;
    root.innerHTML = `<section class="a1-path-hero">
      <div><span>A1 · SIFIRDAN ALMANCA</span><h2>Almancaya ilk adımdan başla</h2><p>Her ders: kısa anlatım → dinleme → aktif alıştırma → anında geri bildirim.</p></div>
      <div class="a1-path-score"><b>${percent()}%</b><span><strong>${p.completed.length}/${total}</strong> ders · ${p.xp || 0} XP</span></div>
    </section>${levelTabs()}
    <section class="a1-path-guide"><span>◎</span><div><b>Nasıl ilerler?</b><p>Yeşil dersten başla. Önce sesi dinle, sonra seçerek ve sıralayarak uygula. Bitirdiğin ders bir sonrakini açar.</p></div></section>
    <div class="a1-units">${course.units.map((unit, unitIndex) => unitMarkup(unit, unitIndex, completed, unlockIndex)).join('')}</div>`;
  }

  function unitMarkup(unit, unitIndex, completed, unlockIndex) {
    const globalStart = course.units.slice(0, unitIndex).reduce((sum, current) => sum + current.lessons.length, 0);
    const unitDone = unit.lessons.filter(lesson => completed.has(lesson.id)).length;
    const locked = globalStart > unlockIndex;
    return `<section class="a1-unit ${locked ? 'locked' : ''}" style="--unit:${unit.color}">
      <header><span>${unit.icon}</span><div><small>ÜNİTE ${unitIndex + 1} · ${unitDone}/${unit.lessons.length}</small><h3>${esc(unit.title)}</h3><p>${esc(unit.subtitle)}</p></div>${unitDone === unit.lessons.length ? '<strong>✓</strong>' : ''}</header>
      <div class="a1-lesson-path">${unit.lessons.map((lesson, lessonIndex) => {
        const globalIndex = globalStart + lessonIndex, done = completed.has(lesson.id), available = done || globalIndex <= unlockIndex;
        return `<button type="button" data-a1-lesson="${esc(lesson.id)}" class="${done ? 'done' : available ? 'current' : 'locked'}" ${available ? '' : 'disabled'} style="--step:${lessonIndex % 2 ? 1 : -1}"><i>${done ? '✓' : lesson.checkpoint ? '★' : lessonIndex + 1}</i><span><b>${esc(lesson.title)}</b><small>${done ? 'Tekrar çalış' : available ? 'Başla · 5–8 dk' : 'Önceki dersi tamamla'}</small></span></button>`;
      }).join('')}</div>
    </section>`;
  }

  function renderLesson() {
    const lesson = currentLesson();
    if (!lesson) { state.screen = 'path'; return renderPath(); }
    const phases = lesson.type === 'alphabet' ? ['Sırayla öğren','Sesi seç','Kelimede bul','Telaffuz et'] : ['Öğren','Eşleştir','Seç','Cümle kur'];
    root.innerHTML = `<section class="a1-lesson-shell" style="--unit:${lesson.unit.color}">
      <header class="a1-lesson-top"><button type="button" data-a1-exit aria-label="Ders yoluna dön">×</button><div>${phases.map((name,index)=>`<i class="${index < state.phase ? 'done' : index === state.phase ? 'active' : ''}" title="${name}"></i>`).join('')}</div><strong>${state.phase + 1}/${phases.length}</strong></header>
      <div class="a1-lesson-title"><small>ÜNİTE ${lesson.unitIndex + 1} · DERS ${lesson.lessonIndex + 1}</small><h2>${esc(lesson.title)}</h2><p>${esc(lesson.goal)}</p></div>
      <main class="a1-activity">${state.phase === 0 ? teachMarkup(lesson) : state.phase === 1 ? matchMarkup(lesson) : state.phase === 2 ? quizMarkup(lesson) : lesson.type === 'alphabet' ? pronunciationMarkup(lesson) : buildMarkup(lesson)}</main>
    </section>`;
    if (lesson.type === 'alphabet') {
      if (state.phase === 0 && !state.introPlaying && state.heard.length < lesson.letters.length) queueMicrotask(() => playAlphabetIntro(lesson));
      if (state.phase === 1 || state.phase === 2) queueMicrotask(() => autoPlayAlphabetQuestion(lesson));
      if (state.phase === 3 && state.pronunciationStatus === 'idle') queueMicrotask(() => autoPlayPronunciation(lesson));
    }
  }

  function teachMarkup(lesson) {
    if (lesson.type === 'alphabet') return alphabetTeachMarkup(lesson);
    return `<section class="a1-teach"><div class="a1-teacher-note"><span>i</span><p>${esc(lesson.explanation)}</p></div>
      <div class="a1-word-cards">${lesson.words.map((word,index)=>`<button type="button" data-a1-speak="${esc(word[2] || word[0])}" data-a1-heard="${index}" class="${state.heard.includes(index) ? 'heard' : ''}"><span>🔊</span><b>${esc(word[0])}</b><small>${esc(word[1])}</small></button>`).join('')}</div>
      <div class="a1-examples"><small>CÜMLE İÇİNDE GÖR</small>${lesson.examples.map(example=>`<button type="button" data-a1-speak="${esc(example)}"><span>${esc(example)}</span><i>▶</i></button>`).join('')}</div>
      <footer><span>${esc(lesson.source)}</span><button type="button" data-a1-next>Hazırım, eşleştirmeye geç →</button></footer></section>`;
  }

  function alphabetTeachMarkup(lesson) {
    const allHeard = lesson.letters.every((_, index) => state.heard.includes(index));
    return `<section class="a1-teach a1-alphabet-teach"><div class="a1-teacher-note"><span>🔊</span><p>Maskot harfleri ve örnek kelimeleri sırayla otomatik okuyacak. Bu bölüm öğretimdir; alıştırmada kelime ve görsel cevabı ele vermeyecek.</p></div>
      <div class="a1-letter-grid">${lesson.letters.map((item,index)=>`<button type="button" data-a1-speak="${esc(`${spokenName(item)}. ${item[1]}.`)}" data-a1-heard="${index}" class="${state.heard.includes(index) ? 'heard' : ''} ${state.activeLetter === index ? 'active' : ''}" ${state.introPlaying ? 'disabled' : ''}>${miniMascotMarkup(index, state.activeLetter === index ? 'talking' : state.heard.includes(index) ? 'proud' : 'idle')}<b>${esc(item[0])}</b><small>${esc(item[2])} ${esc(item[1])}</small><em>${esc(phoneticHelp(item))}</em><span>${state.heard.includes(index) ? '✓' : state.activeLetter === index ? '●' : '▶'}</span></button>`).join('')}</div>
      ${state.activeLetter >= 0 ? `<aside class="a1-pronunciation-rule"><b>${esc(lesson.letters[state.activeLetter][0])} · ${esc(lesson.letters[state.activeLetter][1])}</b><span>${esc(pronunciationRule(lesson.letters[state.activeLetter]))}</span><i>Türkçe ses yardımı: ${esc(phoneticHelp(lesson.letters[state.activeLetter]))}</i></aside>` : ''}
      <div class="a1-listen-status"><b>${state.heard.length}/${lesson.letters.length}</b><span>${state.introPlaying ? 'Maskot otomatik anlatıyor…' : allHeard ? 'Tüm harfleri dinledin' : 'Harfleri sırayla dinle'}</span></div>
      <footer><span>${esc(lesson.source)}</span><button type="button" data-a1-next ${allHeard ? '' : 'disabled'}>${allHeard ? 'Şimdi yalnızca sesi dinle →' : 'Otomatik anlatım sürüyor'}</button></footer></section>`;
  }

  function miniMascotMarkup(variant = 0, mood = 'idle') {
    return alphabetMascotMarkup(mood, true, variant);
  }

  function alphabetMascotMarkup(mood = 'listen', mini = false, variant = 0) {
    const accents = ['#2f80ed','#7b61ff','#ff9f1c','#22a06b','#e0568a'];
    const label = mood === 'happy' || mood === 'proud' ? 'Maskot seviniyor' : mood === 'sad' ? 'Maskot komik biçimde üzülüyor' : mood === 'talking' ? 'Maskot konuşuyor' : 'Maskot dinliyor';
    return `<span class="a1-fox-mascot ${mini ? 'mini' : 'large'} ${mood}" style="--mascot-accent:${accents[variant % accents.length]}" role="img" aria-label="${label}">
      <svg viewBox="0 0 180 170" aria-hidden="true" focusable="false">
        <ellipse class="shadow" cx="91" cy="157" rx="55" ry="10"/>
        <path class="tail" d="M137 119c32-7 35 25 13 32-18 6-30-5-27-16 2-7 7-12 14-16Z"/>
        <path class="tail-tip" d="M151 125c14 4 13 17 3 22-6 3-13 2-18-1 10-4 15-11 15-21Z"/>
        <path class="ear ear-left" d="M48 54 38 10c-1-5 5-8 9-5l31 28Z"/>
        <path class="ear ear-right" d="m130 54 12-43c1-5-5-9-9-5l-31 27Z"/>
        <path class="inner-ear ear-left" d="M52 39 46 18l18 17Z"/>
        <path class="inner-ear ear-right" d="m126 39 7-21-18 17Z"/>
        <ellipse class="body" cx="90" cy="120" rx="48" ry="41"/>
        <path class="belly" d="M66 115c4-18 44-18 49 0 6 22-7 36-24 36-18 0-30-15-25-36Z"/>
        <path class="scarf" d="M48 95c20 10 63 11 84 0l-4 19c-25 8-51 7-76 0Z"/>
        <path class="scarf-tail" d="m119 106 18 10-10 28-15-8Z"/>
        <g class="arm arm-left"><path d="M54 112c-18 6-22 21-12 27 8 5 19-4 26-16Z"/><circle cx="43" cy="133" r="8"/></g>
        <g class="arm arm-right"><path d="M126 111c18 5 23 20 13 27-8 6-20-3-27-15Z"/><circle cx="139" cy="131" r="8"/></g>
        <ellipse class="foot foot-left" cx="70" cy="151" rx="17" ry="9"/>
        <ellipse class="foot foot-right" cx="111" cy="151" rx="17" ry="9"/>
        <path class="head" d="M39 61c4-33 31-48 53-48 26 0 49 18 52 49 4 42-20 62-53 62-35 0-57-22-52-63Z"/>
        <path class="face-patch patch-left" d="M48 64c3-23 24-28 39-14 8 8 3 39-16 45-15 5-26-12-23-31Z"/>
        <path class="face-patch patch-right" d="M134 64c-3-23-24-28-39-14-8 8-3 39 16 45 15 5 26-12 23-31Z"/>
        <ellipse class="cheek cheek-left" cx="61" cy="89" rx="12" ry="7"/>
        <ellipse class="cheek cheek-right" cx="121" cy="89" rx="12" ry="7"/>
        <g class="eye eye-left"><ellipse cx="69" cy="65" rx="10" ry="14"/><circle class="pupil" cx="71" cy="68" r="6"/><circle class="glint" cx="74" cy="63" r="2"/></g>
        <g class="eye eye-right"><ellipse cx="112" cy="65" rx="10" ry="14"/><circle class="pupil" cx="110" cy="68" r="6"/><circle class="glint" cx="113" cy="63" r="2"/></g>
        <ellipse class="muzzle" cx="90" cy="87" rx="22" ry="17"/>
        <path class="nose" d="M82 80c3-6 14-6 17 0 1 5-4 8-8 8-5 0-10-3-9-8Z"/>
        <path class="mouth" d="M82 93q8 8 17 0"/>
        <path class="tear" d="M126 79c8 11 3 18-3 18s-8-8 3-18Z"/>
        <g class="brows"><path d="M57 48q11-8 21 0"/><path d="M103 48q11-8 21 0"/></g>
      </svg>
    </span>`;
  }

  async function playAlphabetIntro(lesson) {
    if (state.screen !== 'lesson' || state.phase !== 0 || state.introPlaying) return;
    const run = ++alphabetIntroRun;
    state.introPlaying = true;
    renderLesson();
    for (let index = 0; index < lesson.letters.length; index++) {
      if (run !== alphabetIntroRun || state.screen !== 'lesson' || state.phase !== 0) return;
      state.activeLetter = index;
      renderLesson();
      const item = lesson.letters[index];
      await speak(`${spokenName(item)}. ${item[1]}.`);
      if (run !== alphabetIntroRun || state.screen !== 'lesson' || state.phase !== 0) return;
      if (!state.heard.includes(index)) state.heard.push(index);
      renderLesson();
      await new Promise(resolve => setTimeout(resolve, 280));
    }
    if (run !== alphabetIntroRun) return;
    state.activeLetter = -1;
    state.introPlaying = false;
    renderLesson();
  }

  function autoPlayAlphabetQuestion(lesson) {
    const mode = state.phase === 1 ? 'sound' : 'word';
    const question = alphabetQuestions(lesson, mode)[state.quizIndex];
    if (!question || state.quizChecked) return;
    const key = `${lesson.id}:${state.phase}:${state.quizIndex}`;
    if (lastAutoSpeechKey === key) return;
    lastAutoSpeechKey = key;
    setTimeout(() => speak(question.spoken), 180);
  }

  function autoPlayPronunciation(lesson) {
    const item = lesson.letters[state.pronunciationIndex];
    if (!item) return;
    const key = `${lesson.id}:pronunciation:${state.pronunciationIndex}`;
    if (lastAutoSpeechKey === key) return;
    lastAutoSpeechKey = key;
    setTimeout(() => speak(item[1]), 180);
  }

  function matchPairs(lesson) { return lesson.words.slice(0, Math.min(4, lesson.words.length)).map((word,index)=>({ index, de: word[0], tr: word[1] })); }
  function matchMarkup(lesson) {
    if (lesson.type === 'alphabet') return alphabetChoiceMarkup(lesson, 'sound');
    const pairs = matchPairs(lesson), german = pairs, turkish = shuffle(pairs);
    return `<section class="a1-match"><header><span>BAĞLANTIYI KUR</span><h3>Almanca ve Türkçeyi eşleştir</h3><p>Önce bir Almanca karta, sonra karşılığına dokun.</p></header><div class="a1-match-board"><div>${german.map(pair=>matchButton(pair,'de')).join('')}</div><div>${turkish.map(pair=>matchButton(pair,'tr')).join('')}</div></div><footer><small>${state.matched.length}/${pairs.length} eşleşme</small>${state.matched.length === pairs.length ? '<button type="button" data-a1-next>Devam et →</button>' : '<span>Tüm çiftleri tamamla</span>'}</footer></section>`;
  }
  function matchButton(pair, side) {
    const done = state.matched.includes(pair.index), selected = state.matchSelection[side] === pair.index;
    return `<button type="button" data-a1-match="${pair.index}" data-a1-side="${side}" class="${done ? 'done' : selected ? 'selected' : ''}" ${done ? 'disabled' : ''}>${esc(pair[side])}</button>`;
  }

  function alphabetQuestions(lesson, mode) {
    return lesson.letters.slice(0, Math.min(5, lesson.letters.length)).map((item,index) => {
      const others = lesson.letters.filter((_,otherIndex)=>otherIndex!==index);
      const distractors = [others[index % others.length], others[(index + 2) % others.length]].filter(Boolean).map(other=>other[0]);
      return {
        prompt: mode === 'sound' ? 'Hangi harfi veya ses grubunu duydun?' : 'Duyduğun kelimede hangi hedef sesi çalışıyoruz?',
        spoken: mode === 'sound' ? `${spokenName(item)}.` : `${item[1]}.`,
        emoji: item[2], word: item[1], answer: item[0], options: shuffle([item[0], ...distractors])
      };
    });
  }
  function quizQuestions(lesson, mode = state.phase === 1 ? 'sound' : 'word') {
    if (lesson.type === 'alphabet') return alphabetQuestions(lesson, mode);
    return lesson.words.slice(0, Math.min(3, lesson.words.length)).map((word,index) => {
      const distractors = lesson.words.filter((_,wordIndex)=>wordIndex!==index).slice(0,2).map(item=>item[0]);
      return { prompt: `“${word[1]}” Almanca nasıl söylenir?`, answer: word[0], options: shuffle([word[0],...distractors]) };
    });
  }
  function quizMarkup(lesson) {
    if (lesson.type === 'alphabet') return alphabetChoiceMarkup(lesson, 'word');
    const questions = quizQuestions(lesson), question = questions[state.quizIndex], correct = state.quizChecked && state.quizSelected === question.answer;
    return `<section class="a1-quiz ${state.quizChecked ? correct ? 'correct' : 'wrong' : ''}"><header><span>DOĞRU SEÇENEĞİ BUL</span><b>${state.quizIndex + 1}/${questions.length}</b></header><h3>${esc(question.prompt)}</h3><div>${question.options.map((option,index)=>`<button type="button" data-a1-quiz="${esc(option)}" class="${state.quizSelected === option ? 'selected' : ''}" ${state.quizChecked ? 'disabled' : ''}><i>${String.fromCharCode(65+index)}</i><span>${esc(option)}</span></button>`).join('')}</div>${state.quizChecked ? `<aside><span>${correct ? '✓' : '×'}</span><b>${correct ? 'Doğru!' : 'Tekrar dene.'}</b></aside>` : ''}<footer>${state.quizChecked && !correct ? '<button type="button" data-a1-retry>Tekrar dene</button>' : state.quizChecked ? `<button type="button" data-a1-quiz-next>${state.quizIndex + 1 === questions.length ? 'Cümle kurmaya geç' : 'Sonraki soru'} →</button>` : `<button type="button" data-a1-check ${state.quizSelected ? '' : 'disabled'}>Kontrol et</button>`}</footer></section>`;
  }

  function alphabetChoiceMarkup(lesson, mode) {
    const questions = alphabetQuestions(lesson, mode), question = questions[state.quizIndex], correct = state.quizChecked && state.quizSelected === question.answer;
    const mood = state.quizChecked ? correct ? 'happy' : 'sad' : 'listen';
    return `<section class="a1-quiz a1-sound-quiz ${state.quizChecked ? correct ? 'correct' : 'wrong' : ''}"><header><span>${mode === 'sound' ? 'SESİ DİNLE' : 'KELİMEDEKİ HEDEF SESİ BUL'}</span><b>${state.quizIndex + 1}/${questions.length}</b></header>
      <div class="a1-sound-stage">${alphabetMascotMarkup(mood)}<button type="button" data-a1-speak="${esc(question.spoken)}" aria-label="Sesi tekrar dinle">🔊</button><small>Ses otomatik çalıyor · yeniden dinlemek için dokun</small>${state.quizChecked ? `<div class="a1-letter-reveal"><span>${esc(question.emoji)}</span><b>${esc(question.answer)} · ${esc(question.word)}</b></div>` : ''}</div>
      <h3>${esc(question.prompt)}</h3><div class="a1-letter-options">${question.options.map(option=>`<button type="button" data-a1-quiz="${esc(option)}" class="${state.quizSelected === option ? 'selected' : ''}" ${state.quizChecked ? 'disabled' : ''}>${esc(option)}</button>`).join('')}</div>
      ${state.quizChecked ? `<aside><span>${correct ? '✓' : '×'}</span><b>${correct ? 'Harika, doğru duydun!' : `Olmadı; doğru hedef ses ${esc(question.answer)}. Bir kez daha dinle.`}</b></aside>` : ''}
      <footer class="a1-auto-check"><span>${state.quizChecked ? correct ? '✓ Doğru; otomatik ilerliyor…' : '× Tekrar dinle; aynı soru yeniden gelecek…' : 'Bir seçeneğe dokun; cevap hemen kontrol edilir.'}</span></footer></section>`;
  }

  function pronunciationMarkup(lesson) {
    const item = lesson.letters[state.pronunciationIndex];
    if (!item) return '';
    const status = state.pronunciationStatus;
    const statusCopy = status === 'listening' ? 'Seni dinliyorum…' : status === 'correct' ? 'Doğru telaffuz! Sonraki kelimeye geçiliyor…' : status === 'wrong' ? 'Henüz doğru değil. Örneği dinle ve tekrar oku.' : status === 'unsupported' ? 'Bu tarayıcı ses tanımayı açamadı. Mikrofon iznini kontrol et.' : 'Örneği dinle, sonra mikrofonla kelimeyi oku.';
    return `<section class="a1-pronunciation ${status}"><header><span>TELAFFUZ ÇALIŞMASI</span><b>${state.pronunciationIndex + 1}/${lesson.letters.length}</b></header>
      <div class="a1-pronunciation-stage">${alphabetMascotMarkup(status === 'correct' ? 'happy' : status === 'wrong' ? 'sad' : status === 'listening' ? 'talking' : 'listen')}<div><small>${esc(item[0])} SESİ</small><h3>${esc(item[1])}</h3><button type="button" data-a1-speak="${esc(item[1])}" aria-label="Kelimeyi yeniden dinle">🔊 Dinle</button></div></div>
      <div class="a1-pronunciation-help"><b>Okunuş yardımı: ${esc(phoneticHelp(item))}</b><span>${esc(pronunciationRule(item))}</span>${item[0] === 'ß' ? '<i>ß harfinin adı <strong>Eszett</strong>tir. Straße kelimesinde uzun “a”dan sonra keskin “s” duyulur.</i>' : ''}</div>
      <button type="button" class="a1-pronunciation-mic" data-a1-pronounce ${status === 'listening' || status === 'correct' ? 'disabled' : ''}><span>${status === 'listening' ? '●' : '🎙'}</span>${status === 'wrong' ? 'Tekrar oku' : 'Ben okuyacağım'}</button>
      <aside><b>${esc(statusCopy)}</b>${state.pronunciationTranscript ? `<span>Algılanan: “${esc(state.pronunciationTranscript)}”</span>` : ''}</aside>
    </section>`;
  }

  function pronunciationSimilarity(a, b) {
    a = normalize(a); b = normalize(b);
    if (!a || !b) return 0;
    if (a === b || a.includes(b) || b.includes(a)) return 1;
    const rows = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      let previous = rows[0]; rows[0] = i;
      for (let j = 1; j <= b.length; j++) {
        const old = rows[j];
        rows[j] = Math.min(rows[j] + 1, rows[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
        previous = old;
      }
    }
    return 1 - rows[b.length] / Math.max(a.length, b.length);
  }

  function stopPronunciationRecognition() {
    if (!pronunciationRecognition) return;
    pronunciationRecognition.onresult = pronunciationRecognition.onerror = pronunciationRecognition.onend = null;
    try { pronunciationRecognition.stop(); } catch {}
    pronunciationRecognition = null;
  }

  function startPronunciationRecognition() {
    const lesson = currentLesson(), item = lesson?.letters?.[state.pronunciationIndex];
    if (!item) return;
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) { state.pronunciationStatus = 'unsupported'; return renderLesson(); }
    stopPronunciationRecognition();
    window.SprechraumAudio?.stop?.(); window.speechSynthesis?.cancel();
    const recognition = new Recognition();
    pronunciationRecognition = recognition;
    recognition.lang = 'de-DE'; recognition.continuous = false; recognition.interimResults = false; recognition.maxAlternatives = 5;
    state.pronunciationStatus = 'listening'; state.pronunciationTranscript = ''; renderLesson();
    recognition.onresult = event => {
      const alternatives = Array.from(event.results?.[0] || []).map(result => result.transcript || '').filter(Boolean);
      const transcript = alternatives[0] || '';
      const best = Math.max(0, ...alternatives.map(value => pronunciationSimilarity(value, item[1])));
      state.pronunciationTranscript = transcript;
      if (best >= .72) {
        state.pronunciationStatus = 'correct';
        renderLesson();
        clearTimeout(alphabetAdvanceTimer);
        alphabetAdvanceTimer = setTimeout(() => {
          if (state.pronunciationIndex + 1 >= lesson.letters.length) return completeLesson();
          state.pronunciationIndex++; state.pronunciationStatus = 'idle'; state.pronunciationTranscript = ''; state.pronunciationAttempts = 0; lastAutoSpeechKey = '';
          renderLesson();
        }, 950);
      } else {
        state.pronunciationStatus = 'wrong'; state.pronunciationAttempts++;
        renderLesson(); setTimeout(() => speak(item[1]), 280);
      }
    };
    recognition.onerror = event => {
      state.pronunciationStatus = event.error === 'not-allowed' || event.error === 'service-not-allowed' ? 'unsupported' : 'wrong';
      state.pronunciationTranscript = event.error === 'no-speech' ? 'Ses duyulmadı' : '';
      renderLesson();
    };
    recognition.onend = () => {
      pronunciationRecognition = null;
      if (state.pronunciationStatus === 'listening') { state.pronunciationStatus = 'wrong'; state.pronunciationTranscript = 'Ses tamamlanamadı'; renderLesson(); }
    };
    try { recognition.start(); } catch { state.pronunciationStatus = 'unsupported'; renderLesson(); }
  }

  function advanceAlphabetQuiz() {
    const lesson = currentLesson(), questions = alphabetQuestions(lesson, state.phase === 1 ? 'sound' : 'word');
    if (state.quizIndex + 1 >= questions.length) return nextPhase();
    state.quizIndex++; state.quizSelected = ''; state.quizChecked = false; lastAutoSpeechKey = '';
    renderLesson();
  }

  function evaluateAlphabetChoice(value) {
    const lesson = currentLesson(), question = alphabetQuestions(lesson, state.phase === 1 ? 'sound' : 'word')[state.quizIndex];
    state.quizSelected = value; state.quizChecked = true; renderLesson();
    clearTimeout(alphabetAdvanceTimer);
    if (value === question.answer) alphabetAdvanceTimer = setTimeout(advanceAlphabetQuiz, 760);
    else alphabetAdvanceTimer = setTimeout(() => { state.quizSelected = ''; state.quizChecked = false; lastAutoSpeechKey = ''; renderLesson(); }, 1050);
  }

  function buildTokens(lesson) { return lesson.type === 'alphabet' ? lesson.sequence : lesson.examples[0].replace(/([.!?])/g,' $1').split(/\s+/).filter(Boolean); }
  function buildMarkup(lesson) {
    const tokens = buildTokens(lesson), available = tokens.map((token,index)=>({token,index})).filter(item=>!state.buildChosen.includes(item.index));
    const built = state.buildChosen.map(index=>tokens[index]).join(' ').replace(/\s+([.!?])/g,'$1'), target = tokens.join(' ').replace(/\s+([.!?])/g,'$1'), correct = state.buildChecked && normalize(built) === normalize(target);
    const alphabet = lesson.type === 'alphabet';
    return `<section class="a1-build ${alphabet ? 'a1-letter-order' : ''} ${state.buildChecked ? correct ? 'correct' : 'wrong' : ''}"><header><span>${alphabet ? 'SON KISA TEKRAR' : 'CÜMLEYİ KUR'}</span><h3>${alphabet ? 'Harfleri öğrendiğin sıraya koy' : 'Kelimeleri doğru sıraya getir'}</h3><p>${esc(lesson.goal)}</p></header><div class="a1-build-line">${state.buildChosen.length ? state.buildChosen.map((index,position)=>`<button type="button" data-a1-remove-token="${position}">${esc(tokens[index])}</button>`).join('') : `<span>${alphabet ? 'İlk harften başla…' : 'Kelimelere sırayla dokun…'}</span>`}</div><div class="a1-token-bank">${shuffle(available).map(item=>`<button type="button" data-a1-token="${item.index}" ${state.buildChecked ? 'disabled' : ''}>${esc(item.token)}</button>`).join('')}</div>${state.buildChecked ? `<aside><span>${correct ? '✓' : '×'}</span><div><b>${correct ? (alphabet ? 'Harika, ses grubunu öğrendin!' : 'Harika, cümle doğru!') : 'Sıralamayı yeniden kontrol et.'}</b>${correct ? `<p>${esc(target)}</p>` : ''}</div></aside>` : ''}<footer>${state.buildChecked && !correct ? '<button type="button" data-a1-build-retry>Yeniden dene</button>' : state.buildChecked ? '<button type="button" data-a1-finish>Dersi tamamla →</button>' : `<button type="button" data-a1-build-check ${state.buildChosen.length === tokens.length ? '' : 'disabled'}>Kontrol et</button>`}</footer></section>`;
  }

  function startLesson(id) {
    alphabetIntroRun++; lastAutoSpeechKey = ''; clearTimeout(alphabetAdvanceTimer); stopPronunciationRecognition();
    state = { screen:'lesson', lessonId:id, phase:0, heard:[], matched:[], matchSelection:{}, quizIndex:0, quizSelected:'', quizChecked:false, buildChosen:[], buildChecked:false, activeLetter:-1, introPlaying:false, pronunciationIndex:0, pronunciationStatus:'idle', pronunciationTranscript:'', pronunciationAttempts:0 };
    renderLesson(); window.scrollTo({top:0,behavior:'smooth'});
  }
  function nextPhase() {
    alphabetIntroRun++; lastAutoSpeechKey = ''; clearTimeout(alphabetAdvanceTimer); stopPronunciationRecognition();
    state.phase++; state.matchSelection={}; state.quizIndex=0; state.quizSelected=''; state.quizChecked=false; state.buildChosen=[]; state.buildChecked=false;
    state.activeLetter=-1; state.introPlaying=false; state.pronunciationIndex=0; state.pronunciationStatus='idle'; state.pronunciationTranscript=''; state.pronunciationAttempts=0;
    renderLesson(); window.scrollTo({top:0,behavior:'smooth'});
  }
  function completeLesson() {
    alphabetIntroRun++; lastAutoSpeechKey = ''; clearTimeout(alphabetAdvanceTimer); stopPronunciationRecognition();
    const lesson = currentLesson(), p = progress();
    if (!p.completed.includes(lesson.id)) { p.completed.push(lesson.id); p.xp = (p.xp || 0) + (lesson.checkpoint ? 30 : 20); saveProgress(p); }
    root.innerHTML = `<section class="a1-complete" style="--unit:${lesson.unit.color}"><div class="a1-stars">✦ ★ ✦</div><span>✓</span><small>DERS TAMAMLANDI</small><h2>${lesson.final ? 'A1 yolunu tamamladın!' : 'Harika ilerliyorsun!'}</h2><p><b>${esc(lesson.title)}</b> dersini bitirdin ve ${lesson.checkpoint ? 30 : 20} XP kazandın.</p><div><button type="button" data-a1-repeat>Tekrar et</button><button type="button" data-a1-path>${lesson.final ? 'A1 yolunu gör' : 'Sonraki derse geç'} →</button></div></section>`;
  }

  function bindRoot(target) {
    if (boundRoots.has(target)) return; boundRoots.add(target);
    target.addEventListener('click', event => {
      const lessonButton = event.target.closest('[data-a1-lesson]'); if (lessonButton) return startLesson(lessonButton.dataset.a1Lesson);
      if (event.target.closest('[data-a1-exit]')) { alphabetIntroRun++; lastAutoSpeechKey=''; clearTimeout(alphabetAdvanceTimer); stopPronunciationRecognition(); state.screen='path'; state.introPlaying=false; window.SprechraumAudio?.stop?.(); window.speechSynthesis?.cancel(); return renderPath(); }
      const speech = event.target.closest('[data-a1-speak]'); if (speech) { const heard=Number(speech.dataset.a1Heard); if(Number.isFinite(heard)&&!state.heard.includes(heard)){state.heard.push(heard);const lesson=currentLesson(),next=lesson?.letters?.[heard+1];if(next)window.SprechraumAudio?.prefetch?.(`${next[0]}. ${next[1]}.`,{lang:'de'});renderLesson();}else speech.classList.add('heard'); return speak(speech.dataset.a1Speak); }
      if (event.target.closest('[data-a1-next]')) return nextPhase();
      const match = event.target.closest('[data-a1-match]'); if (match) {
        const side=match.dataset.a1Side,index=Number(match.dataset.a1Match); state.matchSelection[side]=index;
        if(state.matchSelection.de!==undefined&&state.matchSelection.tr!==undefined){if(state.matchSelection.de===state.matchSelection.tr)state.matched.push(index);state.matchSelection={};}
        return renderLesson();
      }
      const quiz=event.target.closest('[data-a1-quiz]'); if(quiz&&!state.quizChecked){if(currentLesson()?.type==='alphabet')return evaluateAlphabetChoice(quiz.dataset.a1Quiz);state.quizSelected=quiz.dataset.a1Quiz;return renderLesson();}
      if(event.target.closest('[data-a1-pronounce]')) return startPronunciationRecognition();
      if(event.target.closest('[data-a1-check]')&&state.quizSelected){state.quizChecked=true;return renderLesson();}
      if(event.target.closest('[data-a1-retry]')){lastAutoSpeechKey='';state.quizSelected='';state.quizChecked=false;return renderLesson();}
      if(event.target.closest('[data-a1-quiz-next]')){const lesson=currentLesson(),length=quizQuestions(lesson).length;if(state.quizIndex+1>=length)return nextPhase();state.quizIndex++;state.quizSelected='';state.quizChecked=false;return renderLesson();}
      const token=event.target.closest('[data-a1-token]');if(token&&!state.buildChecked){state.buildChosen.push(Number(token.dataset.a1Token));return renderLesson();}
      const remove=event.target.closest('[data-a1-remove-token]');if(remove&&!state.buildChecked){state.buildChosen.splice(Number(remove.dataset.a1RemoveToken),1);return renderLesson();}
      if(event.target.closest('[data-a1-build-check]')){state.buildChecked=true;return renderLesson();}
      if(event.target.closest('[data-a1-build-retry]')){state.buildChosen=[];state.buildChecked=false;return renderLesson();}
      if(event.target.closest('[data-a1-finish]'))return completeLesson();
      if(event.target.closest('[data-a1-repeat]'))return startLesson(state.lessonId);
      if(event.target.closest('[data-a1-path]')){const lessons=allLessons(),index=lessons.findIndex(item=>item.id===state.lessonId),next=lessons[index+1];if(next&&!progress().completed.includes(next.id))return startLesson(next.id);state.screen='path';return renderPath();}
    });
  }

  window.SprechraumA1Course = { render, speak, progress };
})();
