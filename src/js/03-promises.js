import Notiflix from 'notiflix';

const qs = selector => document.querySelector(selector);

const delay = qs('input[name="delay"]');
const step = qs('input[name="step"]');
const amount = qs('input[name="amount"]');
const btnSubmit = qs('button[type="submit"]');

const runFunction = e => {
  e.preventDefault();

  let delayValue = delay.valueAsNumber;
  let currentDelay = delayValue;
  let stepValue = step.valueAsNumber;

  function createPromise(position, delayValue) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      // setTimeout
      if (shouldResolve) {
        //Fullfill
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delayValue}ms`);
      } else {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delayValue}ms`);
        //Reject
      }
    });
  }

  setTimeout(() => {
    for (let i = 0; i < amount.value; i++) {
      createPromise(i + 1, delayValue)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      delayValue = delayValue + stepValue;
    }
  }, currentDelay);
};

btnSubmit.addEventListener('click', runFunction);
