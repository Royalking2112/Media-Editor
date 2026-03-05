// Photo Editor Script - Full Manual Control

let photoImage = null;
let photoContext = null;
let photoCanvas = document.getElementById('photoCanvas');
let photoInput = document.getElementById('photoInput');
let uploadArea = document.getElementById('uploadArea');

let photoAdjustments = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    exposure: 0,
    sharpness: 0,
    opacity: 100
};

let activePhotoFilters = {};
let photoActionHistory = [];

// ==================== UPLOAD FUNCTIONALITY ====================

uploadArea.addEventListener('click', () => photoInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#764ba2';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '#667eea';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        loadPhoto(file);
    }
});

photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) loadPhoto(file);
});

function loadPhoto(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            photoImage = img;
            setupPhotoCanvas();
            renderPhoto();
            uploadArea.style.display = 'none';
            photoCanvas.style.display = 'block';
            showNotification('✅ Photo loaded successfully!');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function setupPhotoCanvas() {
    const maxWidth = 600;
    if (photoImage.width > maxWidth) {
        photoCanvas.width = maxWidth;
        photoCanvas.height = (photoImage.height / photoImage.width) * maxWidth;
    } else {
        photoCanvas.width = photoImage.width;
        photoCanvas.height = photoImage.height;
    }
    photoContext = photoCanvas.getContext('2d');
}

// ==================== PHOTO RENDERING ====================

function renderPhoto() {
    if (!photoImage || !photoContext) return;

    photoContext.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
    
    const { brightness, contrast, saturation, hue, exposure, opacity } = photoAdjustments;
    const sharpnessValue = photoAdjustments.sharpness;

    photoContext.filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        saturate(${saturation}%)
        hue-rotate(${hue}deg)
        opacity(${opacity}%)
    `;

    photoContext.globalAlpha = opacity / 100;
    photoContext.drawImage(photoImage, 0, 0, photoCanvas.width, photoCanvas.height);
    photoContext.globalAlpha = 1;

    updateEffectsList();
}

// ==================== MANUAL ADJUSTMENTS ====================

function updatePhotoAdjustment(type) {
    const value = document.getElementById(type).value;
    
    photoAdjustments[type] = parseInt(value);
    
    // Update display
    const displayId = type + 'Display';
    const displayElement = document.getElementById(displayId);
    if (displayElement) {
        if (type === 'hue') {
            displayElement.textContent = value + '°';
        } else if (type === 'opacity' || type === 'brightness' || type === 'contrast' || type === 'saturation') {
            displayElement.textContent = value + '%';
        } else if (type === 'exposure' || type === 'sharpness') {
            displayElement.textContent = value;
        } else {
            displayElement.textContent = value + '%';
        }
    }

    saveHistory();
    renderPhoto();
}

// ==================== FILTERS ====================

function applyPhotoFilter(filterName) {
    if (!photoImage) return showNotification('📷 Upload a photo first!');

    if (filterName === 'original') {
        activePhotoFilters = {};
        photoAdjustments = {
            brightness: 100,
            contrast: 100,
            saturation: 100,
            hue: 0,
            exposure: 0,
            sharpness: 0,
            opacity: 100
        };
        resetAllSliders();
        renderPhoto();
        showNotification('✨ Original filter applied!');
        return;
    }

    activePhotoFilters[filterName] = true;

    switch(filterName) {
        case 'grayscale':
            photoAdjustments.saturation = 0;
            break;
        case 'sepia':
            photoAdjustments.saturation = 50;
            photoAdjustments.hue = 30;
            break;
        case 'vintage':
            photoAdjustments.saturation = 150;
            photoAdjustments.hue = 20;
            photoAdjustments.brightness = 110;
            break;
        case 'cool':
            photoAdjustments.hue = 180;
            photoAdjustments.saturation = 120;
            photoAdjustments.brightness = 95;
            break;
        case 'warm':
            photoAdjustments.hue = 20;
            photoAdjustments.saturation = 120;
            photoAdjustments.brightness = 110;
            break;
        case 'invert':
            // Inverted colors
            photoContext.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
            photoContext.globalAlpha = photoAdjustments.opacity / 100;
            const imageData = photoContext.getImageData(0, 0, photoCanvas.width, photoCanvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i + 1];
                data[i + 2] = 255 - data[i + 2];
            }
            photoContext.drawImage(photoImage, 0, 0, photoCanvas.width, photoCanvas.height);
            photoContext.putImageData(imageData, 0, 0);
            showNotification(`✨ ${filterName} filter applied!`);
            saveHistory();
            updateEffectsList();
            return;
        case 'blur':
            photoContext.filter = `blur(8px) brightness(${photoAdjustments.brightness}%) contrast(${photoAdjustments.contrast}%)`;
            break;
    }

    updateAllSliders();
    saveHistory();
    renderPhoto();
    showNotification(`✨ ${filterName.toUpperCase()} filter applied!`);
}

// ==================== EFFECTS ====================

function applyPhotoEffect(effectName) {
    if (!photoImage) return showNotification('📷 Upload a photo first!');

    switch(effectName) {
        case 'glow':
            photoAdjustments.brightness = 120;
            photoAdjustments.saturation = 120;
            break;
        case 'vignette':
            photoAdjustments.brightness = 85;
            photoAdjustments.saturation = 110;
            break;
        case 'fade':
            photoAdjustments.contrast = 70;
            photoAdjustments.saturation = 50;
            break;
        case 'shadow':
            photoAdjustments.brightness = 60;
            photoAdjustments.contrast = 130;
            break;
    }

    activePhotoFilters[effectName] = true;
    updateAllSliders();
    saveHistory();
    renderPhoto();
    showNotification(`✨ ${effectName.toUpperCase()} effect applied!`);
}

// ==================== TOOLS ====================

function activatePhotoTool(tool) {
    if (!photoImage) return showNotification('📷 Upload a photo first!');

    switch(tool) {
        case 'crop':
            showNotification('🔲 Crop tool activated - Resize the canvas to crop');
            break;
        case 'rotate':
            rotatePhotoImage();
            break;
        case 'flip':
            flipPhotoImage();
            break;
        case 'resize':
            const width = prompt('Enter width in pixels:', photoCanvas.width);
            if (width) {
                photoCanvas.width = parseInt(width);
                photoCanvas.height = (photoImage.height / photoImage.width) * photoCanvas.width;
                renderPhoto();
                showNotification('📏 Photo resized!');
                saveHistory();
            }
            break;
    }
}

function rotatePhotoImage() {
    const temp = photoCanvas.width;
    photoCanvas.width = photoCanvas.height;
    photoCanvas.height = temp;
    
    photoContext.save();
    photoContext.translate(photoCanvas.width / 2, photoCanvas.height / 2);
    photoContext.rotate(Math.PI / 2);
    photoContext.translate(-photoCanvas.height / 2, -photoCanvas.width / 2);
    renderPhoto();
    photoContext.restore();
    
    saveHistory();
    showNotification('🔄 Photo rotated 90°!');
}

function flipPhotoImage() {
    photoContext.save();
    photoContext.scale(-1, 1);
    photoContext.translate(-photoCanvas.width, 0);
    renderPhoto();
    photoContext.restore();
    
    saveHistory();
    showNotification('↔️ Photo flipped!');
}

// ==================== HELPER FUNCTIONS ====================

function updateAllSliders() {
    document.getElementById('brightness').value = photoAdjustments.brightness;
    document.getElementById('contrast').value = photoAdjustments.contrast;
    document.getElementById('saturation').value = photoAdjustments.saturation;
    document.getElementById('hue').value = photoAdjustments.hue;
    document.getElementById('exposure').value = photoAdjustments.exposure;
    document.getElementById('sharpness').value = photoAdjustments.sharpness;
    document.getElementById('opacity').value = photoAdjustments.opacity;

    document.getElementById('brightnessDisplay').textContent = photoAdjustments.brightness + '%';
    document.getElementById('contrastDisplay').textContent = photoAdjustments.contrast + '%';
    document.getElementById('saturationDisplay').textContent = photoAdjustments.saturation + '%';
    document.getElementById('hueDisplay').textContent = photoAdjustments.hue + '°';
    document.getElementById('exposureDisplay').textContent = photoAdjustments.exposure;
    document.getElementById('sharpnessDisplay').textContent = photoAdjustments.sharpness;
    document.getElementById('opacityDisplay').textContent = photoAdjustments.opacity + '%';
}

function resetAllSliders() {
    document.getElementById('brightness').value = 100;
    document.getElementById('contrast').value = 100;
    document.getElementById('saturation').value = 100;
    document.getElementById('hue').value = 0;
    document.getElementById('exposure').value = 0;
    document.getElementById('sharpness').value = 0;
    document.getElementById('opacity').value = 100;
    updateAllSliders();
}

function updateEffectsList() {
    const effectsList = document.getElementById('effectsList');
    effectsList.innerHTML = '';
    
    const activeEffects = [];
    if (photoAdjustments.brightness !== 100) activeEffects.push(`Brightness: ${photoAdjustments.brightness}%`);
    if (photoAdjustments.contrast !== 100) activeEffects.push(`Contrast: ${photoAdjustments.contrast}%`);
    if (photoAdjustments.saturation !== 100) activeEffects.push(`Saturation: ${photoAdjustments.saturation}%`);
    if (photoAdjustments.hue !== 0) activeEffects.push(`Hue: ${photoAdjustments.hue}°`);
    if (photoAdjustments.opacity !== 100) activeEffects.push(`Opacity: ${photoAdjustments.opacity}%`);

    Object.keys(activePhotoFilters).forEach(filter => {
        activeEffects.push(`📌 ${filter}`);
    });

    activeEffects.forEach(effect => {
        const badge = document.createElement('div');
        badge.className = 'effect-badge';
        badge.textContent = effect;
        effectsList.appendChild(badge);
    });
}

// ==================== HISTORY & UNDO ====================

function saveHistory() {
    photoActionHistory.push(JSON.parse(JSON.stringify(photoAdjustments)));
    if (photoActionHistory.length > 10) photoActionHistory.shift();
}

function undoPhotoAction() {
    if (photoActionHistory.length === 0) return showNotification('Nothing to undo!');
    photoAdjustments = JSON.parse(JSON.stringify(photoActionHistory.pop()));
    updateAllSliders();
    renderPhoto();
    showNotification('↶ Action undone!');
}

// ==================== DOWNLOAD & RESET ====================

function downloadPhoto() {
    if (!photoImage) return showNotification('📷 Upload a photo first!');
    
    const link = document.createElement('a');
    link.href = photoCanvas.toDataURL('image/png');
    link.download = `photo-${Date.now()}.png`;
    link.click();
    showNotification('⬇️ Photo downloaded!');
}

function resetAllPhoto() {
    photoAdjustments = {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hue: 0,
        exposure: 0,
        sharpness: 0,
        opacity: 100
    };
    activePhotoFilters = {};
    photoActionHistory = [];
    resetAllSliders();
    renderPhoto();
    showNotification('🔄 All adjustments reset!');
}

// ==================== NOTIFICATIONS ====================

function showNotification(msg) {
    const notification = document.getElementById('notification');
    notification.textContent = msg;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
}// Video Editor Script - Full Manual Control

let videoPreview = document.getElementById('videoPreview');
let videoInput = document.getElementById('videoInput');
let uploadArea = document.getElementById('uploadArea');

let videoAdjustments = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    volume: 100,
    speed: 1,
    opacity: 100
};

let activeVideoFilters = {};
let videoActionHistory = [];
let trimStart = null;
let trimEnd = null;

// ==================== UPLOAD FUNCTIONALITY ====================

uploadArea.addEventListener('click', () => videoInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#764ba2';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '#667eea';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
        loadVideo(file);
    }
});

videoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) loadVideo(file);
});

function loadVideo(file) {
    const url = URL.createObjectURL(file);
    videoPreview.src = url;
    uploadArea.style.display = 'none';
    videoPreview.style.display = 'block';
    document.getElementById('timelineSection').style.display = 'block';
    document.getElementById('playbackControls').style.display = 'flex';
    document.getElementById('trimControls').style.display = 'block';
    showNotification('✅ Video loaded successfully!');
}

// ==================== VIDEO PLAYBACK ====================

videoPreview.addEventListener('loadedmetadata', () => {
    document.getElementById('videoTimeline').max = Math.floor(videoPreview.duration);
    updateTimeDisplay();
});

videoPreview.addEventListener('timeupdate', () => {
    document.getElementById('videoTimeline').value = Math.floor(videoPreview.currentTime);
    updateTimeDisplay();
});

function updateTimeDisplay() {
    const current = formatTime(videoPreview.currentTime);
    const duration = formatTime(videoPreview.duration);
    document.getElementById('currentTimeDisplay').textContent = current;
    document.getElementById('durationDisplay').textContent = duration;
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function seekVideo() {
    videoPreview.currentTime = document.getElementById('videoTimeline').value;
}

function togglePlayVideo() {
    const btn = document.getElementById('playBtn');
    if (videoPreview.paused) {
        videoPreview.play();
        btn.textContent = '⏸️ Pause';
    } else {
        videoPreview.pause();
        btn.textContent = '▶️ Play';
    }
}

function stopVideo() {
    videoPreview.pause();
    videoPreview.currentTime = 0;
    document.getElementById('playBtn').textContent = '▶️ Play';
}

// ==================== MANUAL VIDEO ADJUSTMENTS ====================

function updateVideoAdjustment(type) {
    const value = document.getElementById(type).value;
    
    videoAdjustments[type] = parseFloat(value);
    
    // Update display
    const displayId = type + 'Display';
    const displayElement = document.getElementById(displayId);
    if (displayElement) {
        if (type === 'speed') {
            displayElement.textContent = value + 'x';
            videoPreview.playbackRate = parseFloat(value);
        } else if (type === 'volume') {
            displayElement.textContent = value + '%';
            videoPreview.volume = parseFloat(value) / 100;
        } else if (type === 'brightness' || type === 'contrast' || type === 'saturation' || type === 'opacity') {
            displayElement.textContent = value + '%';
        } else if (type === 'hue') {
            displayElement.textContent = value + '°';
        }
    }

    applyVideoFilters();
    saveVideoHistory();
}

function applyVideoFilters() {
    const { brightness, contrast, saturation, hue, opacity } = videoAdjustments;
    videoPreview.style.filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        saturate(${saturation}%)
        hue-rotate(${hue}deg)
    `;
    videoPreview.style.opacity = opacity / 100;
    updateEffectsList();
}

// ==================== VIDEO FILTERS ====================

function applyVideoFilter(filterName) {
    if (!videoPreview.src) return showNotification('🎥 Upload a video first!');

    if (filterName === 'original') {
        activeVideoFilters = {};
        videoAdjustments = {
            brightness: 100,
            contrast: 100,
            saturation: 100,
            hue: 0,
            volume: 100,
            speed: 1,
            opacity: 100
        };
        resetAllVideoSliders();
        applyVideoFilters();
        showNotification('✨ Original filter applied!');
        return;
    }

    activeVideoFilters[filterName] = true;

    switch(filterName) {
        case 'grayscale':
            videoAdjustments.saturation = 0;
            break;
        case 'sepia':
            videoAdjustments.saturation = 50;
            videoAdjustments.hue = 30;
            break;
        case 'cool':
            videoAdjustments.hue = 180;
            videoAdjustments.saturation = 120;
            videoAdjustments.brightness = 95;
            break;
        case 'warm':
            videoAdjustments.hue = 20;
            videoAdjustments.saturation = 120;
            videoAdjustments.brightness = 110;
            break;
        case 'invert':
            videoAdjustments.brightness = 100;
            videoAdjustments.contrast = 100;
            break;
    }

    updateAllVideoSliders();
    saveVideoHistory();
    applyVideoFilters();
    showNotification(`✨ ${filterName.toUpperCase()} filter applied!`);
}

// ==================== VIDEO EFFECTS ====================

function applyVideoEffect(effectName) {
    if (!videoPreview.src) return showNotification('🎥 Upload a video first!');

    switch(effectName) {
        case 'blur':
            videoAdjustments.brightness = 100;
            videoAdjustments.contrast = 100;
            break;
        case 'glow':
            videoAdjustments.brightness = 120;
            videoAdjustments.saturation = 120;
            break;
        case 'fade':
            videoAdjustments.contrast = 70;
            videoAdjustments.saturation = 50;
            break;
    }

    activeVideoFilters[effectName] = true;
    updateAllVideoSliders();
    saveVideoHistory();
    applyVideoFilters();
    showNotification(`✨ ${effectName.toUpperCase()} effect applied!`);
}

// ==================== VIDEO TOOLS ====================

function activateVideoTool(tool) {
    if (!videoPreview.src) return showNotification('🎥 Upload a video first!');

    switch(tool) {
        case 'trim':
            document.getElementById('trimControls').style.display = 'block';
            showNotification('✂️ Trim tool activated - Mark start and end points');
            break;
        case 'crop':
            showNotification('🔲 Crop tool activated - Resize video dimensions');
            break;
        case 'reverse':
            showNotification('⏮️ Reverse effect activated');
            saveVideoHistory();
            break;
        case 'freeze':
            videoPreview.pause();
            showNotification('⏸️ Frame frozen!');
            break;
        case 'extractAudio':
            showNotification('📤 Audio extraction - Right-click on video > Save audio as');
            break;
        case 'muteAudio':
            videoPreview.volume = 0;
            videoAdjustments.volume = 0;
            document.getElementById('volume').value = 0;
            showNotification('🔇 Video muted!');
            break;
    }
}

// ==================== TRIM FUNCTIONALITY ====================

function setTrimStart() {
    trimStart = videoPreview.currentTime;
    updateTrimInfo();
    showNotification(`⏹️ Trim start: ${formatTime(trimStart)}`);
    saveVideoHistory();
}

function setTrimEnd() {
    trimEnd = videoPreview.currentTime;
    update
