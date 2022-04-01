// Global Variables
let progress = 0;
let gamePlaying = false;
let tonePlaying = false;
let volume = 0.5;  //must be between 0.0 and 1.0
let guessCounter = 0;
let score = 0;
let scoreMultiplier = 1;
let level = 1;

// Make it faster after each level
let clueHoldTime = 1000; //how long to hold each clue's light/sound

// Global Constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence


const generatePattern = () => {
  let pattern = [0, 0, 0];
  var buttons = [1, 2, 3, 4];
  for (let x = 0; x < 10; x++) {
      var randValue = buttons[Math.floor(Math.random() * buttons.length)];
      pattern[x] = randValue;
  }
  
  return pattern;
}

let pattern = generatePattern();

const startGame = () => {
  progress = 0;
  gamePlaying = true;
  
  
  //   Swap start and stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  document.getElementById("heading").classList.add("hidden");
  document.getElementById("instructions").classList.add("hidden");
  document.getElementById("score").classList.remove("hidden");

  
  playClueSequence();

}

const stopGame = () => {
//   let gamePlaying = false;
  
//   //   Swap start and stop buttons
//   // document.getElementById("stopBtn").classList.add("hidden");
  // document.getElementById("startBtn").classList.remove("hidden");
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


const playSingleClue = (btn) => {
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}


const playClueSequence = () => {
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

const loseGame = () => {
  alert("Game Over. You lost.");
  saveScore(score);
  stopGame();
}


const winGame = (score) => {
  alert("Congrats! You won the game :)");
  saveScore(score);
  stopGame();
}


const guess = (btn) => {
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
        score += (150 * scoreMultiplier); 
        scoreMultiplier += 0.2;
        progress++;
        console.log("Level completed! Score is: " + score);
        document.getElementById('live-score').innerHTML = score;
        level += 1;
        document.getElementById('live-level').innerHTML = level;


        
        //         Make the game faster
        if (clueHoldTime > 250) {
          clueHoldTime -= 150;
        }
        
        
        playClueSequence();
      }
    }
    else {
      //     Increment score
      score += (100 * scoreMultiplier); 
      document.getElementById('live-score').innerHTML = score;
      guessCounter++;
    }
  }
  else {
    //     Incorrect
    loseGame();
  }
}

const saveScore = (score) => {
  let highScore = getCookie("highScore")
  if (highScore == "") {
    //     Save score for a year
    setCookie("highScore", score, 365);
    console.log("Saved high score to cookies");
  }
  else if (score > highScore) {
    alert("Congrats! You set a new high score!")
    setCookie("highScore", score, 365);
    console.log("Saved high score to cookies");
  }
  
}

// Functions for handling cookies
// Sourced from: https://www.w3schools.com/js/js_cookies.asp
const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const getCookie = (cname) => {
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
    document.getElementById('highscore-paragraph').innerHTML = "Saved High Score: " + highScore + ". Let's see if you can beat it :)";
  }
}

checkCookies();
