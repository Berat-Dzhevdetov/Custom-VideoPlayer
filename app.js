(function() {
    let video = document.querySelector('.video');
    let juice = document.querySelector('.orange-juice');
    let playPauseBtn = document.getElementById('play-pause');
    let volumeId = document.getElementById('volumeId');
    let slider = document.getElementById("myRange");
    let cVideo = document.querySelector('.c-video');
    let currentTime = document.getElementById('currentTime');
    let fullTime = document.getElementById('fullTime');
    let fullscreen = document.getElementById('fullscreen');

    fullscreen.addEventListener('click', (e) => {
        if (video.requestFullscreen || video.webkitRequestFullscreen || video.msRequestFullscreen) {
            adjustmentWidthAndHeight();
        } else {
            closeFullScreen()
        }
    })


    function adjustmentWidthAndHeight() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) { /* Safari */
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { /* IE11 */
            video.msRequestFullscreen();
        }

    }

    function closeFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
    let mins = calculateMinutes(video.duration);
    let secs = calculateSecs(video.duration);

    function calculateMinutes(duration) {
        return Math.floor(duration / 60);
    }

    function calculateSecs(duration, bool = true) {
        let sec = Math.ceil(duration % 60);
        if (sec == 60 && bool) {
            mins++;
            sec = '00';
        }
        return sec;
    }
    fullTime.innerHTML = mins + ':' + secs;
    currentTime.innerHTML = '0:00';

    volumeId.addEventListener('click', () => {
        toogleMuteUnmute();
        setsMuteOrUnmuteIcon();
    })

    function setsMuteOrUnmuteIcon() {
        if (video.volume <= 1.3877787807814457e-16) {
            volumeId.src = 'muted-volume.png';
        } else if (video.volume >= 0.01) {
            volumeId.src = 'speaker-icon.svg';
        }
    }

    function toogleMuteUnmute() {
        if (video.volume <= 0.00) {
            video.volume = 1;
        } else {
            video.volume = 0;
        }
    }
    document.body.addEventListener('keyup', (e) => {
        e.preventDefault();
        let currentButton = e.key;
        if (currentButton == ' ') {
            tooglePlayPause();
        } else if (currentButton == "ArrowDown") {
            if (video.volume > 0) {
                video.volume -= 0.1;
                slider.value -= 10;
                setsMuteOrUnmuteIcon();
            }
        } else if (currentButton == "ArrowUp") {
            if (video.volume < 1) {
                video.volume += 0.1;
                slider.value += 10;
                setsMuteOrUnmuteIcon();
            }
        } else if (currentButton == "ArrowRight") {
            if (video.currentTime + 5 < video.currentTime) {
                video.currentTime = video.currentTime;
            } else {
                video.currentTime += 5;
            }
        } else if (currentButton == "ArrowLeft") {
            if (video.currentTime - 5 <= 0) {
                video.currentTime = 0;
            } else {
                video.currentTime -= 5;
            }
        } else if (currentButton == "f") {
            if (video.requestFullscreen || video.webkitRequestFullscreen || video.msRequestFullscreen) {
                adjustmentWidthAndHeight();
            } else {
                closeFullScreen()
            }
        }
    })

    function tooglePlayPause() {
        if (video.paused) {
            playPauseBtn.src = 'pause-solid.png';
            video.play();
        } else {
            playPauseBtn.src = 'play-solid.svg';
            video.pause();
        }
    }
    playPauseBtn.addEventListener('click', () => {
        tooglePlayPause()
    });
    video.addEventListener('timeupdate', function() {
        let currentWidth = video.currentTime / video.duration;
        juice.style.width = currentWidth * 100 + '%';
        let currentMin = calculateMinutes(video.currentTime);
        let currentSec = calculateSecs(video.currentTime, false);
        if (currentSec >= 60) {
            currentSec = 0;
            currentMin++;
        }
        currentMin = pad(currentMin, 1);
        currentSec = pad(currentSec, 2);
        currentTime.innerHTML = `${currentMin}:${currentSec}`;
        if (video.ended) {
            playPauseBtn.src = 'play-solid.svg'
        }
    })

    slider.oninput = function() {
        video.volume = slider.value / 100;
        setsMuteOrUnmuteIcon();
    };

    video.volume = slider.value / 100;
    setsMuteOrUnmuteIcon();
    tooglePlayPause();

    function pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }
}())