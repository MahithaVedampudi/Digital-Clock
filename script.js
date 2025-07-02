document.addEventListener('DOMContentLoaded', function() {
    const clock = document.getElementById('clock');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    let clockInterval = null;
    let isRunning = false;

    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const milliseconds = now.getMilliseconds().toString().padStart(3, '0').slice(0, 2);
        
        clock.textContent = `${hours}:${minutes}:${seconds}${milliseconds}`;
    }

    startBtn.addEventListener('click', function() {
        if (!isRunning) {
            isRunning = true;
            updateClock();
            clockInterval = setInterval(updateClock, 10);
            startBtn.disabled = true;
            stopBtn.disabled = false;
            
            // Add active state
            startBtn.classList.add('active');
            stopBtn.classList.remove('active');
        }
    });

    stopBtn.addEventListener('click', function() {
        if (isRunning) {
            isRunning = false;
            clearInterval(clockInterval);
            startBtn.disabled = false;
            stopBtn.disabled = true;
            
            // Add active state
            stopBtn.classList.add('active');
            startBtn.classList.remove('active');
        }
    });

    // Initialize with stop button disabled
    stopBtn.disabled = true;
});