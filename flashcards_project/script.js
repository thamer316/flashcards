
let cards = [
  { question: "ما الصيغة الجزيئية للميثان؟", answer: "CH₄" },
  { question: "ما الصيغة الجزيئية للإيثان؟", answer: "C₂H₆" },
  { question: "ما الصيغة الجزيئية للبروبان؟", answer: "C₃H₈" }
];

let current = 0;
let wrong = 0;
let flipped = false;
let startTime = null;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showCard() {
  if (cards.length === 0) return;
  const q = document.getElementById("question");
  const a = document.getElementById("answerText");
  const card = cards[current];
  q.textContent = card.question;
  a.textContent = card.answer;
  document.getElementById("card").classList.remove("flipped");
  document.getElementById("buttonsContainer").style.display = "none";
  flipped = false;
  if (!startTime) startTime = new Date();
}

function flipCard() {
  if (!flipped) {
    flipped = true;
    document.getElementById("card").classList.add("flipped");
    document.getElementById("buttonsContainer").style.display = "flex";
  }
}

function markCorrect(event) {
  event.stopPropagation();
  cards.splice(current, 1);
  nextCard();
}

function markWrong(event) {
  event.stopPropagation();
  const wrongCard = cards[current];
  cards.splice(current, 1);
  cards.push(wrongCard);
  wrong++;
  nextCard();
}

function nextCard() {
  if (cards.length === 0) {
    const endTime = new Date();
    const timeSpent = Math.floor((endTime - startTime) / 1000);
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    const timeString = `${minutes > 0 ? minutes + " دقيقة و " : ""}${seconds} ثانية`;
    const correct = 3 - wrong;
    const total = correct + wrong;
    const score = Math.round((correct / total) * 100);
    let message = "";
    if (score === 100) {
      message = "🎉 مذهل! لم تُخطئ بأي بطاقة!";
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
    } else if (score >= 90) {
      message = `🌟 ممتاز جدًا! إتقانك ${score}٪`;
    } else if (score >= 75) {
      message = `👍 جيد! إتقانك ${score}٪`;
    } else {
      message = `🧐 تحتاج للمراجعة!`;
    }
    document.getElementById("result").innerHTML = `
      <h2>${message}</h2>
      <p>⏱️ الوقت: ${timeString}</p>
      <button onclick="restart()" style="margin-top: 10px;">🔁 أعد التمرين</button>
    `;
    document.querySelector(".card-container").style.display = "none";
    document.getElementById("buttonsContainer").style.display = "none";
  } else {
    if (current >= cards.length) current = 0;
    showCard();
  }
}

function restart() {
  cards = [
    { question: "ما الصيغة الجزيئية للميثان؟", answer: "CH₄" },
    { question: "ما الصيغة الجزيئية للإيثان؟", answer: "C₂H₆" },
    { question: "ما الصيغة الجزيئية للبروبان؟", answer: "C₃H₈" }
  ];
  shuffle(cards);
  current = 0;
  wrong = 0;
  flipped = false;
  startTime = null;
  document.querySelector(".card-container").style.display = "block";
  document.getElementById("result").innerHTML = "";
  document.getElementById("buttonsContainer").style.display = "none";
  showCard();
}

window.onload = () => {
  shuffle(cards);
  showCard();
};
