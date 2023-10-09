const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

buttonStart.addEventListener('click', startChangingBackgroundColor);
buttonStop.addEventListener('click', stopChangingBackgroundColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let intervalId;
function startChangingBackgroundColor() {
  buttonStart.disabled = true;
  buttonStop.disabled = false;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangingBackgroundColor() {
  buttonStart.disabled = false;
  buttonStop.disabled = true;
  clearInterval(intervalId);
}
