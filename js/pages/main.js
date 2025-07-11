import { getData } from "../data.js";
import {
  introSound,
  nextRoundSound,
  correctAnswerSound,
  strikeSound,
  playSound,
  stopSounds,
} from "../sounds.js";
import {
  strikesContainer,
  questionIndex,
  questionElement,
  answersElements,
  changeLangBtn,
  nextRoundBtn,
  prevRoundBtn,
  showAnswersBtn,
  introSoundBtn,
  strikeBtn,
  roundSelect,
} from "../elements.js";
import { registerGameKeyListener } from "../controls.js";
import { saveData } from "../storage.js";
import { language } from "../language.js";

// Global variables
let totalRounds;
let currentRound = parseInt(sessionStorage.getItem("ff-currentRound")) || 1;
let currentLanguage = localStorage.getItem("ff-language") || "en";
let strikes = 1;
let answersShown = false;

// Event listeners
document.addEventListener("DOMContentLoaded", (e) => {
  document.documentElement.dir = language[currentLanguage].dir;

  // Keyboard controls
  registerGameKeyListener(
    currentRound,
    playSound,
    { introSound, nextRoundSound },
    { showStrikes, toggleAnswer, nextRound, previousRound, selectRound }
  );

  // Update the round select element
  getData().then((res) => {
    totalRounds = res.result.meta.totalQuestions;
    // Update ui
    updateRoundSelectOptions();
    // Start the game
    showRound();
  });
});
introSoundBtn.addEventListener("click", () => {
  introSound.play();
});
changeLangBtn.addEventListener("click", changeLanguage);
nextRoundBtn.addEventListener("click", () => {
  playSound(nextRoundSound);
  nextRoundSound.addEventListener("ended", () => {
    nextRound();
  });
});
prevRoundBtn.addEventListener("click", () => {
  previousRound();
});
answersElements.forEach((answerDiv) =>
  answerDiv.addEventListener("click", () => {
    toggleAnswer(answerDiv.dataset.index);
  })
);
showAnswersBtn.addEventListener("click", () => {
  toggleAllAnswers(answersShown);
  answersShown = !answersShown;
});
strikeBtn.addEventListener("click", () => {
  if (strikes > 3) {
    strikes = 1;
  }
  showStrikes(strikes);
  playSound(strikeSound);
  strikes++;
});
roundSelect.addEventListener("change", (e) => {
  selectRound(e);
});

// Functions
async function showRound() {
  const data = await getData(currentLanguage, currentRound, 1);
  const round = data.result.rounds[0];
  const question = round.question;
  const answers = round.answers;

  // Add question
  questionElement.textContent = question;
  questionIndex.textContent = `${language[currentLanguage].content.question} ${currentRound}`;

  // Add answers
  for (let i = 0; i < answers.length; i++) {
    const p = answersElements[i].querySelector("p");
    const span = answersElements[i].querySelector("span");
    if (answersElements[i].dataset.show === "true") {
      p.textContent = answers[i].text;
    } else {
      p.textContent = `${language[currentLanguage].content.answer} ${i + 1}`;
    }

    answersElements[i].dataset.answer = answers[i].text;
    span.textContent = answers[i].score;
  }

  updateCurrentRoundInRoundSelect();
}

function nextRound() {
  if (currentRound >= totalRounds) return;
  strikes = 1;
  currentRound++;
  toggleAllAnswers(true);
  saveData("ff-currentRound", currentRound, sessionStorage);
  showRound();
}

function previousRound() {
  if (currentRound <= 1) return;
  strikes = 1;
  currentRound--;
  toggleAllAnswers(true);
  sessionStorage.setItem("ff-currentRound", currentRound);
  showRound();
}

function toggleAnswer(answerIndex) {
  const answerElement = document.querySelector(
    `.answer[data-index="${answerIndex}"]`
  );
  const answerText = answerElement.querySelector("p");
  if (answerElement.dataset.show === "false") {
    playSound(correctAnswerSound);
    answerText.textContent = answerElement.dataset.answer;
    answerElement.dataset.show = "true";
  } else {
    answerText.textContent = `${language[currentLanguage].content.answer} ${answerIndex}`;
    answerElement.dataset.show = "false";
  }
}

function changeLanguage() {
  currentLanguage === "en"
    ? (currentLanguage = "ar")
    : (currentLanguage = "en");
  saveData("ff-language", currentLanguage, localStorage);
  document.documentElement.dir = language[currentLanguage].dir;

  updateRoundSelectOptions();
  showRound();
}

function toggleAllAnswers(isShown) {
  answersElements.forEach((answer) => {
    answer.dataset.show = isShown;
    toggleAnswer(answer.dataset.index);
  });
}

function showStrikes(number) {
  strikeBtn.textContent = "Strike " + strikes;
  strikesContainer.innerHTML = "";
  playSound(strikeSound);
  for (let i = 0; i < number; i++) {
    const strikeImg = document.createElement("img");
    strikeImg.src = "assets/images/strike-img.png";
    strikeImg.alt = "strike-img";
    strikesContainer.appendChild(strikeImg);
  }
  strikesContainer.classList.add("show");
  strikeSound.addEventListener("ended", () => {
    strikesContainer.classList.remove("show");
  });
}

function updateCurrentRoundInRoundSelect() {
  for (let option of roundSelect.children) {
    if (parseInt(option.value) == currentRound) {
      option.selected = true;
    } else {
      option.selected = false;
    }
  }
}

function selectRound(e) {
  const round = e.target.value;
  currentRound = parseInt(round);
  saveData("ff-currentRound", currentRound, sessionStorage);
  showRound();
}

function updateRoundSelectOptions() {
  roundSelect.innerHTML = "";
  for (let i = 1; i <= totalRounds; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${language[currentLanguage].content.round} ${i}`;
    if (currentRound == i) {
      option.selected = true;
    }
    roundSelect.appendChild(option);
  }
}
