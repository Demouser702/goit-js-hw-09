import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const buttonStart = document.querySelector('button[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;
let selectedDate;

buttonStart.addEventListener('click', startCountdown);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      buttonStart.disabled = true;
      window.alert('Please choose a date in the future!');
    } else {
      buttonStart.disabled = false;
    }
  },
  onOpen(selectedDates, dateStr, instance) {
    buttonStart.disabled = true;
    instance.calendarContainer.classList.add('visible');
  },
};

flatpickr('input#datetime-picker', options);

function startCountdown() {
  let countdownDuration = selectedDate - new Date();

  if (countdownDuration <= 0) {
    return;
  }

  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const timeLeft = convertMs(countdownDuration);

    daysElement.textContent = addLeadingZero(timeLeft.days);
    hoursElement.textContent = addLeadingZero(timeLeft.hours);
    minutesElement.textContent = addLeadingZero(timeLeft.minutes);
    secondsElement.textContent = addLeadingZero(timeLeft.seconds);

    countdownDuration -= 1000;

    if (countdownDuration < 0) {
      clearInterval(countdownInterval);
      resetTimer();
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function resetTimer() {
  daysElement.textContent = '00';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
}
