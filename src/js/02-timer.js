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

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates, dateStr, instance) {
        selectedDate = instance.selectedDates[0];

        if (selectedDate <= new Date()) {
            Notiflix.Report.warning("Please choose a date and time in the future");
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
        }
    },
};

flatpickr("#datetime-picker", options);

function updateTimer() {
    const currentTime = new Date();
    const timeDifference = (selectedDate - currentTime) / 1000;

    if (timeDifference <= 0) {
        clearInterval(myIntervalId);
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        startBtn.disabled = true;
    } else {
        const timeObject = convertMs(timeDifference * 1000);
        daysEl.textContent = addLeadingZero(timeObject.days);
        hoursEl.textContent = addLeadingZero(timeObject.hours);
        minutesEl.textContent = addLeadingZero(timeObject.minutes);
        secondsEl.textContent = addLeadingZero(timeObject.seconds);
        startBtn.disabled = false;
    }
}

startBtn.addEventListener("click", () => {
    updateTimer();
    myIntervalId = setInterval(updateTimer, 1000)
});


