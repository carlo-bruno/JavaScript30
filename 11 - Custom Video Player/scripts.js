// Get Elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

// player controls
const playButton = player.querySelector('.toggle');
const muteButton = player.querySelector('.mute');
const skipButtons = player.querySelectorAll('[data-skip]');
const sliders = player.querySelectorAll('.player__slider');
const fsButton = player.querySelector('.fullscreen');


// Build functions
// Working with HTML Media Elements
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement

// play button
function togglePlay() {
    const method = video.paused ? 'play' :'pause';
    video[method]();
}
function updatePlayButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    playButton.textContent = icon;
}

// mute button
function muteVideo() {
    video.muted = !video.muted;
}
function updateMute() {
    const muteIcon = video.muted ? '🔇': '🔈' ;
    muteButton.textContent = muteIcon;
}

// skip buttons
function skip() {
    video.currentTime += parseFloat(this.dataset.skip); // * currentTime, Properties
}

// sliders
function handleSliders() {
    video[this.name] = this.value;
    if (video.volume) video.muted = false;
}

// progress bar
function handleProgress() {
    const percent = (video.currentTime / video.duration) *100;

    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(event) {
    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function fullScreenVid() {
    if(video.requestFullScreen){
		video.requestFullScreen();
	} else if(video.webkitRequestFullScreen){
		video.webkitRequestFullScreen();
	} else if(video.mozRequestFullScreen){
		video.mozRequestFullScreen();
	} // video full screen toggle http://www.developphp.com/video/JavaScript/Video-Full-Screen-Toggle-Custom-Player-Controls-Tutorial
}


// Add Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress); // * timeupdate, Events (see also, progress)

playButton.addEventListener('click', togglePlay);

muteButton.addEventListener('click', muteVideo);
muteButton.addEventListener('click', updateMute);
muteButton.addEventListener('volumechange', updateMute);

skipButtons.forEach(button => button.addEventListener('click', skip));

let mouseClicked = false;
sliders.forEach(range => range.addEventListener('change', handleSliders));
sliders.forEach(range => range.addEventListener('mousedown', () => mouseClicked = true));
sliders.forEach(range => range.addEventListener('mouseup', () => mouseClicked = false));
sliders.forEach(range => range.addEventListener('mousemove', () => mouseClicked && handleSliders));

progress.addEventListener('click', scrub);
progress.addEventListener('mousedown',() => mouseClicked = true);
progress.addEventListener('mouseup',() => mouseClicked = false);
progress.addEventListener('mousemove',(event) => mouseClicked && scrub(event));

fsButton.addEventListener('click', fullScreenVid);


