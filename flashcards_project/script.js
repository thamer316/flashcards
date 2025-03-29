
let cards = [
  { question: { type: "text", content: "ما عاصمة الأردن؟" }, answer: { type: "text", content: "عمان" } },
  { question: { type: "image", content: "images/1.png" }, answer: { type: "image", content: "images/1-.png" } },
  { question: { type: "image", content: "images/2.png" }, answer: { type: "text", content: "الحموض الكربوكسيلية" } },
  { question: { type: "text", content: "cos(2x) = " }, answer: { type: "image", content: "images/2-.png" } }
];

let current = 0;
let wrong = 0;
let flipped = false;
let startTime = null;
const initialCardCount = cards.length;

function showCard() {
  const qEl = document.getElementById("question");
  const aEl = document.getElementById("answerText");
  const card = cards[current];

  qEl.innerHTML = card.question.type === "image"
    ? `<img src='${card.question.content}' alt='سؤال'>`
    : `<div>${card.question.content}</div>`;
  aEl.innerHTML = card.answer.type === "image"
    ? `<img src='${card.answer.content}' alt='إجابة'>`
    : `<div>${card.answer.content}</div>`;

  document.getElementById("card").classList.remove("flipped");
  document.getElementById("buttonsContainer").style.display = "none";
  flipped = false;
  if (!startTime) startTime = new Date();
}

function flipCard() {
  const card = document.getElementById("card");
  const buttonsContainer = document.getElementById("buttonsContainer");
  if (!flipped) {
    flipped = true;
    card.classList.add("flipped");
    buttonsContainer.style.display = "flex";
  } else {
    flipped = false;
    card.classList.remove("flipped");
    buttonsContainer.style.display = "none";
  }
}

function markCorrect(event) {
  event.stopPropagation();
  const cardEl = document.getElementById("card");
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
    const correct = initialCardCount - wrong;

    let message = wrong === 0
      ? "🌟 أداء خارق! كل الإجابات صحيحة!"
      : (wrong <= 1 ? "👍 أداء ممتاز! أعد التمرين واستمر في التقدم." : "🧐 بداية طيبة! أعد التمرين وستتحسن بإذن الله.");

    document.getElementById("result").innerHTML = `
      <h2>${message}</h2>
      <p>⏱️ الوقت: ${minutes} دقيقة و ${seconds} ثانية</p>
      <button onclick="location.reload()">🔁 أعد التمرين</button>
    `;
    document.querySelector(".card-container").style.display = "none";
    document.getElementById("buttonsContainer").style.display = "none";
  } else {
    if (current >= cards.length) current = 0;
    showCard();
  }
}

window.onload = showCard;
