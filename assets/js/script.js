// Variables assigned to grab HTML Elements
var questionInterval = 0;
var userScore = 0;

var mainScreenEl = document.getElementById("mainScreen");
var questionsScreenEl = document.getElementById("questionsScreen");
var finishScreenEl = document.getElementById("finishScreen");

var startQuizEl = document.getElementById("startButton");
var goBackButtonEl = document.getElementById("goBackButton")
var clearHighScoresButtonEl = document.getElementById("clearHighScoresButton")
var gameTimerEl = document.getElementById("gameTimer");
var quizQuestionsEl = document.getElementById("quizQuestions");

var finalScoreEL = document.getElementById("finalScore");
var highScoresEl = document.getElementById("highScores");
var userInitialsEL = document.getElementById("userInitials");
var submitInitialsEl = document.getElementById("submitInitials");
var viewHighScoresEl = document.getElementById("viewHighScores");
var dummyViewHighScoresEl = document.getElementById("dummyViewHighScores");

/* Event Listeners */
// Start Quiz Event Listener
startQuizEl.addEventListener('click', startQuizGame)

// Submit Initials Event Listener
submitInitialsEl.addEventListener("click", function(event){ 
  storeUserScores(event);
});

// View the High Scores Event Listener
viewHighScoresEl.addEventListener("click", function(event) { 
  showHighScores(event);
});

// Back to Main Screen Event Listener
goBackButtonEl.addEventListener("click", function() {
  mainScreenEl.classList.remove('hideContent')
  highScoresEl.classList.add('hideContent')
});

// Clear High Scores Event Listener
clearHighScoresButtonEl.addEventListener("click", function(){
  window.localStorage.removeItem("high scores");
  listOfHighScores.innerHTML = "High Scores are Cleared!";
});

/* Start Quiz */
// Declare amount of seconds for the timer
var secondsLeft = 60;

// startQuizGame function will start the timer & hide the main screen
function startQuizGame(){

  startQuizEl.classList.add('hideContent')
  questionsScreenEl.classList.remove('hideContent')
  mainScreenEl.classList.add('hideContent')

  viewHighScoresEl.classList.add('hideContent')
  dummyViewHighScoresEl.classList.remove('hideContent')

  questionInterval = 0;
  secondsLeft = 59;
  // Sets interval in variable  
  var timeFrame = setInterval(function() {
    secondsLeft--;
    gameTimerEl.textContent = secondsLeft;
    if(secondsLeft <= 0){
      // Stop execution of action at set interval
      clearInterval(timeFrame);
      if (questionInterval < questions.length - 1) {
        gameOver();
    }
  }
  },1000);

  showQuestions();
}

function showQuestions(){
  let quizQuestion = questions[questionInterval].question;
  quizQuestionsEl.textContent = quizQuestion; 
  // loop over questions[questionInterval].answers
  var buttonSection = document.getElementById("answerButtons");
  buttonSection.innerHTML = ""
  
  // var lineBreak = document.getElementById("lineBreak");
  lineBreak.style.display = "block";
  checkAnswer.style.display = "block";

  for (let i = 0; i < questions[questionInterval].answers.length; i++) {
    // Create a button for each answer,
    var button = document.createElement("button");
    button.innerHTML = questions[questionInterval].answers[i].text;
    buttonSection.append(button)
    
    // Add an Event Listener to each button, run function 
    button.addEventListener("click", function(event){
      var userAnswer = event.target.textContent;
      var correctAnswer = questions[questionInterval].correctAnswer;

      if(userAnswer == correctAnswer) {
        secondsLeft += 10;
        userScore += 20;
        checkAnswer.textContent = "Correct!";
      }
      else{
        secondsLeft -= 10;
        checkAnswer.textContent = "Wrong! The answer is: " + questions[questionInterval].correctAnswer;
      }
      questionInterval += 1;
      if (questionInterval != questions.length){
        showQuestions();
      } else {
        gameOver()
      }
    })
    ;
  }
}

// Show final score
function gameOver() {
  questionsScreenEl.classList.add('hideContent')
  finishScreenEl.classList.remove('hideContent')
  finalScoreEL.textContent = userScore;
}

// Enter User Score in Local Storage
function storeUserScores(event) {
  event.preventDefault();

  // Prevents User from entering blank Initials
  if (userInitialsEL.value === "") {
    alert("Please enter your initials!");
    return;
  } 

  // Stores score into local storage
  var savedHighScores = localStorage.getItem("high scores");
  var highScoresArray;

  if (savedHighScores === null) {
    highScoresArray = [];
  } else {
    highScoresArray = JSON.parse(savedHighScores)
  }

  var userScore = {
    initials: userInitialsEL.value,
    score: finalScoreEL.textContent
  };

  console.log(userScore);
  highScoresArray.push(userScore);

  // stringify array in order to store in local
  var highScoresArrayString = JSON.stringify(highScoresArray);
  window.localStorage.setItem("high scores", highScoresArrayString);
  
  // Shows current High Scores
  showHighScores();
}

// Show High Score Function
var i = 0;
function showHighScores() {

  mainScreenEl.classList.add('hideContent')
  questionsScreenEl.classList.add('hideContent')
  finishScreenEl.classList.add('hideContent')
  highScoresEl.classList.remove('hideContent')
  secondsLeft = 0;

  var savedHighScores = localStorage.getItem("high scores");

  // Check if anything is store in local storage
  if (savedHighScores === null) {
    return;
  }

  var storedHighScores = JSON.parse(savedHighScores);

  for (; i < storedHighScores.length; i++) {
    var eachNewHighScore = document.createElement("p");
    eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
    listOfHighScores.appendChild(eachNewHighScore);
  }
}

// List of questions
const questions = [
  {
    question: 'Hyper Text Markup Language Stand For?',
    answers: [
      { text: 'HyperText Markup Language', correct: true },
      { text: 'HighText Machine Language', correct: false },
      { text: 'HyperText and links Markup Language', correct: false },
      { text: 'None of these', correct: false },
    ],
    correctAnswer: 'HyperText Markup Language'
  },

  {
    question: 'Which language is used for styling web pages?',
    answers: [
      { text: 'HTML', correct: false },
      { text: 'JQuery', correct: false },
      { text: 'XML', correct: false },
      { text: 'CSS', correct: true },
    ],
    correctAnswer: 'CSS'
  },

  {
    question: 'What does CSS stand for?',
    answers: [
      { text: 'Current Style Sheets', correct: false },
      { text: 'Current Sheets Style', correct: false },
      { text: 'Cascading Sheets Style', correct: false },
      { text: 'Cascading Style Sheets', correct: true },
    ],
    correctAnswer: 'Cascading Style Sheets'
  },

  {
    question: 'Which is not a JavaScript Framework?',
    answers: [
      { text: 'Python Script', correct: false },
      { text: 'Django', correct: true },
      { text: 'JQuery', correct: false },
      { text: 'NodeJS', correct: false },
    ],
    correctAnswer: 'Django'
  },

  {
    question: 'Which of the following is true about Javascript?',
    answers: [
      { text: 'It is client side scripting language', correct: false },
      { text: 'It is a server side scripting language', correct: true },
      { text: 'It is a Software', correct: false },
      { text: 'It is a database', correct: false },
    ],
    correctAnswer: 'It is a server side scripting language'
  },
];