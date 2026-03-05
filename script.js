// 1. Tool Selection Logic
const tools = document.querySelectorAll('.nav-item');
tools.forEach(tool => {
    tool.addEventListener('click', () => {
        // Remove active class from all
        document.querySelector('.nav-item.active').classList.remove('active');
        // Add active class to clicked
        tool.classList.add('active');
        console.log('Tool switched to:', tool.querySelector('small').innerText);
    });
});

// 2. Playback Toggle
const playBtn = document.querySelector('.play-btn');
let isPlaying = false;

playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if(isPlaying) {
        playBtn.classList.remove('fa-play-circle');
        playBtn.classList.add('fa-pause-circle');
        startTimeline();
    } else {
        playBtn.classList.add('fa-play-circle');
        playBtn.classList.remove('fa-pause-circle');
        stopTimeline();
    }
});

// 3. Timeline Simulation
const playhead = document.querySelector('.playhead');
let playheadPosition = 150; // Starting pixel
let animationFrame;

function startTimeline() {
    function step() {
        playheadPosition += 1; // Move 1px per frame
        playhead.style.left = `${playheadPosition}px`;
        
        // Update timecode (simulated)
        updateTimeCode(playheadPosition);
        
        if(isPlaying) animationFrame = requestAnimationFrame(step);
    }
    step();
}

function stopTimeline() {
    cancelAnimationFrame(animationFrame);
}

function updateTimeCode(px) {
    // Simple px-to-time conversion logic
    // Assuming 10px = 1 second
    const seconds = Math.floor(px / 10);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const timeString = `00:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    document.querySelector('.time-code').innerText = `${timeString} / 00:01:30`;
}

// 4. Property Slider Binding
const sliders = document.querySelectorAll('.prop-slider');
sliders.forEach(slider => {
    slider.addEventListener('input', (e) => {
        // Update the text value next to the slider
        const valueDisplay = e.target.previousElementSibling.querySelector('.value-display');
        if(valueDisplay) {
            // Check if it's a percentage or degree
            const suffix = valueDisplay.innerText.includes('°') ? '°' : (valueDisplay.innerText.includes('%') ? '%' : '');
            valueDisplay.innerText = e.target.value + suffix;
        }
    });
});
