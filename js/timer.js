const timerHours = document.getElementById("timerHours");
const timerMinutes = document.getElementById("timerMinutes");
const timerSeconds = document.getElementById("timerSeconds");
let hours = 0;
let minutes = 0;
let seconds = 0;

export function startTimer()
{
    seconds++;

    if(seconds===60)
    {
        minutes++;
        seconds=0;
    }
    if(minutes===60)
    {
        hours++;
        minutes=0;
    }

    let formattedHours = (hours < 10) ? "0" + hours : hours;
    let formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;
    let formattedSeconds = (seconds < 10) ? "0" + seconds : seconds;

    timerHours.innerHTML = formattedHours;
    timerMinutes.innerHTML = ":" + formattedMinutes;
    timerSeconds.innerHTML = ":" + formattedSeconds;
}