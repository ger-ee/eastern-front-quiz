const questions = [
  { q: "What was Operation Barbarossa?", a: ["The Soviet invasion of Poland", "The German invasion of the Soviet Union", "The Allied invasion of France", "The Soviet counteroffensive at Stalingrad"], c: 1 },
  { q: "Which city endured a 900-day siege?", a: ["Stalingrad", "Leningrad", "Moscow", "Kiev"], c: 1 },
  { q: "Who commanded German Army Group Center at the start of Barbarossa?", a: ["Heinz Guderian", "Fedor von Bock", "Erich von Manstein", "Erwin Rommel"], c: 1 },
  { q: "When did Barbarossa begin?", a: ["June 22, 1941", "Sept 1, 1939", "Dec 7, 1941", "May 10, 1940"], c: 0 },
  { q: "Turning point widely identified on the Eastern Front?", a: ["Moscow", "Kursk", "Stalingrad", "Smolensk"], c: 2 },
  { q: "Soviet general famed for the defense of Stalingrad?", a: ["Vasily Chuikov", "Georgy Zhukov", "Konstantin Rokossovsky", "Semyon Timoshenko"], c: 0 },
  { q: "Name of the 1943 German offensive at Kursk?", a: ["Operation Citadel", "Operation Typhoon", "Operation Blue", "Operation Bagration"], c: 0 },
  { q: "Which operation liberated Belarus in 1944?", a: ["Overlord", "Typhoon", "Torch", "Bagration"], c: 3 },
  { q: "Which city was renamed Volgograd after the war?", a: ["Leningrad", "Kursk", "Stalingrad", "Kharkov"], c: 2 },
  { q: "Which conference shaped postwar Soviet influence in Eastern Europe?", a: ["Tehran", "Yalta", "Potsdam", "Moscow 1944"], c: 1 },
  { q: "German plan to capture Moscow in 1941 was called…", a: ["Operation Typhoon", "Operation Sea Lion", "Operation Uranus", "Operation Mars"], c: 0 },
  { q: "Soviet encirclement that trapped the German 6th Army was…", a: ["Operation Uranus", "Operation Mars", "Operation Saturn", "Operation Torch"], c: 0 },
  { q: "Largest tank clashes near Prokhorovka occurred during…", a: ["Operation Citadel", "Operation Blue", "Operation Typhoon", "Operation Market Garden"], c: 0 },
  { q: "Order No. 227 (‘Not one step back!’) was issued in…", a: ["1941", "1942", "1943", "1944"], c: 1 },
  { q: "Lend-Lease item most critical to Soviet mobility was…", a: ["Tanks", "Rifles", "Trucks", "Submarines"], c: 2 }
];

let shuffled = [], index = 0, score = 0;

const quiz = document.getElementById("quiz");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  shuffled = questions.sort(() => Math.random() - 0.5);
  index = 0; score = 0;
  renderQuestion();
}

function renderQuestion() {
  const q = shuffled[index];
  quiz.innerHTML = `
    <div class="card fade-in">
      <p class="q">${q.q}</p>
      <div class="answers">
        ${q.a.map((ans, i) => `<button onclick="selectAnswer(${i})">${ans}</button>`).join("")}
      </div>
      <div class="feedback" id="feedback"></div>
      <div class="progress-bar"><div class="progress" id="progress"></div></div>
    </div>
  `;
  updateProgress();
}

function selectAnswer(choice) {
  const q = shuffled[index];
  const buttons = document.querySelectorAll(".answers button");
  const feedback = document.getElementById("feedback");
  buttons.forEach(b => b.disabled = true);

  if (choice === q.c) {
    buttons[choice].classList.add("correct");
    feedback.textContent = "✅ Correct!";
    score++;
  } else {
    buttons[choice].classList.add("wrong");
    buttons[q.c].classList.add("correct");
    feedback.textContent = "❌ Wrong!";
  }

  setTimeout(nextQuestion, 1200);
}

function nextQuestion() {
  index++;
  if (index < shuffled.length) renderQuestion();
  else showResults();
}

function updateProgress() {
  const bar = document.getElementById("progress");
  bar.style.width = `${(index / questions.length) * 100}%`;
}

function showResults() {
  quiz.innerHTML = `
    <div class="card fade-in">
      <h2>You scored ${score} / ${questions.length}</h2>
      <p>${score >= 12 ? "🎯 Impressive command of history!" :
         score >= 8 ? "📚 Solid grasp — a few blind spots left." :
         "🕳️ The fog of war got you this time."}</p>
      <button id="restartBtn">Try Again</button>
    </div>
  `;
  document.getElementById("restartBtn").onclick = startQuiz;
}
