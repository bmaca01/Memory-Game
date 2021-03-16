//Global Constants
const cluePauseTime = 333;
const nextClueWaitTime = 1000;

//Global Variables
var clueHoldTime = 1000;
var holdTimes = [];
var pattern = [];
var progress = 0;
var mistakes = 0;
var guessCounter = 0;
var timeCheck = 0; //Used for setInterval in startTimer()
var volume = 0.5;
var tonePlaying = false;
var gamePlaying = false;
var canGuess = false; //If false, comp turn. If true, player turn
var timesUp = false;

//Settings defaults
var totalRounds = 10;
var totalTimerTime = 8000;
var useTimer = true;
var slider = document.getElementById("volSlider");
var volDisplay = document.getElementById("volume");
volDisplay.innerHTML = slider.value;
var newVol = 0.5;

slider.oninput = function() {
  volDisplay.innerHTML = this.value;
  newVol = this.value / 100;
};

function startGame() {
  //initialize game variables
  clueHoldTime = 1000;
  gamePlaying = true;
  progress = 0;
  mistakes = 0;
  canGuess = false;
  timesUp = false;
  clearInterval(timeCheck);
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  genPattern();
  playClueSequence();
}

function stopGame() {
  gamePlaying = false;
  clearScoreboard();
  clearInterval(timeCheck);
  document.getElementById("clock").classList.add("hidden");
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("turn").innerHTML = "Click Start to Play";
  for (let i = 1; i <= 6; i++) {
    document
      .getElementById("button" + i)
      .setAttribute("onmousedown", "startTone(" + i + ")");
    document
      .getElementById("button" + i)
      .setAttribute("onmouseup", "stopTone(" + i + ")");
  }
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  updateScoreboard();
  for (let i = 1; i <= 6; i++) {
    document.getElementById("button" + i).setAttribute("onmousedown", "");
    document.getElementById("button" + i).setAttribute("onmouseup", "");
  }

  canGuess = false;

  guessCounter = 0;
  document.getElementById("turn").innerHTML = "Computer Turn";
  clueHoldTime = holdTimes[progress];
  let delay = nextClueWaitTime;
  for (let i = 0; i <= progress; i++) {
    setTimeout(playSingleClue, delay, pattern[i]);
    delay += clueHoldTime;
    delay += cluePauseTime;
  }

  setTimeout(() => {
    // Executes when computer is done
    if (gamePlaying) {
      document.getElementById("turn").innerHTML = "Your turn";
      canGuess = true;
      for (let i = 1; i <= 6; i++) {
        document
          .getElementById("button" + i)
          .setAttribute("onmousedown", "startTone(" + i + ")");
        document
          .getElementById("button" + i)
          .setAttribute("onmouseup", "stopTone(" + i + ")");
      }
    }
  }, delay - cluePauseTime);
}

function guess(btn) {
  if (!gamePlaying || !canGuess) {
    return;
  }

  if (guessCounter == 0 && canGuess && progress > 0 && useTimer) {
    timeCheck = 0;
    timesUp = false;
    startTimer();
  }
  if (pattern[guessCounter] == btn) {
    //If the user guess is correct
    if (guessCounter == progress) {
      //If the turn is over
      if (progress == pattern.length - 1) {
        clearInterval(timeCheck);
        document.getElementById("clock").classList.add("hidden");
        winGame();
        return;
      } else {
        progress++;
        clearInterval(timeCheck);
        document.getElementById("clock").classList.add("hidden");
        playClueSequence();
      }
    } else {
      guessCounter++;
    }
  } else {
    clearInterval(timeCheck);
    document.getElementById("clock").classList.add("hidden");
    mistakes++;
    if (mistakes > 2) {
      loseGame();
      return;
    }
    playClueSequence();
  }
}

function startTimer() {
  // Show the clock
  document.getElementById("clock").classList.remove("hidden");
  // Set a time x seconds from now
  let target = new Date().getTime() + totalTimerTime;

  // Logic to update the clock at each millisecond
  timeCheck = setInterval(() => {
    let now = new Date().getTime();
    let delta = target - now;

    let s = Math.floor((delta % (1000 * 60)) / 1000);

    document.getElementById("clock").innerHTML = "Time left: " + s;
    if (delta < 0) {
      clearInterval(timeCheck);
      document.getElementById("clock").innerHTML = "Times up!";
      mistakes++;
      timesUp = true;
      if (mistakes > 2) {
        loseGame();
        return;
      }
    }
  }, 0);

  // Check after x seconds to see if the clock hit 0
  setTimeout(() => {
    if (timesUp && gamePlaying) {
      document.getElementById("clock").classList.add("hidden");
      playClueSequence();
    }
  }, totalTimerTime);
}

function genPattern() {
  let randomNum = 0;
  let t = 0;
  
  // Clear the pattern array and holdTimes array
  if (pattern.length > 0 && holdTimes.length > 0) {
    pattern.splice(0, pattern.length);
    holdTimes.splice(0, holdTimes.splice);
  }

  for (let i = 0; i < totalRounds; i++) {
    randomNum = Math.floor(Math.random() * 6) + 1;
    pattern[i] = randomNum;
    t = clueHoldTime / 2 ** i;
    if (t < 50) {
      holdTimes[i] = 50;
    } else {
      holdTimes[i] = t;
    }
  }
}

function loseGame() {
  stopGame();
  alert("Game Over. You lost.");
}
function winGame() {
  stopGame();
  alert("Game Over. You won!");
}
function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}
function updateScoreboard() {
  document.getElementById("mistakes").innerHTML = "Mistakes: " + mistakes;
  document.getElementById("progress").innerHTML =
    "Progress: " + (progress + 1) + " / " + pattern.length;
}
function clearScoreboard() {
  document.getElementById("mistakes").innerHTML = "Mistakes: ";
  document.getElementById("progress").innerHTML = "Progress: ";
}

function openSettings() {
  document.getElementById("settings-menu").classList.remove("hidden");
}

function closeSettings() {
  document.getElementById("settings-menu").classList.add("hidden");
}

function confirmSettings() {
  if (gamePlaying) {
    stopGame();
  }
  var newRounds = getRounds();
  var newTimerTime = getTimerTime() * 1000;
  var newUseTimer = isUsingTimer();

  volume = newVol;
  totalRounds = newRounds;
  totalTimerTime = newTimerTime;
  useTimer = newUseTimer;
  closeSettings();
}

function getRounds() {
  var obj = document.getElementById("rounds");
  return parseInt(obj.options[obj.selectedIndex].text);
}

function getTimerTime() {
  var obj = document.getElementById("timerTime");
  return parseInt(obj.options[obj.selectedIndex].text);
}

function isUsingTimer() {
  var result = document.getElementById("useTimer").checked;
  return result;
}

// Sound Synthesis Functions
const freqMap = {
  1: 233,
  2: 349,
  3: 523,
  4: 784,
  5: 1175,
  6: 1760
};
function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);
