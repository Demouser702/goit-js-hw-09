import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const buttonStart = document.querySelector('button[data-start]');
const inputDate = document.querySelector('#datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

buttonStart.addEventListener('click', startCountDown);
buttonStart.disabled = true;
let selectedDate;
let countdownInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    } else {
      buttonStart.disabled = false;
      Notiflix.Notify.success('Press start to start countdown!');
    }
  },
};
flatpickr('input#datetime-picker', options);

function startCountDown() {
  const now = Date.now();
  const diff = selectedDate - now;
  if (diff <= 0) {
    Notiflix.Notify.warning('Please choose a date in the future');
    return;
  }

  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    const timeLeft = selectedDate - Date.now();
    if (timeLeft === 0) {
      clearInterval(countdownInterval);
      Notiflix.Notify.success('Countdown finished');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    addLeadingZero(days, hours, minutes, seconds);
  }, 1000);
}

function addLeadingZero(days, hours, minutes, seconds) {
  daysElement.textContent = days.toString().padStart(2, '0');
  hoursElement.textContent = hours.toString().padStart(2, '0');
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = seconds.toString().padStart(2, '0');
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
