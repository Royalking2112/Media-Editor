// ==================== UTILITY FUNCTIONS ====================

function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    
    // Close all other menus
    document.querySelectorAll('.dropdown-menu').forEach(m => {
        if (m.id !== menuId) {
            m.classList.remove('show');
        }
    });
    
    // Toggle current menu
    menu.classList.toggle('show');
}

function showNotification(message) {
    const toast = document.getElementById('notificationToast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function scrollTo(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function toggleAdjustPanel(panelType) {
    showNotification(`${panelType.charAt(0).toUpperCase() + panelType.slice(1)} adjustment activated`);
    // Close menus
    document.querySelectorAll('.dropdown-menu').forEach(m => {
        m.classList.remove('show');
    });
}

function activateTool(toolName) {
    const displayName = toolName.charAt(0).toUpperCase() + toolName.slice(1);
    showNotification(`${displayName} tool activated`);
    document.querySelectorAll('.dropdown-menu').forEach(m => {
        m.classList.remove('show');
    });
}

function activateVideoTool(toolName) {
    const toolNames = {
        'split': '✂️ Split',
        'crop': '🔲 Crop',
        'duplicate': '📋 Duplicate',
        'delete': '🗑️ Delete',
        'replace': '🔄 Replace',
        'freeze': '⏸️ Freeze',
        'reverse': '⏮️ Reverse',
        'extractAudio': '📤 Extract Audio',
        'isolateVoice': '🎤 Isolate Voice',
        'reduceNoise': '🔇 Reduce Noise',
        'enhanceVoice': '📢 Enhance Voice',
        'audioEffects': '🎶 Audio Effects',
        'beats': '🎵 Beats Detection',
        'animation': '🎨 Animation',
        'effects': '✨ Effects',
        'motionBlur': '⚡ Motion Blur',
        'overlay': '📐 Overlay',
        'relight': '💡 Relight',
        'filters': '🎬 Filters',
        'mask': '👤 Mask',
        'speed': '⏱️ Speed',
        'transform': '🔄 Transform',
        'autoReframe': '📺 Auto Reframe',
        'stabilization': '🎯 Stabilization',
        'brightness': '☀️ Brightness',
        'contrast': '◐ Contrast',
        'opacity': '👻 Opacity',
        'unlink': '🔗 Unlink'
    };
    
    const displayName = toolNames[toolName] || toolName;
    showNotification(`${displayName} tool activated`);
    document.querySelectorAll('.dropdown-menu').forEach(m => {
        m.classList.remove('show');
    });
}

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
            showNotification('Photo uploaded successfully!');
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
    const opacity = document.getElementById('opacity').value / 100;
    
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
    
    photoContext.globalAlpha = opacity;
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
    document.getElementById('opacityValue').textContent = document.getElementById('opacity').value;
}

// Photo range input listeners
document.getElementById('brightness').addEventListener('input', updatePhoto);
document.getElementById('contrast').addEventListener('input', updatePhoto);
document.getElementById('saturation').addEventListener('input', updatePhoto);
document.getElementById('hue').addEventListener('input', updatePhoto);
document.getElementById('blur').addEventListener('input', updatePhoto);
document.getElementById('rotate').addEventListener('input', updatePhoto);
document.getElementById('scale').addEventListener('input', updatePhoto);
document.getElementById('opacity').addEventListener('input', updatePhoto);

// Apply filters to photo
function applyPhotoFilter(filterType) {
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
        case 'vintage':
            photoContext.filter = 'sepia(60%) saturate(150%) brightness(110%)';
            break;
        case 'cool':
            photoContext.filter = 'hue-rotate(200deg) saturation(120%) brightness(95%)';
            break;
        case 'warm':
            photoContext.filter = 'hue-rotate(20deg) saturation(120%) brightness(105%)';
            break;
        case 'invert':
            photoContext.filter = 'invert(100%)';
            break;
    }
    
    photoContext.drawImage(photoImage, 0, 0);
    showNotification(`${filterType.charAt(0).toUpperCase() + filterType.slice(1)} filter applied!`);
}

// Apply effects to photo
function applyPhotoEffect(effectType) {
    if (!photoImage || !photoContext) {
        alert('Please upload an image first!');
        return;
    }
    
    photoContext.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
    
    switch(effectType) {
        case 'blur':
            photoContext.filter = 'blur(8px)';
            break;
        case 'sharpen':
            photoContext.filter = 'contrast(150%)';
            break;
        case 'glow':
            photoContext.filter = 'brightness(120%) blur(2px)';
            break;
        case 'vignette':
            photoContext.filter = 'brightness(90%) saturate(110%)';
            break;
        case 'retouch':
            photoContext.filter = 'brightness(105%) contrast(110%) saturate(120%)';
            break;
    }
    
    photoContext.drawImage(photoImage, 0, 0);
    showNotification(`${effectType.charAt(0).toUpperCase() + effectType.slice(1)} effect applied!`);
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
    showNotification('Photo downloaded successfully!');
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
    document.getElementById('opacity').value = 100;
    updatePhoto();
    showNotification('Photo reset to original!');
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
    
    showNotification('Video uploaded successfully!');
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

// Update video opacity
document.getElementById('videoOpacity').addEventListener('input', function(e) {
    videoElement.style.opacity = e.target.value / 100;
    document.getElementById('videoOpacityValue').textContent = e.target.value;
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
    showNotification('Trim start marked!');
}

// Mark trim end
function markEnd() {
    if (!videoElement.src) {
        alert('Please upload a video first!');
        return;
    }
    trimEnd = videoElement.currentTime;
    updateTrimInfo();
    showNotification('Trim end marked!');
}

// Reset trim
function resetTrim() {
    trimStart = null;
    trimEnd = null;
    updateTrimInfo();
    showNotification('Trim reset!');
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
    
    showNotification('Video download initiated. Advanced features require desktop software.');
    
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
    document.getElementById('videoOpacity').value = 100;
    videoElement.playbackRate = 1.0;
    videoElement.volume = 1.0;
    videoElement.style.filter = 'brightness(100%) contrast(100%)';
    videoElement.style.opacity = 1;
    document.getElementById('videoBrightnessValue').textContent = '100';
    document.getElementById('videoContrastValue').textContent = '100';
    document.getElementById('videoOpacityValue').textContent = '100';
    document.getElementById('speedValue').textContent = '1.0';
    document.getElementById('volumeValue').textContent = '100';
    resetTrim();
    showNotification('Video reset to original!');
}

// ==================== NAVIGATION ====================

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

// Close menus when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.edit-btn') && !e.target.closest('.dropdown-menu')) {
        document.querySelectorAll('.dropdown-menu').forEach(m => {
            m.classList.remove('show');
        });
    }
});
