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
  let checkDogState = false

  const detectFrame = async () => {
    const guesses = await model.detect(video);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(guesses.length);
    let dogDetected = guesses.some(detects => detects.class === 'dog');



    guesses.forEach((detects) => {
      if(dogDetected){
        if(detects.class === 'dog'){
        const [x, y, w, h] = detects.bbox;
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, w, h);
        ctx.fillStyle = 'blue';
        ctx.fillText(`${detects.class} ${Math.round(detects.score * 100)}%`, x, y - 5)
          if(dogDetected && !checkDogState){
            talkDog()
          }
          checkDogState = true;
          console.log(dogDetected)
          console.log(checkDogState)
          console.log(typeof detects)
        }
      }
    });
    if (guesses.length === 0 && checkDogState) {
      stopDog()
      checkDogState = false
    }
    requestAnimationFrame(detectFrame)
  }
  detectFrame()
}

const talkDog = () => {
  document.querySelector('.dog').innerText = 'DOG DETECTED!';
  document.querySelector('.dog').style.backgroundColor = 'lime';
  const utterance = new SpeechSynthesisUtterance("Dog detected!");
  speechSynthesis.speak(utterance);
}

const stopDog = () => {
  document.querySelector('.dog').innerText = 'NO DOG DETECTED!';
  document.querySelector('.dog').style.backgroundColor = 'red';
  const utterance = new SpeechSynthesisUtterance("No dog detected!");
  speechSynthesis.speak(utterance);
}

main()