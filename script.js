// ==================== PHOTO EDITOR ====================

let photoImage = null;
let photoContext = null;
let photoCanvas = document.getElementById('photoCanvas');
let photoInput = document.getElementById('photoInput');

// Initialize photo editor
photoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            photoImage = img;
            photoCanvas.width = img.width;
            photoCanvas.height = img.height;
            photoContext = photoCanvas.getContext('2d');
            
            document.getElementById('photoPlaceholder').style.display = 'none';
            photoCanvas.style.display = 'block';
            updatePhoto();
        };
        img.src = event.target.result;
    };
    
    reader.readAsDataURL(file);
});

// Update photo with current filter values
function updatePhoto() {
    if (!photoImage || !photoContext) return;
    
    const brightness = document.getElementById('brightness').value;
    const contrast = document.getElementById('contrast').value;
    const saturation = document.getElementById('saturation').value;
    const hue = document.getElementById('hue').value;
    const blur = document.getElementById('blur').value;
    const rotate = document.getElementById('rotate').value;
    const scale = document.getElementById('scale').value / 100;
    
    photoContext.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
    photoContext.save();
    
    // Apply transformations
    photoContext.translate(photoCanvas.width / 2, photoCanvas.height / 2);
    photoContext.rotate((rotate * Math.PI) / 180);
    photoContext.scale(scale, scale);
    photoContext.translate(-photoCanvas.width / 2, -photoCanvas.height / 2);
    
    // Apply CSS filters
    photoContext.filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        saturate(${saturation}%)
        hue-rotate(${hue}deg)
        blur(${blur}px)
    `;
    
    photoContext.drawImage(photoImage, 0, 0);
    photoContext.restore();
    
    // Update display values
    document.getElementById('brightnessValue').textContent = brightness;
    document.getElementById('contrastValue').textContent = contrast;
    document.getElementById('saturationValue').textContent = saturation;
    document.getElementById('hueValue').textContent = hue;
    document.getElementById('blurValue').textContent = blur;
    document.getElementById('rotateValue').textContent = rotate;
    document.getElementById('scaleValue').textContent = Math.round(scale * 100);
}

// Photo range input listeners
document.getElementById('brightness').addEventListener('input', updatePhoto);
document.getElementById('contrast').addEventListener('input', updatePhoto);
document.getElementById('saturation').addEventListener('input', updatePhoto);
document.getElementById('hue').addEventListener('input', updatePhoto);
document.getElementById('blur').addEventListener('input', updatePhoto);
document.getElementById('rotate').addEventListener('input', updatePhoto);
document.getElementById('scale').addEventListener('input', updatePhoto);

// Apply filters to photo
function applyFilter(filterType) {
    if (!photoImage || !photoContext) {
        alert('Please upload an image first!');
        return;
    }
    
    photoContext.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
    
    switch(filterType) {
        case 'grayscale':
            photoContext.filter = 'grayscale(100%)';
            break;
        case 'sepia':
            photoContext.filter = 'sepia(100%)';
            break;
        case 'invert':
            photoContext.filter = 'invert(100%)';
            break;
    }
    
    photoContext.drawImage(photoImage, 0, 0);
}

// Download photo
function downloadPhoto() {
    if (!photoCanvas || photoCanvas.style.display === 'none') {
        alert('Please upload and edit a photo first!');
        return;
    }
    
    const link = document.createElement('a');
    link.href = photoCanvas.toDataURL('image/png');
    link.download = `edited-photo-${Date.now()}.png`;
    link.click();
}

// Reset photo
function resetPhoto() {
    document.getElementById('brightness').value = 100;
    document.getElementById('contrast').value = 100;
    document.getElementById('saturation').value = 100;
    document.getElementById('hue').value = 0;
    document.getElementById('blur').value = 0;
    document.getElementById('rotate').value = 0;
    document.getElementById('scale').value = 100;
    updatePhoto();
}

// ==================== VIDEO EDITOR ====================

let videoElement = document.getElementById('videoPreview');
let videoInput = document.getElementById('videoInput');
let trimStart = null;
let trimEnd = null;

// Load video
videoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    
    videoElement.src = url;
    document.getElementById('videoPlaceholder').style.display = 'none';
    videoElement.style.display = 'block';
    
    videoElement.addEventListener('loadedmetadata', function() {
        updateVideoTime();
    });
});

// Update video playback speed
document.getElementById('videoSpeed').addEventListener('change', function(e) {
    videoElement.playbackRate = parseFloat(e.target.value);
    document.getElementById('speedValue').textContent = e.target.value;
});

// Update video volume
document.getElementById('videoVolume').addEventListener('change', function(e) {
    videoElement.volume = e.target.value / 100;
    document.getElementById('volumeValue').textContent = e.target.value;
});

// Update video brightness and contrast
document.getElementById('videoBrightness').addEventListener('input', function(e) {
    videoElement.style.filter = `brightness(${e.target.value}%) contrast(${document.getElementById('videoContrast').value}%)`;
    document.getElementById('videoBrightnessValue').textContent = e.target.value;
});

document.getElementById('videoContrast').addEventListener('input', function(e) {
    videoElement.style.filter = `brightness(${document.getElementById('videoBrightness').value}%) contrast(${e.target.value}%)`;
    document.getElementById('videoContrastValue').textContent = e.target.value;
});

// Update current time display
videoElement.addEventListener('timeupdate', updateVideoTime);

function updateVideoTime() {
    const currentTime = formatTime(videoElement.currentTime);
    document.getElementById('currentTime').textContent = currentTime;
}

// Format time to MM:SS
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Mark trim start
function markStart() {
    if (!videoElement.src) {
        alert('Please upload a video first!');
        return;
    }
    trimStart = videoElement.currentTime;
    updateTrimInfo();
}

// Mark trim end
function markEnd() {
    if (!videoElement.src) {
        alert('Please upload a video first!');
        return;
    }
    trimEnd = videoElement.currentTime;
    updateTrimInfo();
}

// Reset trim
function resetTrim() {
    trimStart = null;
    trimEnd = null;
    updateTrimInfo();
}

// Update trim info display
function updateTrimInfo() {
    const trimInfo = document.getElementById('trimInfo');
    if (trimStart === null || trimEnd === null) {
        trimInfo.textContent = 'No trim set';
    } else {
        const start = formatTime(trimStart);
        const end = formatTime(trimEnd);
        trimInfo.textContent = `Trim: ${start} - ${end}`;
    }
}

// Download video
function downloadVideo() {
    if (!videoElement.src) {
        alert('Please upload a video first!');
        return;
    }
    
    alert('Video download note: Due to browser limitations, the edited video will be the original file with applied visual effects. For advanced trimming and exporting, please use desktop software like CapCut or DaVinci Resolve.');
    
    const link = document.createElement('a');
    link.href = videoElement.src;
    link.download = `edited-video-${Date.now()}.mp4`;
    link.click();
}

// Reset video
function resetVideo() {
    document.getElementById('videoBrightness').value = 100;
    document.getElementById('videoContrast').value = 100;
    document.getElementById('videoSpeed').value = 1.0;
    document.getElementById('videoVolume').value = 100;
    videoElement.playbackRate = 1.0;
    videoElement.volume = 1.0;
    videoElement.style.filter = 'brightness(100%) contrast(100%)';
    document.getElementById('videoBrightnessValue').textContent = '100';
    document.getElementById('videoContrastValue').textContent = '100';
    document.getElementById('speedValue').textContent = '1.0';
    document.getElementById('volumeValue').textContent = '100';
    resetTrim();
}

// ==================== NAVIGATION ====================

function scrollTo(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
