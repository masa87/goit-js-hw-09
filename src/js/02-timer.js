import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const qs = selector => document.querySelector(selector);

const btnStart = qs('button[data-start]');
const btnStop = qs('button[data-stop]');
const days = qs('span[data-days]');
const hours = qs('span[data-hours]');
const minutes = qs('span[data-minutes]');
const seconds = qs('span[data-seconds]');

btnStart.disabled = true;
btnStop.disabled = true;
let selectedDate = null;
let currentDate = null;
let remainingTime = null;
let currentValue = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();

    if (selectedDates[0].getTime() <= date.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      Notiflix.Notify.success('Correct date choosen, press start to begin countdown');
      btnStart.disabled = false;
      btnStop.disabled = false;
      selectedDate = selectedDates[0];
      currentDate = date;
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  return (currentValue = value.toString().padStart(2, 0));
};

function counter() {
  let time = selectedDate.getTime() - currentDate.getTime();
  remainingTime = setInterval(() => {
    time -= 1000;
    if (time <= 200) {
      clearInterval(remainingTime);
      Notiflix.Report.failure('Out of time!', '"You are dead!"');
    } else {
      let remaining = convertMs(time);
      days.innerHTML = addLeadingZero(remaining.days);
      hours.innerHTML = addLeadingZero(remaining.hours);
      minutes.innerHTML = addLeadingZero(remaining.minutes);
      seconds.innerHTML = addLeadingZero(remaining.seconds);
      btnStart.disabled = true;
    }
  }, 1000);
}

const stopCounter = () => {
  clearInterval(remainingTime);
  btnStart.disabled = false;
};

flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', counter);
btnStop.addEventListener('click', stopCounter);
