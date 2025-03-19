const firstNumElement = document.getElementById('first-num');
const operatorElement = document.getElementById('operator');
const secondNumElement = document.getElementById('second-num');
const timeElement = document.getElementById('time');
const buttons = document.querySelectorAll('.answers button');
const scoreElement = document.getElementById('score');
let score = 0;
const navIcon = document.getElementById('nav-icon');
const navList = document.getElementById('nav-list');
const navItem = document.querySelectorAll('.navbar-list li');

// Nav block
navIcon.addEventListener('click', () => {
    navList.classList.toggle('opened');
});

navItem.forEach(item => {
    item.addEventListener('click', () => {
        navList.classList.remove('opened');
    });
});

// Correct answer block
let correctAnswer;

// Function to generate a new question
function generateNewQuestion() {
    const num1 = Math.floor(Math.random() * currentDifficulty.maxNum) + 1;
    const num2 = Math.floor(Math.random() * currentDifficulty.maxNum) + 1;

    const operators = currentDifficulty.operators;
    const randomOperator = selectedOperator || operators[Math.floor(Math.random() * operators.length)];

    firstNumElement.textContent = num1;
    operatorElement.textContent = randomOperator;
    secondNumElement.textContent = num2;

    switch (randomOperator) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            correctAnswer = num1 - num2;
            break;
        case '*':
            correctAnswer = num1 * num2;
            break;
        case '/':
            correctAnswer = parseFloat((num1 / num2).toFixed(1)); // Limit division answers to 1 decimal place
            break;
    }

    // Generate multiple choices
    let answers = new Set();
    answers.add(correctAnswer);

    while (answers.size < 4) {
        let randomWrongAnswer = parseFloat((correctAnswer + (Math.random() * 10 - 5)).toFixed(1));
        if (randomWrongAnswer !== correctAnswer && randomWrongAnswer > 0) {
            answers.add(randomWrongAnswer);
        }
    }

    answers = Array.from(answers).sort(() => Math.random() - 0.5);
    buttons.forEach((button, index) => {
        button.textContent = answers[index];
        button.classList.remove('correct', 'incorrect');
    });
}

// Block that shows whether the selected answer is correct or not
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedAnswer = parseFloat(button.textContent);
        buttons.forEach(btn => btn.classList.remove('correct', 'incorrect'));

        if (selectedAnswer === correctAnswer) {
            button.classList.add('correct');
            score += 10;
        } else {
            button.classList.add('incorrect');
            score -= 10;
        }

        scoreElement.textContent = score;

        // Apply some delay for visual clarity
        setTimeout(() => {
            generateNewQuestion();
            startCountdown();
        }, 700);
    });
});

// Countdown timer
let timeLeft;
let countdownTimer;

function startCountdown() {
    clearInterval(countdownTimer);
    timeLeft = currentDifficulty.time;
    timeElement.textContent = timeLeft;

    countdownTimer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;

        if (timeLeft < 1) {
            clearInterval(countdownTimer);
            buttons.forEach(btn => btn.disabled = true);
            setTimeout(() => {
                initializeGame();
                buttons.forEach(btn => btn.disabled = false);
            }, 1000); // Give 1 second delay before resetting the game
            score -= 10;
            scoreElement.textContent = score;
        }
    }, 1000);
}

// Difficulty block
const difficultyLevels = {
    easy: { maxNum: 10, time: 5, operators: ['+', '-'] },
    medium: { maxNum: 20, time: 3, operators: ['+', '-', '*'] },
    hard: { maxNum: 50, time: 2, operators: ['+', '-', '*', '/'] }
};

let currentDifficulty = difficultyLevels.easy; // Default difficulty

const difficultyOptions = {
    easy: document.getElementById('easy'),
    medium: document.getElementById('medium'),
    hard: document.getElementById('hard')
};

Object.keys(difficultyOptions).forEach(level => {
    difficultyOptions[level].addEventListener('click', () => {
        currentDifficulty = difficultyLevels[level];
        initializeGame();
    });
});

// Section for selecting operations
let selectedOperator = null;

const operatorOptions = {
    addition: document.getElementById('addition'),
    subtraction: document.getElementById('subtraction'),
    multiplication: document.getElementById('multiplication'),
    division: document.getElementById('division')
};

const operatorMap = {
    addition: '+',
    subtraction: '-',
    multiplication: '*',
    division: '/'
};

Object.keys(operatorOptions).forEach(op => {
    operatorOptions[op].addEventListener('click', () => {
        selectedOperator = operatorMap[op];
        initializeGame();
    });
});

function initializeGame() {
    generateNewQuestion();
    startCountdown();
}

initializeGame();
