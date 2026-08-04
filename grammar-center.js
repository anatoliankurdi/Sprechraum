(function () {
  const root = document.getElementById('grammarCenterApp');
  const catalog = window.SPRECHRAUM_GRAMMAR_CATALOG;
  if (!root || !catalog) return;

  const STORAGE_KEY = 'sprechraum-grammar-progress-v1';
  const saved = (() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
  })();
  const state = {
    level: saved.lastLevel || 'A1',
    topicId: null,
    exerciseId: null,
    question: 0,
    placed: '',
    checked: false,
    completed: saved.completed || {},
    query: ''
  };

  const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const levelData = () => catalog.levels[state.level];
  const currentTopic = () => levelData().topics.find(topic => topic.id === state.topicId);
  const currentExercise = () => catalog.exercises[state.exerciseId];
  const topicProgress = topic => state.completed[`${state.level}:${topic.id}`] || 0;

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lastLevel: state.level, completed: state.completed }));
  }

  function render() {
    root.style.setProperty('--grammar-accent', levelData().color);
    if (state.level === 'A1' && !state.exerciseId && !state.topicId && window.SprechraumA1Course) {
      return window.SprechraumA1Course.render(root);
    }
    if (state.exerciseId) return renderExercise();
    if (state.topicId) return renderTopic();
    renderCatalog();
  }

  function renderCatalog() {
    const level = levelData();
    const query = state.query.trim().toLocaleLowerCase('de-DE');
    const topics = level.topics.filter(topic => !query || `${topic.title} ${topic.summary} ${topic.examples.join(' ')}`.toLocaleLowerCase('de-DE').includes(query));
    const done = level.topics.filter(topic => topicProgress(topic) === 100).length;
    root.innerHTML = `
      <section class="grammar-hero">
        <div>
          <span class="grammar-kicker">GRAMMATIK · A1–C2</span>
          <h2>Seviyene göre gramer yolu</h2>
          <p>Konuyu incele, örnekleri gör ve cevabı boşluğa taşıyarak hemen uygula.</p>
        </div>
        <div class="grammar-level-summary" aria-label="${escapeHtml(state.level)} ilerlemesi">
          <strong>${escapeHtml(state.level)}</strong><span><b>${done}/${level.topics.length}</b> konu tamamlandı</span>
        </div>
      </section>
      <nav class="grammar-level-tabs" aria-label="Gramer seviyesi">
        ${Object.entries(catalog.levels).map(([key, value]) => `<button type="button" data-grammar-level="${key}" class="${key === state.level ? 'active' : ''}" aria-current="${key === state.level ? 'page' : 'false'}"><b>${key}</b><small>${escapeHtml(value.label)}</small></button>`).join('')}
      </nav>
      <section class="grammar-level-intro">
        <div><span>${state.level} HEDEFİ</span><h3>${escapeHtml(level.outcome)}</h3></div>
        <label><span>⌕</span><input id="grammarSearch" type="search" value="${escapeHtml(state.query)}" placeholder="Konu veya örnek ara…"></label>
      </section>
      ${state.level === 'A1' ? `<aside class="grammar-source-note"><span>✓</span><div><b>A1 kaynak paketi yüklendi</b><p>10 konu ve dokunma/sürükleme alıştırmaları “Almanca A1” PDF’sinden uygulamaya dönüştürüldü.</p></div><em>PDF · 127 sayfa</em></aside>` : `<aside class="grammar-source-note outline"><span>＋</span><div><b>${state.level} müfredat altyapısı hazır</b><p>Konu ve örnekler kullanılabilir. Bu seviyenin PDF paketini daha sonra eklediğinde alıştırmalar aynı düzene bağlanacak.</p></div></aside>`}
      <div class="grammar-topic-grid">
        ${topics.length ? topics.map((topic, index) => topicCard(topic, index)).join('') : '<div class="grammar-empty">Aramana uygun konu bulunamadı.</div>'}
      </div>`;
  }

  function topicCard(topic, index) {
    const progress = topicProgress(topic);
    return `<button class="grammar-topic-card" type="button" data-grammar-topic="${escapeHtml(topic.id)}">
      <span class="grammar-topic-number">${String(index + 1).padStart(2, '0')}</span>
      <span class="grammar-topic-copy"><small>${state.level} · KONU</small><b>${escapeHtml(topic.title)}</b><em>${escapeHtml(topic.summary)}</em></span>
      <span class="grammar-card-meta">${topic.source ? `<i>PDF</i>` : '<i class="curriculum">MÜFREDAT</i>'}${progress === 100 ? '<strong>✓ Tamamlandı</strong>' : topic.exercise ? '<strong>Alıştırma →</strong>' : '<strong>3 örnek →</strong>'}</span>
    </button>`;
  }

  function renderTopic() {
    const topic = currentTopic();
    if (!topic) { state.topicId = null; return renderCatalog(); }
    const progress = topicProgress(topic);
    root.innerHTML = `
      <button class="grammar-back" type="button" data-grammar-back>← ${state.level} konu listesi</button>
      <article class="grammar-topic-detail">
        <header><div><span>${state.level} · GRAMER KONUSU</span><h2>${escapeHtml(topic.title)}</h2><p>${escapeHtml(topic.summary)}</p></div><strong class="${progress === 100 ? 'done' : ''}">${progress === 100 ? '✓ Tamamlandı' : 'Öğren + uygula'}</strong></header>
        <section class="grammar-rule"><span>i</span><div><b>Kısa kural</b><p>${escapeHtml(topic.summary)}</p></div></section>
        <section class="grammar-examples"><div class="grammar-section-title"><span>ÖRNEKLER</span><b>${topic.examples.length} doğal cümle</b></div>${topic.examples.map((example, index) => `<div><i>${index + 1}</i><p>${escapeHtml(example)}</p><button type="button" data-speak-example="${escapeHtml(example)}" aria-label="Cümleyi dinle">▶</button></div>`).join('')}</section>
        ${topic.exercise ? `<section class="grammar-practice-cta"><div><span>ETKİLEŞİMLİ ALIŞTIRMA</span><h3>Cevabı boşluğa taşı</h3><p>Telefonda cevaba, sonra boşluğa dokun. Bilgisayarda istersen sürükleyebilirsin.</p><small>${escapeHtml(topic.source || '')}</small></div><button type="button" data-start-grammar-exercise="${escapeHtml(topic.exercise)}">${progress === 100 ? 'Tekrar yap' : 'Alıştırmayı başlat'} <span>→</span></button></section>` : `<section class="grammar-coming"><b>Alıştırma paketi daha sonra eklenecek</b><p>Örnekler hazır; ${state.level} PDF kaynağı yüklendiğinde bu konuya aynı etkileşimli sistem bağlanacak.</p></section>`}
      </article>`;
  }

  function sentenceMarkup(sentence) {
    const [before = '', after = ''] = sentence.split('___');
    return `${escapeHtml(before)}<button class="grammar-dropzone ${state.placed ? 'filled' : ''}" type="button" data-grammar-drop aria-label="Cevap alanı">${state.placed ? escapeHtml(state.placed) : '<span>cevabı buraya taşı</span>'}</button>${escapeHtml(after)}`;
  }

  function renderExercise() {
    const exercise = currentExercise();
    const topic = currentTopic();
    if (!exercise || !topic) { state.exerciseId = null; return renderTopic(); }
    const current = exercise.items[state.question];
    const total = exercise.items.length;
    const isCorrect = state.checked && state.placed === current.answer;
    root.innerHTML = `
      <button class="grammar-back" type="button" data-exercise-close>← ${escapeHtml(topic.title)}</button>
      <section class="grammar-exercise-shell ${state.checked ? (isCorrect ? 'correct' : 'wrong') : ''}">
        <header><div><span>${state.level} · ${escapeHtml(exercise.source)}</span><h2>${escapeHtml(exercise.title)}</h2></div><strong>${state.question + 1} / ${total}</strong></header>
        <div class="grammar-exercise-progress">${exercise.items.map((_, index) => `<i class="${index < state.question ? 'done' : index === state.question ? 'active' : ''}"></i>`).join('')}</div>
        <div class="grammar-instruction"><span>↕</span><p><b>Doğru cevabı yerleştir.</b> Cevaba dokunup boşluğa dokunabilir veya cevabı sürükleyebilirsin.</p></div>
        <div class="grammar-sentence" aria-live="polite">${sentenceMarkup(current.sentence)}</div>
        <div class="grammar-answer-bank" aria-label="Cevap seçenekleri">
          ${current.options.map(option => `<button type="button" draggable="true" data-grammar-option="${escapeHtml(option)}" class="${state.placed === option ? 'selected' : ''}" ${state.checked ? 'disabled' : ''}>${escapeHtml(option)}</button>`).join('')}
        </div>
        ${state.checked ? `<div class="grammar-feedback ${isCorrect ? 'success' : 'error'}"><span>${isCorrect ? '✓' : '×'}</span><div><b>${isCorrect ? 'Doğru!' : 'Bir daha düşün.'}</b><p>${isCorrect ? escapeHtml(current.note || 'Cevabı doğru yere yerleştirdin.') : `Doğru yapı için ipucu: ${escapeHtml(current.note || 'özne ve fiil uyumunu kontrol et.')}`}</p></div></div>` : ''}
        <footer>
          ${state.placed && !state.checked ? '<button type="button" class="grammar-clear" data-grammar-clear>Temizle</button>' : '<span></span>'}
          ${state.checked && !isCorrect ? '<button type="button" class="grammar-primary" data-grammar-retry>Tekrar dene</button>' : state.checked && isCorrect ? `<button type="button" class="grammar-primary" data-grammar-next>${state.question + 1 === total ? 'Sonucu gör' : 'Sonraki soru'} →</button>` : `<button type="button" class="grammar-primary" data-grammar-check ${state.placed ? '' : 'disabled'}>Kontrol et</button>`}
        </footer>
      </section>`;
  }

  function finishExercise() {
    const topic = currentTopic();
    state.completed[`${state.level}:${topic.id}`] = 100;
    save();
    const exercise = currentExercise();
    root.innerHTML = `<section class="grammar-finish"><div class="grammar-confetti" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div><span>✓</span><small>${state.level} · KONU TAMAMLANDI</small><h2>Harika çalıştın!</h2><p><b>${escapeHtml(topic.title)}</b> alıştırmasındaki ${exercise.items.length} cümleyi doğru tamamladın.</p><div><button type="button" data-repeat-exercise>Tekrar et</button><button type="button" class="grammar-primary" data-next-topic>Sıradaki konu →</button></div></section>`;
  }

  function placeAnswer(value) {
    if (state.checked) return;
    state.placed = value;
    renderExercise();
  }

  root.addEventListener('click', event => {
    const levelButton = event.target.closest('[data-grammar-level]');
    if (levelButton) { state.level = levelButton.dataset.grammarLevel; state.topicId = null; state.exerciseId = null; state.query = ''; save(); return render(); }
    const topicButton = event.target.closest('[data-grammar-topic]');
    if (topicButton) { state.topicId = topicButton.dataset.grammarTopic; return render(); }
    if (event.target.closest('[data-grammar-back]')) { state.topicId = null; return render(); }
    const start = event.target.closest('[data-start-grammar-exercise]');
    if (start) { state.exerciseId = start.dataset.startGrammarExercise; state.question = 0; state.placed = ''; state.checked = false; return render(); }
    if (event.target.closest('[data-exercise-close]')) { state.exerciseId = null; state.placed = ''; state.checked = false; return render(); }
    const option = event.target.closest('[data-grammar-option]');
    if (option) return placeAnswer(option.dataset.grammarOption);
    if (event.target.closest('[data-grammar-drop]') && state.placed) return renderExercise();
    if (event.target.closest('[data-grammar-clear]')) { state.placed = ''; return renderExercise(); }
    if (event.target.closest('[data-grammar-check]') && state.placed) { state.checked = true; return renderExercise(); }
    if (event.target.closest('[data-grammar-retry]')) { state.checked = false; state.placed = ''; return renderExercise(); }
    if (event.target.closest('[data-grammar-next]')) {
      const exercise = currentExercise();
      if (state.question + 1 >= exercise.items.length) return finishExercise();
      state.question += 1; state.placed = ''; state.checked = false; return renderExercise();
    }
    if (event.target.closest('[data-repeat-exercise]')) { state.question = 0; state.placed = ''; state.checked = false; return renderExercise(); }
    if (event.target.closest('[data-next-topic]')) {
      const topics = levelData().topics;
      const index = topics.findIndex(topic => topic.id === state.topicId);
      state.exerciseId = null; state.topicId = topics[(index + 1) % topics.length].id; state.question = 0; state.placed = ''; state.checked = false; return render();
    }
    const speak = event.target.closest('[data-speak-example]');
    if (speak && 'speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(speak.dataset.speakExample);
      utterance.lang = 'de-DE'; utterance.rate = 0.88;
      speechSynthesis.speak(utterance);
    }
  });

  root.addEventListener('input', event => {
    if (event.target.id !== 'grammarSearch') return;
    state.query = event.target.value;
    const position = event.target.selectionStart;
    renderCatalog();
    const input = document.getElementById('grammarSearch');
    input?.focus(); input?.setSelectionRange(position, position);
  });

  root.addEventListener('dragstart', event => {
    const option = event.target.closest('[data-grammar-option]');
    if (!option) return;
    event.dataTransfer.setData('text/plain', option.dataset.grammarOption);
    event.dataTransfer.effectAllowed = 'move';
  });
  root.addEventListener('dragover', event => {
    if (!event.target.closest('[data-grammar-drop]')) return;
    event.preventDefault(); event.dataTransfer.dropEffect = 'move';
  });
  root.addEventListener('drop', event => {
    if (!event.target.closest('[data-grammar-drop]')) return;
    event.preventDefault(); placeAnswer(event.dataTransfer.getData('text/plain'));
  });

  window.SprechraumGrammarCenter = { render, setLevel(level) { if (catalog.levels[level]) { state.level = level; state.topicId = null; state.exerciseId = null; save(); render(); } } };
  render();
})();
