const startBtn = document.querySelector('.b .start');
const stopBtn = document.querySelector('.b .stop');
const display = document.querySelector('.value');

let interval;
let startTime;
let elapsed = 0;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const hundredths = Math.floor((ms % 1000) / 10);

  return `${String(minutes).padStart(2, '0')}.${String(seconds).padStart(2, '0')}:${String(hundredths).padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
  if (interval) return; // لا تبدأ مرتين
  startTime = Date.now() - elapsed;
  interval = setInterval(() => {
    elapsed = Date.now() - startTime;
    display.value = formatTime(elapsed);
  }, 10);
});

stopBtn.addEventListener('click', () => {
  clearInterval(interval);
  interval = null;
});