
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let myIdInterval;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function startColorChange() {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    myIdInterval = setInterval(() => {
    let color = getRandomHexColor();
    document.body.style.backgroundColor = color;
  }, 1000);
}

function stopColorChange() {
        clearInterval(myIdInterval);
    stopBtn.disabled = true;
    startBtn.disabled = false;
}

startBtn.addEventListener('click', startColorChange);
stopBtn.addEventListener('click',stopColorChange)

