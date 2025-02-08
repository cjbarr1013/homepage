export function IntervalTimer(interval = 5000) {
  let startTime = 0;
  let elapsedTime = 0;
  let isPaused = false;
  let mainTimerID;
  let secondaryTimerID;

  const start = (func) => {
    clearInterval(mainTimerID);
    clearSecondaryTimer();
    if (!isPaused) {
      mainTimerID = setInterval(() => {
        clearSecondaryTimer();
        func();
      }, interval);
    }
  };

  const pause = () => {
    isPaused = true;
    elapsedTime += Date.now() - startTime;

    clearInterval(mainTimerID);
    clearTimeout(secondaryTimerID);
  };

  const resume = (func) => {
    isPaused = false;
    startTime = Date.now();
    secondaryTimerID = setTimeout(() => {
      func();
      start(func);
    }, interval - elapsedTime);
  };

  const clearSecondaryTimer = () => {
    clearTimeout(secondaryTimerID);
    startTime = Date.now();
    elapsedTime = 0;
  };

  return {
    start,
    pause,
    resume,
  };
}
