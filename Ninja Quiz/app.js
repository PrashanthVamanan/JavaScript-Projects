const correctAnswers = ['B', 'B', 'B', 'B'];
const form = document.querySelector('.quiz-form');
const result = document.querySelector('.result');
const scoreDisplay = document.querySelector('div.container > p > span');

form.addEventListener("submit", e => {
    e.preventDefault();

    let score = 0;
    const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value];

    //check answers
    userAnswers.forEach((answer, index) => {
        if (answer === correctAnswers[index]) {
            score += 25;
        }
    });

    //show result on page
    scrollTo(0, 0);
    result.classList.remove('d-none');

    let counter = 0;

    let timer = setInterval(() => {
        scoreDisplay.textContent = counter + "%";

        if (counter === score) {
            clearInterval(timer);
        } else {
            counter++;
        }

    }, 10);


});

