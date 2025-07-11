import { getData } from "../data.js";

let totalRounds;
let currentRound;
let language = localStorage.getItem("ff-language") || "en";

document.addEventListener("DOMContentLoaded", () => {
  const roundInput = document.querySelector(".nav-container input");

  getData().then((data) => {
    totalRounds = data.result.meta.totalQuestions;
    roundInput.max = totalRounds;

    // Handle searching rounds
    roundInput.addEventListener("input", (e) => {
      const roundNumber = e.target.value;
      if (roundNumber) {
        currentRound = parseInt(e.target.value);
        showData(currentRound, 1);
      } else {
        showData();
      }
    });

    // Handle changing language
    document.querySelector(".change-lang-btn").addEventListener("click", () => {
      language = language == "en" ? "ar" : "en";
      if (currentRound) {
        showData(currentRound, 1);
      } else {
        showData();
      }
    });

    // initial load
    showData();
  });
});

async function showData(page = 1, limit = totalRounds || 10) {
  const tableBody = document.querySelector("tbody");
  const tableHeaderRow = document.querySelector("thead tr");
  const data = await getData(language, page, limit);
  const headings = data.headings;
  const rounds = data.result.rounds;

  tableHeaderRow.innerHTML = "";
  headings.forEach((heading) => {
    const tableHeading = createHeading(heading);
    tableHeaderRow.appendChild(tableHeading);
  });

  tableBody.innerHTML = "";
  rounds.forEach((round) => {
    const tableRow = createTableRow(round, headings);
    tableBody.appendChild(tableRow);
  });
}

// Dom functions
function createTableRow(round, headings) {
  const tr = document.createElement("tr");
  let answerIndex = 0;
  for (let i = 0; i < headings.length; i += 2) {
    if (i == 0) {
      const heading = headings[i];
      const question = round.question;
      const questionTd = document.createElement("td");
      questionTd.textContent = question;
      questionTd.dataset.label = heading + ": ";
      tr.appendChild(questionTd);
    } else {
      const scoreHeading = headings[i - 1];
      const answerHeading = headings[i];
      const scoreTd = document.createElement("td");
      const answerTd = document.createElement("td");

      // Add labels to show in small screens
      scoreTd.dataset.label = scoreHeading + ": ";
      answerTd.dataset.label = answerHeading + ": ";

      // Add content to td
      const answer = round.answers[answerIndex];
      answerTd.textContent = answer.text;
      scoreTd.textContent = answer.score;

      // Append to table row
      tr.appendChild(scoreTd);
      tr.appendChild(answerTd);
      answerIndex++;
    }
  }

  return tr;
}

function createHeading(heading) {
  const tableHeading = document.createElement("th");
  tableHeading.className = "ff-th";
  tableHeading.textContent = heading;
  return tableHeading;
}
