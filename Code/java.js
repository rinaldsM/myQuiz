// identifying & storing elements
let submitBtn = document.querySelector('[type=button]')
let scoreText = document.querySelector('h1')
let timerText = document.querySelector('h2')
let result = document.querySelector('p')
let pageTheme = document.getElementById('theme')
ansOneButton = document.getElementById('answerOne')
ansTwoButton = document.getElementById('answerTwo')
ansThreeButton = document.getElementById('answerThree')
//this variably determines which radio has the correct answer
let rightAnswer = "answerOne"
let score = 0
let darkButton = document.getElementById('darkThemeButton')
let lightButton = document.getElementById('lightThemeButton')


/////////////////    FUNCTIONS
//
// This function will take the selected radio & compare it with the answer
function checkAnswer(){
    let selectedRadioId = document.querySelector('[type=radio]:checked').id;
    console.log(selectedRadioId)
    //if the answers are the same
    if(selectedRadioId == rightAnswer){
      document.getElementById("p1").style.color = "#90EE90"
       //if the answer is correct,
       result.innerHTML="Correct"
       //add to the score
       score ++
       scoreText.innerHTML=score
       // method called to change to the next question
       nextQuestion()
       //changes the buttons to Unchecked.
       ansOneButton.checked = false;
       ansTwoButton.checked = false;
       ansThreeButton.checked = false;
    }
    else{
        //changes the text to "wrong" along with a red color
        document.getElementById("p1").style.color = "#FF5733"
        result.innerHTML="Wrong"
        //resets checked status of radios
        ansOneButton.checked = false;
       ansTwoButton.checked = false;
       ansThreeButton.checked = false;
    }
}

//function for changing website colour theme
function darkTheme(){
    //actives an animation for it to spin
    darkButton.style.animation="spin1 .5s linear"
    //activates a colour fade animation
    document.body.style.animation="darkAnim .5s linear"
    //changes the secondary css file
    pageTheme.href="Styles/DarkTheme.css"
}

//This is the same as above but for a light theme
function lightTheme(){
    lightButton.style.animation="spin1 .2s linear 1"
    document.body.style.animation="lightAnim .2s linear"
    pageTheme.href="Styles/LightTheme.css"
}

let turn = 0
//constructor for Questions, takes elements to then transfer
class Question{
    constructor(instructions, option1, option2, option3, answer, imageUrl){
        this.instructions = instructions;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.answer = answer;
        this.imageUrl = imageUrl;
    }
}
//creating questions to use on quiz
let q1 = new Question("Who painted the Mona Lisa?", "Vincent Van Gogh", "Leonardo da Vinci", "Picasso", "answerTwo", "url('./Images/Penne.jpg')")
let q2 = new Question("Who sang Poker Face?", "Celine Dion", "Rihanna", "Lady Gaga", "answerThree", "url('./Images/Penne.jpg')")
let q3 = new Question("Who played Lloyd in Dumb & Dumber?", "Adam Sandler", "Jim Carrey", "Steve-O", "answerTwo", "url('./Images/Penne.jpg')")
let q4 = new Question("What franchise is Spiderman from?", "Marvel", "DC", "Simpsons", "answerOne", "url('./Images/Penne.jpg')")
let q5 = new Question("What type of food is Penne?", "Fish", "Pasta", "Vegetable", "answerTwo", "url('./Images/Penne.jpg')")
let q6 = new Question("What was the blue fish's name in Finding Nemo?", "Dory", "Mike Wazowski", "Aqua", "answerOne", "url('./Images/Penne.jpg')")
let q7 = new Question("How many dots on the Domino's Pizza logo?", "3", "2", "4", "answerOne", "url('./Images/Penne.jpg')")
//grouping the questions into an array
let questions = [q1, q2,q3,q4,q5,q6,q7,]

//creating picture referals
let p1 = "url('./Images/Monalisa.jpg')"
let p2 = "url('./Images/PokerFace.jpg')"
let p3 = "url('./Images/D&D.png')"
let p4 = "url('./Images/Spiderman.jpeg')"
let p5 = "url('./Images/Penne.jpg')"
let p6 = "url('./Images/Nemo.jpeg')"
let p7 = "url('./Images/Pizza.jpg')"
//grouping pictures into an array
let pictures = [p1,p2,p3,p4,p5,p6,p7]

let instructions = document.querySelector('legend')
let radios = document.querySelectorAll('radio')
let labels = document.querySelectorAll('label')

//function that changes the question text & answer.
function nextQuestion(){
    let currentQuestion = questions[turn]
    let currentImage = pictures[turn]
    document.body.style.backgroundImage = currentImage
    //this will ust the constructor elements to change the text and questions
    instructions.innerHTML = currentQuestion.instructions
    labels[0].innerHTML =  currentQuestion.option1
    labels[1].innerHTML = currentQuestion.option2
    labels[2].innerHTML = currentQuestion.option3
    rightAnswer = currentQuestion.answer
    turn += 1
}

submitBtn.onclick = checkAnswer
darkButton.onclick = darkTheme
lightButton.onclick = lightTheme
//when the game is over, 
function gameOver() {
    cancelInterval(timer);
}

let timer = 29
// timer countdown function for detecting the time left & if user has run out of time
function timeCountdown() {
    if(timer > 0){
       timerText.innerHTML = "Time Left: " +timer
       timer--
    }
    else{
        //when the timer runs out, the page changes url
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
}

function gameWin(){
    if(score >7){
    // this stops the countdown interval
    clearInterval(timerInterval)
    // individually hides all text
    instructions.style.display = "none"
    ansTwoButton.style.display = "none"
    ansOneButton.style.display = "none"
    ansThreeButton.style.display = "none"
    submitBtn.style.display = "none"
    //uses for loop to change all labels to hidden
    for(let i = 0; i < labels.length; i++){
    labels[i].style.display = "none"
    scoreText.innerHTML = "YOU WIN!"
    document.body.style.backgroundImage = "url('./Images/Youwin.jpg')"
    }
  }
}
//creates an interval that counts down time
timerInterval = setInterval(timeCountdown, 1000)
//interval that constantly read if the game is won or not
setInterval(gameWin,100)