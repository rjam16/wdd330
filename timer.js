const countdownDisplay = document.getElementById('countdown');
const startButton = document.getElementById('startButton');
let start = 10;
startButton.addEventListener('click', () => {
    const timer = setInterval(() => {
        if (start >= 0) {
            countdownDisplay.textContent = start;
            start--;
        } else {
            clearInterval(timer)
        }
    }, 1000);
    let timeUp = setTimeout(() => alert("Time is up!"), 1000) 
    alert(timeUp);
});