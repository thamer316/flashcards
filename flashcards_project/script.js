let cards = [
  { question: "ما الصيغة الجزيئية للميثان؟", answer: "CH₄" },
  { question: "ما الصيغة الجزيئية للإيثان؟", answer: "C₂H₆" },
  { question: "ما الصيغة الجزيئية للبروبان؟", answer: "C₃H₈" }
];

let current = 0;
let wrong = 0;
let flipped = false;
let startTime = null;

const perfectMessages = [
  "🎉 مذهل! لم تُخطئ بأي بطاقة! هذا هو الإتقان الحقيقي!",
  "🏅 أداء خارق! كل إجاباتك صحيحة. استمر نحو القمة!",
  "🌟 ممتاز جدًا! لا يوجد ما يُقال سوى: 👏👏👏",
  "🔥 عقلك في أفضل حالاته! لا خطأ واحد يُذكر!",
  "💎 إتقان كامل! هنيئًا لك هذا المستوى الرائع!"
];

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
  const a = document.getElementById("answer");
  const card = cards[current];

  q.textContent = card.question;
  a.textContent = card.answer;

  document.getElementById("card").classList.remove("flipped");
  document.querySelector(".buttons").style.display = "none";
  flipped = false;

  if (!startTime) {
    startTime = new Date();
  }
}

function flipCard() {
  flipped = !flipped;
  document.getElementById("card").classList.toggle("flipped", flipped);
  document.querySelector(".buttons").style.display = flipped ? "flex" : "none";
}

function markCorrect() {
  cards.splice(current, 1);
  nextCard();
}

function markWrong() {
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

    const correct = document.querySelectorAll(".card").length - wrong;
    const total = correct + wrong;
    const score = Math.round((correct / total) * 100);
    let message = "";

    if (score === 100) {
      const randomIndex = Math.floor(Math.random() * perfectMessages.length);
      message = perfectMessages[randomIndex];

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        confetti({
          particleCount: 30,
          angle: 90,
          spread: 70,
          startVelocity: 40,
          origin: { y: 1 },
          shapes: ['circle'],
          colors: ['#ff0000', '#00ccff', '#ffaa00', '#66ff66'],
          scalar: 2
        });
      }, 800);
    } else if (score >= 90) {
      message = `🌟 ممتاز جدًا! إتقانك ${score}٪، تابع التألق!`;
    } else if (score >= 75) {
      message = `👍 أداء جيد! إتقانك ${score}٪، يمكنك التحسن أكثر.`;
    } else if (score >= 60) {
      message = `💪 ما زلت بحاجة إلى مراجعة، حاول مجددًا!`;
    } else {
      message = `🧐 تحتاج لتكرار التمرين، لا تستسلم!`;
    }

    document.getElementById("result").innerHTML = `
      <h2>${message}</h2>
      <p>⏱️ الوقت المستغرق: ${timeString}</p>
      <button onclick="restart()" style="margin-top: 10px; font-size: 16px;">🔁 أعد التمرين</button>
    `;

    document.querySelector(".card-container").style.display = "none";
    document.querySelector(".buttons").style.display = "none";
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
  document.querySelector(".buttons").style.display = "none";
  document.getElementById("result").innerHTML = "";
  showCard();
}

window.onload = () => {
  shuffle(cards);
  showCard();
};
