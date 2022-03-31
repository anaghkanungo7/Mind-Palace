// Global Variables
let pattern = [2, 2, 4, 3, 2, 1, 2, 4]
let progress = 0;
let gamePlaying = true;

const startGame = () => {
  progress = 0;
  gamePlaying = true;
  
  //   Fetch name
  let name = document.getElementById('nameField').value;
  
  
  //   Swap start and stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");

}

const stopGame = () => {
  let gamePlaying = false;
  
}



