const iconPaths = {
  calendar: '<path d="M8 2v4M16 2v4M3 10h18M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2Z"/><path d="M8 14h.01M12 14h.01M16 14h.01"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5Z"/>',
  notebook: '<path d="M6 2h12v20H6z"/><path d="M9 2v20M4 6h4M4 10h4M4 14h4M4 18h4"/>',
  chart: '<path d="M3 20h18"/><path d="M6 16V9M12 16V5M18 16v-3"/><path d="m15 6 3-3 3 3"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2 7.5 14 3 9.6l6.2-.9Z"/>',
  settings: '<path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 3.5-.2-.1a1.8 1.8 0 0 0-2 .2 1.8 1.8 0 0 0-.8 1.6V22h-4v-.2a1.8 1.8 0 0 0-.8-1.6 1.8 1.8 0 0 0-2-.2l-.2.1-2-3.5.1-.1A1.7 1.7 0 0 0 6.2 15a1.8 1.8 0 0 0-1.4-1.1H4v-4h.8a1.8 1.8 0 0 0 1.4-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2-3.5.2.1a1.8 1.8 0 0 0 2-.2A1.8 1.8 0 0 0 10.8 2V2h4v.2a1.8 1.8 0 0 0 .8 1.6 1.8 1.8 0 0 0 2 .2l.2-.1 2 3.5-.1.1a1.7 1.7 0 0 0-.3 1.9 1.8 1.8 0 0 0 1.4 1.1h.8v4h-.8A1.8 1.8 0 0 0 19.4 15Z"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  stop: '<rect x="6" y="6" width="12" height="12"/>',
  bookmark: '<path d="M6 3h12v18l-6-3-6 3Z"/>',
  plus: '<path d="M12 5v14M5 12h14"/><rect x="3" y="3" width="18" height="18" rx="2"/>',
  "arrow-right": '<path d="M5 12h14M13 5l7 7-7 7"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
};

const examCatalog = [
  {
    year: 115,
    examName: "115年公務人員特種考試關務人員考試",
    categoryName: "關務人員考試關務三等_資訊處理(選試英文)",
    subjects: [
      {
        name: "國文（作文與測驗）",
        sourcePdf: "assets/pdfs/115040_10110(1101).pdf",
      },
    ],
  },
];

const questions = [
  {
    text: "下列何者是作業系統（Operating System）的主要功能？",
    options: ["將原始資料轉換成有意義的資訊", "管理電腦硬體資源與提供使用者介面", "編譯程式語言並產生執行檔", "管理資料庫中的資料表與關聯"],
    answer: 1,
    explanation: "作業系統的主要功能包括處理器管理、記憶體管理、檔案系統管理、I/O 裝置管理以及提供使用者介面等。",
    reference: "參考：課本第 1-2 頁",
  },
  {
    text: "二進位數字 1011 轉換為十進位後為何？",
    options: ["9", "10", "11", "12"],
    answer: 2,
    explanation: "1011₂ = 1×8 + 0×4 + 1×2 + 1×1，因此十進位為 11。",
    reference: "參考：資料表示與進位轉換",
  },
  {
    text: "下列何者最適合用來表示資料表之間的關聯？",
    options: ["流程圖", "ER 模型", "甘特圖", "樹狀目錄"],
    answer: 1,
    explanation: "ER 模型用實體、屬性與關聯描述資料結構，是資料庫設計常用工具。",
    reference: "參考：資料庫概論",
  },
  {
    text: "在網路通訊中，IP 位址主要用於下列何種用途？",
    options: ["識別網路上的主機位置", "壓縮傳輸中的檔案", "加密使用者密碼", "決定螢幕解析度"],
    answer: 0,
    explanation: "IP 位址用來識別網路上的主機或節點，協助資料封包送達目的地。",
    reference: "參考：網路基礎",
  },
  {
    text: "下列何者屬於揮發性記憶體？",
    options: ["硬碟", "光碟", "RAM", "隨身碟"],
    answer: 2,
    explanation: "RAM 在電源關閉後資料會消失，因此屬於揮發性記憶體。",
    reference: "參考：電腦硬體",
  },
  {
    text: "HTML 在網頁製作中主要負責什麼？",
    options: ["資料庫交易控制", "網頁內容結構", "伺服器硬體監控", "影像壓縮演算法"],
    answer: 1,
    explanation: "HTML 用於描述網頁內容與語意結構，CSS 則負責樣式呈現。",
    reference: "參考：網頁技術",
  },
  {
    text: "下列哪一項較能提升密碼安全性？",
    options: ["所有網站使用同一組密碼", "使用生日作為密碼", "啟用多因素驗證", "將密碼寫在螢幕旁"],
    answer: 2,
    explanation: "多因素驗證能在密碼外加入額外驗證條件，降低帳號被盜用風險。",
    reference: "參考：資訊安全",
  },
  {
    text: "資料庫正規化的主要目的為何？",
    options: ["增加資料重複以方便搜尋", "減少資料冗餘與更新異常", "將所有資料改成圖片", "提高螢幕顯示亮度"],
    answer: 1,
    explanation: "正規化透過拆分資料表與建立關聯，降低冗餘並避免插入、刪除、更新異常。",
    reference: "參考：關聯式資料庫",
  },
  {
    text: "CPU 的主要工作是什麼？",
    options: ["執行指令與處理運算", "永久保存檔案", "顯示列印結果", "供應電力"],
    answer: 0,
    explanation: "CPU 是中央處理單元，負責執行程式指令與進行算術、邏輯運算。",
    reference: "參考：電腦組成",
  },
  {
    text: "下列何者是雲端運算的常見優點？",
    options: ["完全不需要網路", "可彈性調整運算資源", "只能在單一電腦使用", "必定不需要資安管理"],
    answer: 1,
    explanation: "雲端服務通常可依需求擴充或縮減資源，但仍需要妥善的資安與權限管理。",
    reference: "參考：雲端服務",
  },
];

const state = {
  current: 0,
  examIndex: 0,
  subjectIndex: 0,
  answers: Array(questions.length).fill(null),
  flagged: new Set(),
  notes: [],
  seconds: 1122,
  paused: false,
};

const els = {
  examTitle: document.querySelector("#examTitle"),
  examCategory: document.querySelector("#examCategory"),
  subjectSelect: document.querySelector("#subjectSelect"),
  subjectLabel: document.querySelector("#subjectLabel"),
  pdfLink: document.querySelector("#pdfLink"),
  timer: document.querySelector("#timer"),
  questionCount: document.querySelector("#questionCount"),
  progressPercent: document.querySelector("#progressPercent"),
  progressBar: document.querySelector("#progressBar"),
  questionText: document.querySelector("#questionText"),
  options: document.querySelector("#options"),
  answerCard: document.querySelector("#answerCard"),
  resultIcon: document.querySelector("#resultIcon"),
  answerTitle: document.querySelector("#answerTitle"),
  answerExplain: document.querySelector("#answerExplain"),
  answerReference: document.querySelector("#answerReference"),
  answeredCount: document.querySelector("#answeredCount"),
  correctCount: document.querySelector("#correctCount"),
  wrongCount: document.querySelector("#wrongCount"),
  wrongBadge: document.querySelector("#wrongBadge"),
  accuracy: document.querySelector("#accuracy"),
  questionMap: document.querySelector("#questionMap"),
  nextButton: document.querySelector("#nextButton"),
  bookmarkButton: document.querySelector("#bookmarkButton"),
  wrongBookButton: document.querySelector("#wrongBookButton"),
  noteInput: document.querySelector("#noteInput"),
  noteCount: document.querySelector("#noteCount"),
  saveNote: document.querySelector("#saveNote"),
  clearNote: document.querySelector("#clearNote"),
  recentNotes: document.querySelector("#recentNotes"),
  pauseButton: document.querySelector("#pauseButton"),
  resetButton: document.querySelector("#resetButton"),
};

function svgIcon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || ""}</svg>`;
}

function hydrateIcons() {
  document.querySelectorAll("[data-icon]").forEach((target) => {
    target.innerHTML = svgIcon(target.dataset.icon);
  });
}

function renderExamInfo() {
  const exam = examCatalog[state.examIndex];
  const subject = exam.subjects[state.subjectIndex];

  els.examTitle.textContent = exam.examName;
  els.examCategory.textContent = exam.categoryName;
  els.subjectLabel.textContent = subject.name;
  els.pdfLink.href = subject.sourcePdf;
  els.subjectSelect.innerHTML = exam.subjects
    .map((item, index) => `<option value="${index}">${item.name}</option>`)
    .join("");
  els.subjectSelect.value = String(state.subjectIndex);
}

function renderQuestion() {
  const question = questions[state.current];
  const selected = state.answers[state.current];
  const progress = Math.round(((state.current + 1) / questions.length) * 100);

  els.questionCount.textContent = `第 ${state.current + 1} 題 / 共 ${questions.length} 題`;
  els.progressPercent.textContent = `${progress}%`;
  els.progressBar.style.width = `${progress}%`;
  els.questionText.textContent = question.text;
  els.options.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.type = "button";
    button.innerHTML = `
      <span class="option-letter">${String.fromCharCode(65 + index)}</span>
      <span>${option}</span>
      <span class="option-status"></span>
    `;

    if (selected !== null) {
      button.classList.add("disabled");
      if (index === question.answer) {
        button.classList.add("correct");
        button.querySelector(".option-status").innerHTML = svgIcon("check");
      }
      if (index === selected && selected !== question.answer) {
        button.classList.add("wrong");
        button.querySelector(".option-status").innerHTML = svgIcon("x");
      }
    }

    button.addEventListener("click", () => chooseAnswer(index));
    els.options.append(button);
  });

  renderAnswerCard();
  renderMap();
  renderStats();
  renderFlagState();
}

function chooseAnswer(index) {
  if (state.paused || state.answers[state.current] !== null) return;
  state.answers[state.current] = index;
  renderQuestion();
}

function renderAnswerCard() {
  const question = questions[state.current];
  const selected = state.answers[state.current];

  if (selected === null) {
    els.answerCard.classList.add("hidden");
    return;
  }

  const correct = selected === question.answer;
  els.answerCard.classList.remove("hidden", "wrong");
  els.answerCard.classList.toggle("wrong", !correct);
  els.resultIcon.innerHTML = svgIcon(correct ? "check" : "x");
  els.answerTitle.textContent = correct ? "答對了！" : "再檢查一次";
  els.answerExplain.textContent = question.explanation;
  els.answerReference.textContent = question.reference;
}

function renderStats() {
  const answered = state.answers.filter((answer) => answer !== null).length;
  const correct = state.answers.filter((answer, index) => answer === questions[index].answer).length;
  const wrong = answered - correct;
  const accuracy = answered === 0 ? 0 : Math.round((correct / answered) * 100);

  els.answeredCount.textContent = answered;
  els.correctCount.textContent = correct;
  els.wrongCount.textContent = wrong;
  els.wrongBadge.textContent = wrong;
  els.accuracy.textContent = `${accuracy}%`;
}

function renderMap() {
  els.questionMap.innerHTML = "";

  questions.forEach((question, index) => {
    const answer = state.answers[index];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "map-button";
    button.textContent = index + 1;
    button.classList.toggle("current", index === state.current);
    button.classList.toggle("flagged", state.flagged.has(index));

    if (answer !== null) {
      button.classList.add(answer === question.answer ? "correct" : "wrong");
    }

    button.addEventListener("click", () => {
      state.current = index;
      renderQuestion();
    });
    els.questionMap.append(button);
  });
}

function renderFlagState() {
  const flagged = state.flagged.has(state.current);
  els.bookmarkButton.classList.toggle("active", flagged);
  els.bookmarkButton.innerHTML = `${svgIcon("bookmark")}${flagged ? "取消標記" : "標記本題"}`;
}

function renderNotes() {
  els.noteCount.textContent = `${els.noteInput.value.length} / 200 字`;
  els.saveNote.classList.toggle("ready", els.noteInput.value.trim().length > 0);
  els.recentNotes.innerHTML = "";

  const items = state.notes.length
    ? state.notes.slice(0, 3)
    : [
        { text: "CPU 排程的目的：提升效率與公平性", time: "10:15" },
        { text: "記憶體管理：分頁與分割的差異", time: "09:58" },
      ];

  items.forEach((note) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>• ${note.text}</span><time>${note.time}</time>`;
    els.recentNotes.append(li);
  });
}

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
}

function tick() {
  if (!state.paused) {
    state.seconds += 1;
    els.timer.textContent = formatTime(state.seconds);
  }
}

els.nextButton.addEventListener("click", () => {
  state.current = (state.current + 1) % questions.length;
  renderQuestion();
});

els.bookmarkButton.addEventListener("click", () => {
  if (state.flagged.has(state.current)) {
    state.flagged.delete(state.current);
  } else {
    state.flagged.add(state.current);
  }
  renderQuestion();
});

els.wrongBookButton.addEventListener("click", () => {
  state.flagged.add(state.current);
  els.wrongBookButton.classList.add("active");
  setTimeout(() => els.wrongBookButton.classList.remove("active"), 900);
  renderQuestion();
});

els.noteInput.addEventListener("input", renderNotes);

els.clearNote.addEventListener("click", () => {
  els.noteInput.value = "";
  renderNotes();
});

els.saveNote.addEventListener("click", () => {
  const text = els.noteInput.value.trim();
  if (!text) return;
  const now = new Date();
  state.notes.unshift({
    text,
    time: `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
  });
  els.noteInput.value = "";
  renderNotes();
});

els.pauseButton.addEventListener("click", () => {
  state.paused = !state.paused;
  els.pauseButton.innerHTML = `${svgIcon(state.paused ? "check" : "pause")}${state.paused ? "繼續" : "暫停"}`;
});

els.resetButton.addEventListener("click", () => {
  state.current = 0;
  state.answers = Array(questions.length).fill(null);
  state.flagged.clear();
  state.seconds = 1122;
  state.paused = false;
  els.timer.textContent = formatTime(state.seconds);
  els.pauseButton.innerHTML = `${svgIcon("pause")}暫停`;
  renderQuestion();
});

els.subjectSelect.addEventListener("change", () => {
  state.subjectIndex = Number(els.subjectSelect.value);
  state.current = 0;
  state.answers = Array(questions.length).fill(null);
  state.flagged.clear();
  renderExamInfo();
  renderQuestion();
});

hydrateIcons();
renderExamInfo();
renderQuestion();
renderNotes();
setInterval(tick, 1000);
