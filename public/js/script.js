const video = document.querySelector('#webcam')
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

let dogDetected = false

const cam = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream
  return new Promise((res) => {
    video.onloadedmetadata = () => res()
  })
}

const main = async () => {
  await cam()
  const model = await cocoSsd.load()
  
  const detectFrame = async () => {
    const guesses = await model.detect(video);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    guesses.forEach((detects) => {
      if(detects.class === 'dog'){
        const [x, y, w, h] = detects.bbox;
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, w, h);
        ctx.fillStyle = 'blue';
        ctx.fillText(`${detects.class} ${Math.round(detects.score * 100)}%`, x, y - 5)
        dogDetected = true
        const utterance = new SpeechSynthesisUtterance("Dog detected!");
        speechSynthesis.speak(utterance);
      } else {
        dogDetected = false
      }
    });
    requestAnimationFrame(detectFrame)
  }

  detectFrame()
}

main()