let cards = [];
let current = 0;
let wrong = 0;
let flipped = false;
let startTime = null;
let initialCardCount = 0;

function getSetNameFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("set") || "set1";
}

async function loadCards() {
  const setName = getSetNameFromURL();
  try {
    const response = await fetch(`sets/${setName}.json`);
    if (!response.ok) throw new Error("فشل في تحميل بيانات البطاقات");
    cards = await response.json();
    initialCardCount = cards.length;

    const shuffle = document.getElementById("shuffleCheckbox").checked;
    if (shuffle) {
      cards = cards.sort(() => Math.random() - 0.5);
    }

    showCard();
  } catch (error) {
    document.getElementById("result").innerHTML = "<h2>تعذر تحميل البطاقات!</h2>";
    console.error(error);
  }
}

function showCard() {
  const resultEl = document.getElementById("result");
  if (cards.length === 0) {
    if (resultEl) resultEl.innerHTML = "<h2>لا توجد بطاقات متاحة!</h2>";
    return;
  }

  const qEl = document.getElementById("question");
  const aEl = document.getElementById("answerText");
  if (!qEl || !aEl) return;

  const card = cards[current];
  qEl.innerHTML = card.question.type === "image" ? `<img src='${card.question.content}' alt='سؤال'>` : `<div>${card.question.content}</div>`;
  aEl.innerHTML = card.answer.type === "image" ? `<img src='${card.answer.content}' alt='إجابة'>` : `<div>${card.answer.content}</div>`;

  const cardEl = document.getElementById("card");
  const buttonsContainer = document.getElementById("buttonsContainer");
  if (cardEl && buttonsContainer) {
    cardEl.classList.remove("flipped");
    buttonsContainer.style.display = "none";
  }
  flipped = false;
  if (!startTime) startTime = new Date();
}

function flipCard() {
  const card = document.getElementById("card");
  const buttonsContainer = document.getElementById("buttonsContainer");
  if (!card || !buttonsContainer) return;

  if (!flipped) {
    flipped = true;
    card.classList.add("flipped");
    buttonsContainer.style.display = "flex";
    document.getElementById("shuffleControl").style.display = "none";
  } else {
    flipped = false;
    card.classList.remove("flipped");
    buttonsContainer.style.display = "none";
  }
}

function markCorrect(event) {
  event.stopPropagation();
  const cardEl = document.getElementById("card");
  const questionEl = document.getElementById("question");
  if (!cardEl || !questionEl) return;

  questionEl.innerHTML = "";
  cardEl.classList.remove("flipped");
  cardEl.addEventListener("transitionend", function handler(e) {
    if (e.propertyName === "transform") {
      cardEl.removeEventListener("transitionend", handler);
      cards.splice(current, 1);
      nextCard();
    }
  });
}

function markWrong(event) {
  event.stopPropagation();
  const cardEl = document.getElementById("card");
  const questionEl = document.getElementById("question");
  if (!cardEl || !questionEl) return;

  questionEl.innerHTML = "";
  cardEl.classList.remove("flipped");
  cardEl.addEventListener("transitionend", function handler(e) {
    if (e.propertyName === "transform") {
      cardEl.removeEventListener("transitionend", handler);
      const wrongCard = cards[current];
      cards.splice(current, 1);
      cards.push(wrongCard);
      wrong++;
      nextCard();
    }
  });
}

function nextCard() {
  if (cards.length === 0) {
    const endTime = new Date();
    const timeSpent = Math.floor((endTime - startTime) / 1000);
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    const total = initialCardCount;
    const correct = total - wrong;
    const score = Math.round((correct / total) * 100);
    let message = "";

    if (wrong === 0) {
      const messages = [
        "🌟 أداء خارق! كل الإجابات صحيحة!",
        "👏 مذهل! لم تخطئ أبداً!",
        "💯 العلامة الكاملة! واصل الإبداع!",
        "🎯 دقة تامة! ممتاز جدًا!",
        "🚀 تعلمك مثالي! أحسنت!"
      ];
      message = messages[Math.floor(Math.random() * messages.length)];
      if (typeof confetti === "function") {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.75 } });
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.75 } });
      }
    } else if (score >= 90) {
      message = "👍 أداء ممتاز! أعد التمرين واستمر في التقدم.";
    } else if (score >= 75) {
      message = "💪 أداء جيد! خطوة واحدة وتصل للكمال.";
    } else {
      message = "🧐 بداية طيبة! أعد التمرين وستتحسن بإذن الله.";
    }

    const resultEl = document.getElementById("result");
    if (resultEl) {
      resultEl.innerHTML = `
        <h2>${message}</h2>
        <p>⏱️ الوقت: ${minutes} دقيقة و ${seconds} ثانية</p>
        <button onclick="location.reload()">🔁 أعد التمرين</button>
      `;
    }
    const cardContainer = document.querySelector(".card-container");
    const buttonsContainer = document.getElementById("buttonsContainer");
    if (cardContainer) cardContainer.style.display = "none";
    if (buttonsContainer) buttonsContainer.style.display = "none";
  } else {
    if (current >= cards.length) current = 0;
    showCard();
  }
}

window.onload = () => loadCards();


document.getElementById("shuffleCheckbox").addEventListener("change", () => {
  current = 0;
  wrong = 0;
  startTime = null;
  document.getElementById("result").innerHTML = "";
  document.querySelector(".card-container").style.display = "block";
  document.getElementById("shuffleControl").style.display = "block";
  loadCards();
});
