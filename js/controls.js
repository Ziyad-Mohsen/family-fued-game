export function registerGameKeyListener(
  currentRound,
  soundPlayer,
  { introSound, nextRoundSound },
  { showStrikes, toggleAnswer, nextRound, previousRound }
) {
  document.addEventListener("keydown", (event) => {
    switch (event.key.toLowerCase()) {
      case "i":
        soundPlayer(introSound);
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
        toggleAnswer(event.key);
        break;
      case "q":
        showStrikes(1); // show 1 strike
        break;
      case "w":
        showStrikes(2); // show 2 strikes
        break;
      case "e":
        showStrikes(3); // show 3 strikes
        break;
      case "n":
        soundPlayer(nextRoundSound);
        nextRoundSound.addEventListener("ended", () => {
          nextRound();
        });
        break;
      case "p":
        if (currentRound > 0) {
          previousRound();
        }
        break;
      default:
        break;
    }
  });
}
