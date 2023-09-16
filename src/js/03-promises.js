import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-report-aio';


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
document.querySelector('.form').addEventListener('submit', function (e) {
  e.preventDefault();
  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  const promises = [];

  for (let i = 0; i < amount; i++) {
    const currentDelay = delay + i * step;
    promises.push(createPromise(i + 1, currentDelay));
  }

  promises.forEach((promise) => {
    promise
      .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
     Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  });
});

