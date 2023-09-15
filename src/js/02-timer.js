import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';

const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");
const startBtn = document.querySelector("[data-start]");
let myIntervalId;
let selectedDate;


// Функція для підрахунку значень часу
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
    return value.toString().padStart(2, "0");
}
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        const selectedDateTime = new Date(selectedDates[0]);
        const currentDateTime = new Date();
        if (selectedDates[0] <= options.defaultDate) {
            Notiflix.Report.warning("Please choose a date in the future");
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
            selectedDate = selectedDateTime;
        }
    },
};

flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", () => {
    const selectedDate = new Date(flatpickr("#datetime-picker").selectedDates[0]);

    function updateTimer() {
        const timedifference = selectedDate - new Date();
        if (timedifference <= 0) {
            clearInterval(myIntervalId);
        } else {
            const timeObject = convertMs(timedifference);
            daysEl.textContent = addLeadingZero(timeObject.days);
            hoursEl.textContent = addLeadingZero(timeObject.hours);
            minutesEl.textContent =  addLeadingZero(timeObject.minutes);
            secondsEl.textContent =  addLeadingZero(timeObject.seconds);
        }
    }
    clearInterval(myIntervalId);
    updateTimer();
    myIntervalId = setInterval(updateTimer, 1000);
});










