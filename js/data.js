export async function getData(lang = "en", page = 1, limit = 10) {
  try {
    const response = await fetch(`../data/data-${lang}.csv`);
    const data = await response.text();
    const lines = data.split("\n").filter((line) => line.trim() !== "");
    const headings = lines.slice(0, 1);
    const rounds = lines.slice(1); // all rounds
    const totalQuestions = rounds.length;
    const totalPages = Math.ceil(totalQuestions / limit);
    const selectedRounds = rounds.slice((page - 1) * limit, page * limit); // Selected rounds
    const responseRounds = [];
    selectedRounds.forEach((round) => {
      const question = round.split(",")[0];
      const answersAndScores = round.split(",").slice(1);
      const answers = formatAnswers(answersAndScores);
      responseRounds.push({
        question,
        answers,
      });
    });
    return {
      headings: headings[0].split(","),
      result: {
        rounds: responseRounds,
        meta: {
          currentPage: page,
          totalPages,
          totalQuestions,
        },
      },
    };
  } catch (error) {
    console.error(error);
  }
}

function formatAnswers(answersAndScores) {
  let answers = [];
  for (let i = 0; i < answersAndScores.length; i += 2) {
    answers.push({
      text: answersAndScores[i + 1],
      score: answersAndScores[i],
    });
  }

  return answers;
}
