const startBtn = document.querySelector(".b .start");
const lapBtn = document.querySelector(".b .lap");
const display = document.querySelector(".value");
let state = 'initial';


let a=0;

let interval;
let startTime;
let elapsed = 0;


function updateButtons(state) {
  if (state === 'initial') {
    startBtn.textContent = 'Start';
    startBtn.style.backgroundColor = '#6060e6';
    lapBtn.textContent = 'Lap';
    lapBtn.disabled = true;
  } else if (state === 'running') {
    startBtn.textContent = 'Stop';
    startBtn.style.backgroundColor = '#f5140e';
    lapBtn.textContent = 'Lap';
    lapBtn.disabled = false;
  } else if (state === 'stopped') {
    startBtn.textContent = 'Start';
    startBtn.style.backgroundColor = '#6060e6';
    lapBtn.textContent = 'Reset';
    lapBtn.disabled = false;
    clearInterval(interval);
    interval = null;
  }
}
updateButtons('initial');


function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const hundredths = Math.floor((ms % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
    )}.${String(hundredths).padStart(2, "0")}`;
}

startBtn.addEventListener("click", () => {
  /*  if (interval) return;
    startTime = Date.now() - elapsed;
    interval = setInterval(() => {
        elapsed = Date.now() - startTime;
        display.textContent = formatTime(elapsed);
    }, 10);  */
    if(interval) {
      clearInterval(interval)
      interval=null;
      state="stopped";
      updateButtons(state)
    }
    else {
      startTime=Date.now() - elapsed
      interval=setInterval(function() {
        elapsed= Date.now() - startTime;
        display.textContent = formatTime(elapsed)
      }, 10);
      state= "running";
      updateButtons(state);
    }
});

lapBtn.addEventListener("click", () => {
    if(state === "running") {
      console.log(`lap : ${formatTime(elapsed)}`)
    }
    else {
      elapsed =0;
      display.textContent = formatTime(elapsed)
      state = "initial";
      updateButtons(state);
      
    }
});
