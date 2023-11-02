document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("date");
    const changeDateBtn = document.getElementById("changeDate");
    const timerDisplay = document.getElementById("timer");
    const startBtn = document.getElementById("start");
    const stopBtn = document.getElementById("stop");
    const resetBtn = document.getElementById("reset");
    let intervalId;
    let startDate;
    let paused = true;

    function formatTime(time) {
        return String(time).padStart(2, "0");
    }

    function updateTimer() {
        if (!paused) {
            const currentDate = new Date();
            const elapsedTime = currentDate - startDate;
            const hours = Math.floor(elapsedTime / 3600000);
            const minutes = Math.floor((elapsedTime % 3600000) / 60000);
            const seconds = Math.floor((elapsedTime % 60000) / 1000);
            timerDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
        }
    }

    startBtn.addEventListener("click", async function () {
        if (paused) {
            paused = false;
            startDate = new Date();
            await new Promise((resolve) => {
                intervalId = setInterval(updateTimer, 1000);
            });
        }
    });

    stopBtn.addEventListener("click", function () {
        paused = true;
        clearInterval(intervalId);
    });

    resetBtn.addEventListener("click", function () {
        paused = true;
        clearInterval(intervalId);
        timerDisplay.textContent = "00:00:00";
    });

    changeDateBtn.addEventListener("click", function () {
        const selectedDate = new Date(dateInput.value);
        if (!isNaN(selectedDate)) {
            startDate = selectedDate;
            paused = true;
            clearInterval(intervalId);
            timerDisplay.textContent = "00:00:00";
        } else {
            alert("Invalid date format. Please select a valid date.");
        }
    });

    // Initial setup
    updateTimer();
});
  