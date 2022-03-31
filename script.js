// Global Variables
let pattern = [2, 2, 4, 3, 2, 1, 2, 4]
let progress = 0;
let gamePlaying = true;
let tonePlaying = false;
let volume = 0.5;  //must be between 0.0 and 1.0
let guessCounter = 0;
let score = 0;

// Global Constants
const clueHoldTime = 1000; //how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence




const startGame = () => {
  progress = 0;
  gamePlaying = true;
  
  
  //   Swap start and stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  // document.getElementById("stopBtn").classList.remove("hidden");
  document.getElementById("heading").classList.add("hidden");
  document.getElementById("instructions").classList.add("hidden");
  document.getElementById("score").classList.remove("hidden");

  
  playClueSequence();

}

const stopGame = () => {
//   let gamePlaying = false;
  
//   //   Swap start and stop buttons
//   // document.getElementById("stopBtn").classList.add("hidden");
//   document.getElementById("startBtn").classList.remove("hidden");
  document.location.reload();
}


// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2
}
const playTone = (btn,len) => { 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  context.resume()
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
const startTone = (btn) => {
  if(!tonePlaying){
    context.resume()
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    context.resume()
    tonePlaying = true
  }
}
const stopTone = () => {
  g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
  tonePlaying = false
}

// Page Initialization
// Init Sound Synthesizer
let AudioContext = window.AudioContext || window.webkitAudioContext 
let context = new AudioContext()
let o = context.createOscillator()
let g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)


const lightButton = (btn) => {
  document.getElementById("button"+btn).classList.add("lit")
}
const clearButton = (btn) => {
  document.getElementById("button"+btn).classList.remove("lit")
}


function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}


function playClueSequence(){
  guessCounter = 0;
  context.resume()
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
}

function loseGame(){
  alert("Game Over. You lost.");
  saveScore(score);
  stopGame();
}


function winGame(score){
  alert("Congrats! You won the game :)");
  saveScore(score);
  stopGame();
}


function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
  
  if (pattern[guessCounter] == btn) {
    //     Correct
    if (guessCounter == progress) {
      if (progress == pattern.length - 1) {
        winGame(score);
      }
      else {
        progress++;
        console.log("Score is: " + score);
        document.getElementById('live-score').innerHTML = score;
        playClueSequence();
      }
    }
    else {
      //     Increment score
      score += 200; 
      document.getElementById('live-score').innerHTML = score;
      guessCounter++;
    }
  }
  else {
    //     Incorrect
    loseGame();
  }
}

function saveScore(score) {
  let highScore = getCookie("highScore")
  if (highScore == "") {
    //     Save score for a year
    setCookie("highScore", highScore, 365);
  }
  else if (score > highScore) {
    alert("Congrats! You set a new high score!")
    setCookie("highScore", highScore, 365);
  }
  
}

// Functions for handling cookies
// Sourced from: https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookies() {
  let highScore = getCookie("highScore");
  if (!(highScore == "")) {
    //     We have a high score saved!
    document.getElementById('highscore-paragraph').value = "Previous High Score: " + highScore;
  }
}

checkCookies();
