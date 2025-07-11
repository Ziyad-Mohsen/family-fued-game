// Sound effects
export const introSound = new Audio(
  "assets/sounds/family-feud-introduction.mp3"
);
export const nextRoundSound = new Audio(
  "assets/sounds/family-feud-next-round-effect.mp3"
);
export const correctAnswerSound = new Audio(
  "assets/sounds/family-feud-good-answer.mp3"
);
export const strikeSound = new Audio("assets/sounds/family-feud-strike.mp3");

export function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

export function stopSounds() {
  const sounds = document.querySelectorAll("audio");
  sounds.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
  });
}
