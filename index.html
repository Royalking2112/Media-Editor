// ==================== PAGE NAVIGATION ====================

function showHome() {
    document.getElementById('home-section').classList.add('show');
    document.getElementById('photo-section').classList.remove('show');
    document.getElementById('video-section').classList.remove('show');
}

function showPhotoEditor() {
    document.getElementById('home-section').classList.remove('show');
    document.getElementById('photo-section').classList.add('show');
    document.getElementById('video-section').classList.remove('show');
}

function showVideoEditor() {
    document.getElementById('home-section').classList.remove('show');
    document.getElementById('photo-section').classList.remove('show');
    document.getElementById('video-section').classList.add('show');
}

function showNotification(msg) {
    const notification = document.getElementById('notification');
    notification.textContent = msg;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
}

// ==================== PHOTO EDITOR ====================

let photoImage = null;
let photoContext = null;
let photoCanvas = document.getElementById('photoCanvas');
let photoInput = document.getElementById('photoInput');
let photoUploadArea = document.getElementById('photoUploadArea');

let photoState = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    exposure: 0,
    sharpness: 0,
    opacity: 100,
    currentFilter: 'original'
};

// Photo Upload
photoUploadArea.addEventListener('click', () => photoInput.click());
photoUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    photoUploadArea.style.borderColor = '#764ba2';
});
photoUploadArea.addEventListener('dragleave', () => {
    photoUploadArea.style.borderColor = '#667eea';
});
photoUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) loadPhotoFile(e.dataTransfer.files[0]);
});

photoInput.addEventListener('change', (e) => {
    if (e.target.files[0]) loadPhotoFile(e.target.files[0]);
});

function loadPhotoFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            photoImage = img;
            const maxWidth = 600;
            photoCanvas.width = Math.min(img.width, maxWidth);
            photoCanvas.height = (img.height / img.width) * photoCanvas.width;
            photoContext = photoCanvas.getContext('2d');
            photoUploadArea.style.display = 'none';
            photoCanvas.style.display = 'block';
            renderPhoto();
            showNotification('✅ Photo loaded!');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function renderPhoto() {
    if (!photoImage || !photoContext) return;
    photoContext.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
    photoContext.filter = `
        brightness(${photoState.brightness}%)
        contrast(${photoState.contrast}%)
        saturate(${photoState.saturation}%)
        hue-rotate(${photoState.hue}deg)
    `;
    photoContext.globalAlpha = photoState.opacity / 100;
    photoContext.drawImage(photoImage, 0, 0, photoCanvas.width, photoCanvas.height);
    photoContext.globalAlpha = 1;
    updatePhotoEffectsList();
}

function updatePhotoAdjustment(type) {
    const value = document.getElementById('photo' + type.charAt(0).toUpperCase() + type.slice(1)).value;
    photoState[type] = parseInt(value);
    
    const displayMap = {
        brightness: 'photoBrightnessValue',
        contrast: 'photoContrastValue',
        saturation: 'photoSaturationValue',
        hue: 'photoHueValue',
        exposure: 'photoExposureValue',
        sharpness: 'photoSharpnessValue',
        opacity: 'photoOpacityValue'
    };
    
    const display = document.getElementById(displayMap[type]);
    if (display) {
        if (type === 'hue') display.textContent = value + '°';
        else if (type === 'exposure' || type === 'sharpness') display.textContent = value;
        else display.textContent = value + '%';
    }
    
    renderPhoto();
}

function applyPhotoFilter(name) {
    if (!photoImage) return showNotification('📷 Upload a photo first!');
    
    photoState.currentFilter = name;
    
    if (name === 'original') {
        photoState = { brightness: 100, contrast: 100, saturation: 100, hue: 0, exposure: 0, sharpness: 0, opacity: 100, currentFilter: 'original' };
        resetPhotoSliders();
    } else if (name === 'grayscale') {
        photoState.saturation = 0;
    } else if (name === 'sepia') {
        photoState.saturation = 50;
        photoState.hue = 30;
    } else if (name === 'vintage') {
        photoState.saturation = 150;
        photoState.hue = 20;
        photoState.brightness = 110;
    } else if (name === 'cool') {
        photoState.hue = 180;
        photoState.saturation = 120;
    } else if (name === 'warm') {
        photoState.hue = 20;
        photoState.saturation = 120;
        photoState.brightness = 110;
    } else if (name === 'invert') {
        photoState.brightness = 100;
        photoState.contrast = 150;
    }
    
    updatePhotoSliders();
    renderPhoto();
    showNotification('✨ ' + name.toUpperCase() + ' filter applied!');
}

function applyPhotoEffect(name) {
    if (!photoImage) return showNotification('📷 Upload a photo first!');
    
    if (name === 'glow') {
        photoState.brightness = 120;
        photoState.saturation = 120;
    } else if (name === 'vignette') {
        photoState.brightness = 85;
        photoState.saturation = 110;
    } else if (name === 'fade') {
        photoState.contrast = 70;
        photoState.saturation = 50;
    }
    
    updatePhotoSliders();
    renderPhoto();
    showNotification('✨ ' + name + ' effect applied!');
}

function rotatePhoto90() {
    if (!photoImage) return showNotification('📷 Upload a photo first!');
    const temp = photoCanvas.width;
    photoCanvas.width = photoCanvas.height;
    photoCanvas.height = temp;
    photoContext = photoCanvas.getContext('2d');
    photoContext.translate(photoCanvas.width / 2, photoCanvas.height / 2);
    photoContext.rotate(Math.PI / 2);
    photoContext.translate(-photoCanvas.height / 2, -photoCanvas.width / 2);
    renderPhoto();
    showNotification('🔄 Rotated 90°!');
}

function flipPhotoHorizontal() {
    if (!photoImage) return showNotification('📷 Upload a photo first!');
    photoContext.save();
    photoContext.scale(-1, 1);
    photoContext.translate(-photoCanvas.width, 0);
    renderPhoto();
    photoContext.restore();
    showNotification('↔️ Flipped horizontally!');
}

function flipPhotoVertical() {
    if (!photoImage) return showNotification('📷 Upload a photo first!');
    photoContext.save();
    photoContext.scale(1, -1);
    photoContext.translate(0, -photoCanvas.height);
    renderPhoto();
    photoContext.restore();
    showNotification('↕️ Flipped vertically!');
}

function resizePhotoDialog() {
    if (!photoImage) return showNotification('📷 Upload a photo first!');
    const width = prompt('Enter new width:', photoCanvas.width);
    if (width) {
        photoCanvas.width = parseInt(width);
        photoCanvas.height = (photoImage.height / photoImage.width) * photoCanvas.width;
        renderPhoto();
        showNotification('📏 Resized!');
    }
}

function downloadPhoto() {
    if (!photoImage) return showNotification('📷 Upload a photo first!');
    const link = document.createElement('a');
    link.href = photoCanvas.toDataURL('image/png');
    link.download = `photo-${Date.now()}.png`;
    link.click();
    showNotification('⬇️ Downloaded!');
}

function resetAllPhoto() {
    if (!photoImage) return;
    photoState = { brightness: 100, contrast: 100, saturation: 100, hue: 0, exposure: 0, sharpness: 0, opacity: 100, currentFilter: 'original' };
    resetPhotoSliders();
    renderPhoto();
    showNotification('🔄 Reset all!');
}

function updatePhotoSliders() {
    document.getElementById('photoBrightness').value = photoState.brightness;
    document.getElementById('photoContrast').value = photoState.contrast;
    document.getElementById('photoSaturation').value = photoState.saturation;
    document.getElementById('photoHue').value = photoState.hue;
    document.getElementById('photoExposure').value = photoState.exposure;
    document.getElementById('photoSharpness').value = photoState.sharpness;
    document.getElementById('photoOpacity').value = photoState.opacity;
    
    document.getElementById('photoBrightnessValue').textContent = photoState.brightness + '%';
    document.getElementById('photoContrastValue').textContent = photoState.contrast + '%';
    document.getElementById('photoSaturationValue').textContent = photoState.saturation + '%';
    document.getElementById('photoHueValue').textContent = photoState.hue + '°';
    document.getElementById('photoExposureValue').textContent = photoState.exposure;
    document.getElementById('photoSharpnessValue').textContent = photoState.sharpness;
    document.getElementById('photoOpacityValue').textContent = photoState.opacity + '%';
}

function resetPhotoSliders() {
    document.getElementById('photoBrightness').value = 100;
    document.getElementById('photoContrast').value = 100;
    document.getElementById('photoSaturation').value = 100;
    document.getElementById('photoHue').value = 0;
    document.getElementById('photoExposure').value = 0;
    document.getElementById('photoSharpness').value = 0;
    document.getElementById('photoOpacity').value = 100;
    updatePhotoSliders();
}

function updatePhotoEffectsList() {
    const list = document.getElementById('photoEffectsList');
    list.innerHTML = '';
    const effects = [];
    if (photoState.brightness !== 100) effects.push(`Brightness: ${photoState.brightness}%`);
    if (photoState.contrast !== 100) effects.push(`Contrast: ${photoState.contrast}%`);
    if (photoState.saturation !== 100) effects.push(`Saturation: ${photoState.saturation}%`);
    if (photoState.hue !== 0) effects.push(`Hue: ${photoState.hue}°`);
    if (photoState.opacity !== 100) effects.push(`Opacity: ${photoState.opacity}%`);
    if (photoState.currentFilter !== 'original') effects.push(`📌 ${photoState.currentFilter}`);
    
    effects.forEach(e => {
        const badge = document.createElement('div');
        badge.className = 'effect-badge';
        badge.textContent = e;
        list.appendChild(badge);
    });
}

// ==================== VIDEO EDITOR ====================

let videoPreview = document.getElementById('videoPreview');
let videoInput = document.getElementById('videoInput');
let videoUploadArea = document.getElementById('videoUploadArea');

let videoState = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    volume: 100,
    speed: 1,
    opacity: 100,
    currentFilter: 'original'
};

let trimStart = null;
let trimEnd = null;

// Video Upload
videoUploadArea.addEventListener('click', () => videoInput.click());
videoUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    videoUploadArea.style.borderColor = '#764ba2';
});
videoUploadArea.addEventListener('dragleave', () => {
    videoUploadArea.style.borderColor = '#667eea';
});
videoUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) loadVideoFile(e.dataTransfer.files[0]);
});

videoInput.addEventListener('change', (e) => {
    if (e.target.files[0]) loadVideoFile(e.target.files[0]);
});

function loadVideoFile(file) {
    const url = URL.createObjectURL(file);
    videoPreview.src = url;
    videoUploadArea.style.display = 'none';
    videoPreview.style.display = 'block';
    document.getElementById('timelineSection').style.display = 'block';
    document.getElementById('videoPlaybackControls').style.display = 'flex';
    showNotification('✅ Video loaded!');
}

videoPreview.addEventListener('loadedmetadata', () => {
    document.getElementById('videoTimeline').max = videoPreview.duration;
    updateVideoTimeDisplay();
});

videoPreview.addEventListener('timeupdate', () => {
    document.getElementById('videoTimeline').value = videoPreview.currentTime;
    updateVideoTimeDisplay();
});

function updateVideoTimeDisplay() {
    const current = formatTime(videoPreview.currentTime);
    const duration = formatTime(videoPreview.duration);
    document.getElementById('currentTimeDisplay').textContent = current;
    document.getElementById('durationDisplay').textContent = duration;
}

function formatTime(s) {
    if (isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
}

function seekVideo() {
    videoPreview.currentTime = document.getElementById('videoTimeline').value;
}

function toggleVideoPlay() {
    if (videoPreview.paused) {
        videoPreview.play();
        document.getElementById('videoPlayBtn').textContent = '⏸️ Pause';
    } else {
        videoPreview.pause();
        document.getElementById('videoPlayBtn').textContent = '▶️ Play';
    }
}

function pauseVideo() {
    videoPreview.pause();
}

function stopVideo() {
    videoPreview.pause();
    videoPreview.currentTime = 0;
    document.getElementById('videoPlayBtn').textContent = '▶️ Play';
}

function updateVideoAdjustment(type) {
    const value = document.getElementById('video' + type.charAt(0).toUpperCase() + type.slice(1)).value;
    videoState[type] = parseFloat(value);
    
    const displayMap = {
        brightness: 'videoBrightnessValue',
        contrast: 'videoContrastValue',
        saturation: 'videoSaturationValue',
        hue: 'videoHueValue',
        volume: 'videoVolumeValue',
        speed: 'videoSpeedValue',
        opacity: 'videoOpacityValue'
    };
    
    const display = document.getElementById(displayMap[type]);
    if (display) {
        if (type === 'speed') display.textContent = value + 'x';
        else if (type === 'hue') display.textContent = value + '°';
        else display.textContent = value + '%';
    }
    
    if (type === 'volume') videoPreview.volume = value / 100;
    if (type === 'speed') videoPreview.playbackRate = value;
    
    applyVideoFilters();
}

function applyVideoFilters() {
    videoPreview.style.filter = `
        brightness(${videoState.brightness}%)
        contrast(${videoState.contrast}%)
        saturate(${videoState.saturation}%)
        hue-rotate(${videoState.hue}deg)
    `;
    videoPreview.style.opacity = videoState.opacity / 100;
    updateVideoEffectsList();
}

function applyVideoFilter(name) {
    if (!videoPreview.src) return showNotification('🎥 Upload a video first!');
    
    videoState.currentFilter = name;
    
    if (name === 'original') {
        videoState = { brightness: 100, contrast: 100, saturation: 100, hue: 0, volume: 100, speed: 1, opacity: 100, currentFilter: 'original' };
        resetVideoSliders();
    } else if (name === 'grayscale') {
        videoState.saturation = 0;
    } else if (name === 'sepia') {
        videoState.saturation = 50;
        videoState.hue = 30;
    } else if (name === 'cool') {
        videoState.hue = 180;
        videoState.saturation = 120;
    } else if (name === 'warm') {
        videoState.hue = 20;
        videoState.saturation = 120;
        videoState.brightness = 110;
    } else if (name === 'invert') {
        videoState.contrast = 150;
    }
    
    updateVideoSliders();
    applyVideoFilters();
    showNotification('✨ ' + name.toUpperCase() + ' filter applied!');
}

function applyVideoEffect(name) {
    if (!videoPreview.src) return showNotification('🎥 Upload a video first!');
    
    if (name === 'blur') {
        videoState.brightness = 95;
    } else if (name === 'glow') {
        videoState.brightness = 120;
        videoState.saturation = 120;
    } else if (name === 'fade') {
        videoState.contrast = 70;
        videoState.saturation = 50;
    }
    
    updateVideoSliders();
    applyVideoFilters();
    showNotification('✨ ' + name + ' effect applied!');
}

function activateVideoTrim() {
    if (!videoPreview.src) return showNotification('🎥 Upload a video first!');
    document.getElementById('videoTrimControls').style.display = 'block';
    showNotification('✂️ Trim mode activated!');
}

function reverseVideo() {
    if (!videoPreview.src) return showNotification('🎥 Upload a video first!');
    showNotification('⏮️ Reverse effect (requires server-side processing)');
}

function freezeFrame() {
    if (!videoPreview.src) return showNotification('🎥 Upload a video first!');
    videoPreview.pause();
    showNotification('⏸️ Frame frozen!');
}

function muteVideo() {
    videoPreview.volume = 0;
    videoState.volume = 0;
    document.getElementById('videoVolume').value = 0;
    document.getElementById('videoVolumeValue').textContent = '0%';
    showNotification('🔇 Muted!');
}

function unmuteVideo() {
    videoPreview.volume = 1;
    videoState.volume = 100;
    document.getElementById('videoVolume').value = 100;
    document.getElementById('videoVolumeValue').textContent = '100%';
    showNotification('🔊 Unmuted!');
}

function setTrimStart() {
    trimStart = videoPreview.currentTime;
    updateTrimInfo();
    showNotification('⏹️ Trim start: ' + formatTime(trimStart));
}

function setTrimEnd() {
    trimEnd = videoPreview.currentTime;
    updateTrimInfo();
    showNotification('⏹️ Trim end: ' + formatTime(trimEnd));
}

function resetTrim() {
    trimStart = null;
    trimEnd = null;
    updateTrimInfo();
    showNotification('🔄 Trim reset!');
}

function updateTrimInfo() {
    const info = document.getElementById('trimInfo');
    if (trimStart === null || trimEnd === null) {
        info.textContent = 'No trim set';
    } else {
        info.textContent = `✂️ Trim: ${formatTime(trimStart)} - ${formatTime(trimEnd)}`;
    }
}

function downloadVideo() {
    if (!videoPreview.src) return showNotification('🎥 Upload a video first!');
    const link = document.createElement('a');
    link.href = videoPreview.src;
    link.download = `video-${Date.now()}.mp4`;
    link.click();
    showNotification('⬇️ Downloaded!');
}

function resetAllVideo() {
    if (!videoPreview.src) return;
    videoState = { brightness: 100, contrast: 100, saturation: 100, hue: 0, volume: 100, speed: 1, opacity: 100, currentFilter: 'original' };
    resetVideoSliders();
    videoPreview.volume = 1;
    videoPreview.playbackRate = 1;
    applyVideoFilters();
    showNotification('🔄 Reset all!');
}

function updateVideoSliders() {
    document.getElementById('videoBrightness').value = videoState.brightness;
    document.getElementById('videoContrast').value = videoState.contrast;
    document.getElementById('videoSaturation').value = videoState.saturation;
    document.getElementById('videoHue').value = videoState.hue;
    document.getElementById('videoVolume').value = videoState.volume;
    document.getElementById('videoSpeed').value = videoState.speed;
    document.getElementById('videoOpacity').value = videoState.opacity;
    
    document.getElementById('videoBrightnessValue').textContent = videoState.brightness + '%';
    document.getElementById('videoContrastValue').textContent = videoState.contrast + '%';
    document.getElementById('videoSaturationValue').textContent = videoState.saturation + '%';
    document.getElementById('videoHueValue').textContent = videoState.hue + '°';
    document.getElementById('videoVolumeValue').textContent = videoState.volume + '%';
    document.getElementById('videoSpeedValue').textContent = videoState.speed + 'x';
    document.getElementById('videoOpacityValue').textContent = videoState.opacity + '%';
}

function resetVideoSliders() {
    document.getElementById('videoBrightness').value = 100;
    document.getElementById('videoContrast').value = 100;
    document.getElementById('videoSaturation').value = 100;
    document.getElementById('videoHue').value = 0;
    document.getElementById('videoVolume').value = 100;
    document.getElementById('videoSpeed').value = 1;
    document.getElementById('videoOpacity').value = 100;
    updateVideoSliders();
}

function updateVideoEffectsList() {
    const list = document.getElementById('videoEffectsList');
    list.innerHTML = '';
    const effects = [];
    if (videoState.brightness !== 100) effects.push(`Brightness: ${videoState.brightness}%`);
    if (videoState.contrast !== 100) effects.push(`Contrast: ${videoState.contrast}%`);
    if (videoState.saturation !== 100) effects.push(`Saturation: ${videoState.saturation}%`);
    if (videoState.hue !== 0) effects.push(`Hue: ${videoState.hue}°`);
    if (videoState.opacity !== 100) effects.push(`Opacity: ${videoState.opacity}%`);
    if (videoState.speed !== 1) effects.push(`Speed: ${videoState.speed}x`);
    if (videoState.currentFilter !== 'original') effects.push(`📌 ${videoState.currentFilter}`);
    
    effects.forEach(e => {
        const badge = document.createElement('div');
        badge.className = 'effect-badge';
        badge.textContent = e;
        list.appendChild(badge);
    });
}

// Initialize home page
showHome();
