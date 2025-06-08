let x = 0

setTimeout(() => {
  while (x < 3) {
  const utterance = new SpeechSynthesisUtterance("Dog detected!");
  speechSynthesis.speak(utterance);
  x += 1
  }
}, 2000);