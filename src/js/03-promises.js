const qs = selector => document.querySelector(selector);

const delay = qs('input[name="delay"]');
const step = qs('input[name="step"]');
const amount = qs('input[name="amount"]');
const btnSubmit = qs('button[type="submit"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    position;
  } else {
    // Reject
  }
}

const runFunction = () => {
  for (let i = 0; i <= amount.value; i++) {
    createPromise();
  }
};
