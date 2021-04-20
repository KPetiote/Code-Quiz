var mainScreenEl = document.getElementById("mainScreen");
var startQuizEl = document.getElementById("startButton");
var gameTimerEl = document.getElementById("gameTimer");
var questionsContainerEl = document.getElementById("questionsContainer");
var quizQuestionsEl = document.getElementById("quizQuestions");
var scoreSubmitEl = document.getElementById("scoreSubmit");
var finalScoreEL = document.getElementById("finalScore");
var highScoreEl = document.getElementById("highScore");
var questionInterval = 0;
var userScore = 0;

startQuizEl.addEventListener('click', startQuizGame)

// startQuizGame function will start the timer & hide the main screen
function startQuizGame(){
  setTimer()
  startQuizEl.classList.add('hideContent')
  questionsContainerEl.classList.remove('hideContent')
  mainScreenEl.classList.add('hideContent')
  showQuestions()
}

// Declare amount of seconds for the timer
var secondsLeft = 60;
function setTimer(){
  // Sets interval in variable  
  var timeFrame = setInterval(function() {
    secondsLeft--;
    gameTimer.textContent = secondsLeft;
    if(secondsLeft === 0){
      // Stop execution of action at set interval
      clearInterval(timeFrame);
    }
  }, 1000);
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
  questionsContainerEl.classList.add('hideContent')
  scoreSubmitEl.classList.remove('hideContent')
  finalScoreEL.textContent = userScore;
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