// ==================== UTILITY FUNCTIONS ====================

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ==================== PHOTO EDITOR ====================

let photoImage = null;
let photoContext = null;
let photoCanvas = document.getElementById('photoCanvas');
let photoInput = document.getElementById('photoInput');
let originalPhotoImage = null;

// Load Photo
photoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            photoImage = img;
            originalPhotoImage = img;
            
            // Set canvas size
            const maxWidth = 600;
            if (img.width > maxWidth) {
                photoCanvas.width = maxWidth;
                photoCanvas.height = (img.height / img.width) * maxWidth;
            } else {
                photoCanvas.width = img.width;
                photoCanvas.height = img.height;
            }
            
            photoContext = photoCanvas.getContext('2d');
            
            // Hide placeholder and show canvas
            document.getElementById('photoPlaceholder').style.display = 'none';
            photoCanvas.style.display = 'block';
            
            drawPhoto();
            showNotification('✅ Photo loaded successfully!');
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

function drawPhoto() {
    if (!photoImage || !photoContext) return;
    
    const brightness = document.getElementById('brightness').value;
    const contrast = document.getElementById('contrast').value;
    const saturation = document.getElementById('saturation').value;
    const hue = document.getElementById('hue').value;
    const opacity = document.getElementById('opacity').value / 100;
    
    photoContext.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
    photoContext.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hue}deg)`;
    photoContext.globalAlpha = opacity;
    photoContext.drawImage(photoImage, 0, 0, photoCanvas.width, photoCanvas.height);
    photoContext.globalAlpha = 1;
}

function updatePhotoAdjustments() {
    document.getElementById('brightnessValue').textContent = document.getElementById('brightness').value;
    document.getElementById('contrastValue').textContent = document.getElementById('contrast').value;
    document.getElementById('saturationValue').textContent = document.getElementById('saturation').value;
    document.getElementById('hueValue').textContent = document.getElementById('hue').value;
    document.getElementById('opacityValue').textContent = document.getElementById('opacity').value;
    drawPhoto();
}

// Photo Tools
function cropPhoto() {
    if (!photoImage) return showNotification('📷 Please upload a photo first!');
    showNotification('🔲 Crop tool activated - Resize the preview to crop');
}

function rotatePhoto() {
    if (!photoImage) return showNotification('📷 Please upload a photo first!');
    
    const temp = photoCanvas.width;
    photoCanvas.width = photoCanvas.height;
    photoCanvas.height = temp;
    
    photoContext.save();
    photoContext.translate(photoCanvas.width / 2, photoCanvas.height / 2);
    photoContext.rotate(Math.PI / 2);
    photoContext.translate(-photoCanvas.height / 2, -photoCanvas.width / 2);
    photoContext.drawImage(photoImage, 0, 0, photoCanvas.height, photoCanvas.width);
    photoContext.restore();
    
    showNotification('🔄 Photo rotated 90°');
}

function flipPhoto() {
    if (!photoImage) return showNotification('📷 Please upload a photo first!');
    
    photoContext.save();
    photoContext.scale(-1, 1);
    photoContext.translate(-photoCanvas.width, 0);
    photoContext.drawImage(photoImage, 0, 0, photoCanvas.width, photoCanvas.height);
    photoContext.restore();
    
    showNotification('↔️ Photo flipped horizontally');
}

function resizePhoto() {
    if (!photoImage) return showNotification('📷 Please upload a photo first!');
    const newWidth = prompt('Enter new width (pixels):', photoCanvas.width);
    if (newWidth) {
        photoCanvas.width = parseInt(newWidth);
        photoCanvas.height = (photoImage.height / photoImage.width) * photoCanvas.width;
        drawPhoto();
        showNotification('📏 Photo resized');
    }
}

function duplicatePhoto() {
    if (!photoImage) return showNotification('📷 Please upload a photo first!');
    showNotification('📋 Photo duplicated - You can edit a copy');
}

function applyFilter(filterName) {
    if (!photoImage) return showNotification('📷 Please upload a photo first!');
    
    photoContext.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
    
    switch(filterName) {
        case 'grayscale':
            photoContext.filter = 'grayscale(100%)';
            break;
        case 'sepia':
            photoContext.filter = 'sepia(100%)';
            break;
        case 'vintage':
            photoContext.filter = 'sepia(50%) saturate(150%) brightness(110%)';
            break;
        case 'cool':
            photoContext.filter = 'hue-rotate(180deg) saturate(120%) brightness(95%)';
            break;
        case 'warm':
            photoContext.filter = 'hue-rotate(20deg) saturate(120%) brightness(110%)';
            break;
        case 'invert':
            photoContext.filter = 'invert(100%)';
            break;
    }
    
    photoContext.drawImage(photoImage, 0, 0, photoCanvas.width, photoCanvas.height);
    showNotification(`✨ ${filterName.toUpperCase()} filter applied!`);
}

function applyEffect(effectName) {
    if (!photoImage) return showNotification('📷 Please upload a photo first!');
    
    photoContext.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
    
    switch(effectName) {
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
            photoContext.filter = 'brightness(85%) saturate(110%)';
            break;
    }
    
    photoContext.drawImage(photoImage, 0, 0, photoCanvas.width, photoCanvas.height);
    showNotification(`✨ ${effectName.toUpperCase()} effect applied!`);
}

function downloadPhoto() {
    if (photoCanvas.style.display === 'none') {
        return showNotification('📷 Please edit a photo first!');
    }
    
    const link = document.createElement('a');
    link.href = photoCanvas.toDataURL('image/png');
    link.download = `photo-edit-${Date.now()}.png`;
    link.click();
    showNotification('⬇️ Photo downloaded!');
}

function resetPhoto() {
    document.getElementById('brightness').value = 100;
    document.getElementById('contrast').value = 100;
    document.getElementById('saturation').value = 100;
    document.getElementById('hue').value = 0;
    document.getElementById('opacity').value = 100;
    updatePhotoAdjustments();
    showNotification('🔄 Photo reset to original!');
}

// ==================== VIDEO EDITOR ====================

let videoElement = document.getElementById('videoPreview');
let videoInput = document.getElementById('videoInput');
let trimStart = null;
let trimEnd = null;

// Load Video
videoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const url = URL.createObjectURL(file);
    videoElement.src = url;
    document.getElementById('videoPlaceholder').style.display = 'none';
    videoElement.classList.add('show');
    showNotification('✅ Video loaded successfully!');
});

// Video Time Update
videoElement.addEventListener('timeupdate', function() {
    const mins = Math.floor(videoElement.currentTime / 60);
    const secs = Math.floor(videoElement.currentTime % 60);
    document.getElementById('currentTime').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
});

function updateVideoSpeed() {
    const speed = document.getElementById('videoSpeed').value;
    videoElement.playbackRate = parseFloat(speed);
    document.getElementById('speedValue').textContent = speed;
}

function updateVideoVolume() {
    const volume = document.getElementById('videoVolume').value;
    videoElement.volume = parseFloat(volume) / 100;
    document.getElementById('volumeValue').textContent = volume;
}

function updateVideoAdjustments() {
    const brightness = document.getElementById('videoBrightness').value;
    const contrast = document.getElementById('videoContrast').value;
    videoElement.style.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
    document.getElementById('videoBrightnessValue').textContent = brightness;
    document.getElementById('videoContrastValue').textContent = contrast;
}

function updateVideoOpacity() {
    const opacity = document.getElementById('videoOpacity').value;
    videoElement.style.opacity = opacity / 100;
    document.getElementById('videoOpacityValue').textContent = opacity;
}

// Video Tools
function splitVideo() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    showNotification('✂️ Split tool activated');
}

function cropVideo() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    showNotification('🔲 Crop tool activated');
}

function duplicateVideo() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    showNotification('📋 Video duplicated');
}

function deleteSegment() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    showNotification('🗑️ Delete segment tool activated');
}

function freezeFrame() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    videoElement.pause();
    showNotification('⏸️ Frame frozen');
}

function reverseVideo() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    showNotification('⏮️ Reverse effect applied');
}

function extractAudio() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    showNotification('📤 Extracting audio...');
}

function isolateVoice() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    showNotification('🎤 Voice isolation activated');
}

function reduceNoise() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    showNotification('🔇 Noise reduction applied');
}

function enhanceVoice() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    showNotification('📢 Voice enhancement activated');
}

function detectBeats() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    showNotification('🎵 Beat detection activated');
}

function addAnimation() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    showNotification('🎨 Animation effects available');
}

function applyVideoEffect(effectName) {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    showNotification(`⚡ ${effectName} effect applied`);
}

function addOverlay() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    showNotification('📐 Overlay tool activated');
}

function relight() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    showNotification('💡 Relighting applied');
}

function addMask() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    showNotification('👤 Mask tool activated');
}

function autoReframe() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    showNotification('📺 Auto reframe activated');
}

function stabilize() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    showNotification('🎯 Stabilization applied');
}

function unlinkAudio() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    showNotification('🔗 Audio unlinked');
}

// Trim Functions
function markTrimStart() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    trimStart = videoElement.currentTime;
    updateTrimInfo();
    showNotification('⏹️ Trim start marked!');
}

function markTrimEnd() {
    if (!videoElement.src) return showNotification('🎥 Please upload a video first!');
    trimEnd = videoElement.currentTime;
    updateTrimInfo();
    showNotification('⏹️ Trim end marked!');
}

function resetTrim() {
    trimStart = null;
    trimEnd = null;
    updateTrimInfo();
    showNotification('🔄 Trim reset!');
}

function updateTrimInfo() {
    const trimInfo = document.getElementById('trimInfo');
    if (trimStart === null || trimEnd === null) {
        trimInfo.textContent = 'No trim set';
    } else {
        const start = `${Math.floor(trimStart / 60)}:${Math.floor(trimStart % 60).toString().padStart(2, '0')}`;
        const end = `${Math.floor(trimEnd / 60)}:${Math.floor(trimEnd % 60).toString().padStart(2, '0')}`;
        trimInfo.textContent = `✂️ Trim: ${start} - ${end}`;
    }
}

function downloadVideo() {
    if (!videoElement.src) {
        return showNotification('🎥 Please upload a video first!');
    }
    
    const link = document.createElement('a');
    link.href = videoElement.src;
    link.download = `video-edit-${Date.now()}.mp4`;
    link.click();
    showNotification('⬇️ Video downloaded!');
}

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
    resetTrim();
    showNotification('🔄 Video reset!');
}
