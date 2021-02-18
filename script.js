const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Anonymous",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight Disco Queen",
    artist: "Who know?",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric / Jacinto Design",
  },
];

// Check if Playing
let isPlaying = false;

//  PLay

const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
};

const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
};

// Play or Pause event listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
const loadSong = (song) => {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
};

// Current song
let songIndex = 0;

// Previos song
const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

// Next song
const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

// On load -> Select first song
loadSong(songs[songIndex]);

// Update progress bar & time
const updateProgressBar = (e) => {
  if (isPlaying) {
    const { currentTime, duration } = e.srcElement;
    // Update progress bar
    const progressPrecent = (currentTime / duration) * 100;
    progress.style.width = `${progressPrecent}%`;
    // Calculate display for duration
    const durationMinute = Math.floor(duration / 60);
    let durationSecounds = Math.floor(duration % 60);
    if (durationSecounds < 10) {
      durationSecounds = `0${durationSecounds}`;
    }
    // Delay switching duration element to awoyd NaN
    if (durationSecounds) {
      durationEl.textContent = `${durationMinute}:${durationSecounds}`;
    }
    // Calculate display for current
    const currentMinute = Math.floor(currentTime / 60);
    let currentSecounds = Math.floor(currentTime % 60);
    if (currentSecounds < 10) {
      currentSecounds = `0${currentSecounds}`;
    }
    currentTimeEl.textContent = `${currentMinute}:${currentSecounds}`;
  }
};

// Set progress bar
const setProgressBar = (e) => {
  const width = e.srcElement.clientWidth;
  const clickX = e.offsetX;
  //const width = this.clientWidth;
  const { duration } = music;

  music.currentTime = (clickX / width) * duration;
};

// Event listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
