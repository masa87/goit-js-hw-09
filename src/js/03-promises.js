import Notiflix from 'notiflix';

const qs = selector => document.querySelector(selector);

const delay = qs('input[name="delay"]');
const step = qs('input[name="step"]');
const amount = qs('input[name="amount"]');
const btnSubmit = qs('button[type="submit"]');

const runFunction = e => {
  e.preventDefault();

  let delayValue = delay.valueAsNumber;
  let stepValue = step.valueAsNumber;

  function createPromise(position, delayValue) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          //Fullfill
          resolve(Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delayValue}ms`));
        } else {
          reject(Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delayValue}ms`));
          //Reject
        }
      }, delayValue);
    });
  }

  for (let i = 0; i < amount.value; i++) {
    let position = i + 1;
    delayValue = delayValue + stepValue;

    createPromise(position, delayValue)
      .then(value => {
        console.log(`✅ Fulfilled promise ${position} in ${delayValue}ms`);
        // console.log(value);
      })
      .catch(err => {
        console.log(`❌ Rejected promise ${position} in ${delayValue}ms`);
        // console.log(err);
      });
    console.log(delayValue);
    position++;
  }
};

btnSubmit.addEventListener('click', runFunction);
