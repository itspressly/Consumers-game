const levels = [
    {
        level: "Level 1: Food and Nutrition",
        questions: [
            {
                question: "Which nutrient is most important for muscle repair?",
                options: ["Carbohydrates", "Proteins", "Fats", "Vitamins"],
                correctAnswer: 1
            },
            {
                question: "Which of these is a healthy fat?",
                options: ["Trans fat", "Saturated fat", "Monounsaturated fat", "Cholesterol"],
                correctAnswer: 2
            }
        ]
    },
    {
        level: "Level 2: Consumer Rights",
        questions: [
            {
                question: "Which act protects consumers from false advertising?",
                options: ["Consumer Protection Act", "Advertising Standards Act", "Truth in Lending Act", "Competition Act"],
                correctAnswer: 0
            },
            {
                question: "Consumers have the right to return goods if they are faulty within:",
                options: ["1 week", "10 days", "6 months", "1 year"],
                correctAnswer: 2
            }
        ]
    },
    {
        level: "Level 3: Financial Literacy",
        questions: [
            {
                question: "What is the best method to save money?",
                options: ["Borrowing", "Investing", "Spending", "Budgeting"],
                correctAnswer: 3
            }
        ]
    }
];

let currentLevel = 0;
let currentQuestion = 0;
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;

const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");
const clickSound = new Audio("sounds/click.mp3");

const levelTitle = document.getElementById("level-title");
const questionText = document.getElementById("question-text");
const resultText = document.getElementById("result-text");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const player1ScoreDisplay = document.getElementById("player1-score");
const player2ScoreDisplay = document.getElementById("player2-score");

function loadQuestion() {
    const question = levels[currentLevel].questions[currentQuestion];
    questionText.textContent = question.question;

    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach((btn, index) => {
        btn.textContent = question.options[index];
        btn.onclick = () => checkAnswer(index);
    });

    resultText.textContent = "";
    nextBtn.style.display = "none";
}

function checkAnswer(selectedAnswer) {
    const question = levels[currentLevel].questions[currentQuestion];
    
    if (selectedAnswer === question.correctAnswer) {
        resultText.textContent = `Player ${currentPlayer}: Correct!`;
        correctSound.play();
        if (currentPlayer === 1) {
            player1Score++;
            player1ScoreDisplay.textContent = player1Score;
        } else {
            player2Score++;
            player2ScoreDisplay.textContent = player2Score;
        }
    } else {
        resultText.textContent = `Player ${currentPlayer}: Incorrect!`;
        wrongSound.play();
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;  // Switch players
    nextBtn.style.display = "block";  // Show 'Next' button
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion >= levels[currentLevel].questions.length) {
        currentLevel++;
        currentQuestion = 0;
        if (currentLevel >= levels.length) {
            endGame();
        } else {
            loadQuestion();
        }
    } else {
        loadQuestion();
    }
}

function endGame() {
    levelTitle.textContent = "Game Over!";
    questionText.textContent = `Player 1 Score: ${player1Score} | Player 2 Score: ${player2Score}`;
    document.getElementById("answers").style.display = "none";
    nextBtn.style.display = "none";
    restartBtn.style.display = "block";  // Show the restart button
}

function restartGame() {
    // Reset all game variables
    currentLevel = 0;
    currentQuestion = 0;
    player1Score = 0;
    player2Score = 0;
    currentPlayer = 1;

    // Reset score displays
    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;

    // Reset UI elements
    document.getElementById("answers").style.display = "block";
    restartBtn.style.display = "none";
    nextBtn.style.display = "none";

    // Start game again from the first question
    loadQuestion();
}

// Initial load
loadQuestion();
