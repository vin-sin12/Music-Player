const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')

const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')

const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

// Music
const songs = [
  {
    name: 'vinayak-1',
    displayName: 'Electric Chill Machine',
    artist: 'Vinayk Design',
  },
  {
    name: 'vinayak-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Vinayak Design',
  },
  {
    name: 'vinayak-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Vinayak Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Vinayak Design',
  },
]

// check if playing
let isPlaying = false

// play
function playSong() {
  isPlaying = true
  playBtn.classList.replace('fa-play', 'fa-pause')
  playBtn.setAttribute('title', 'pause')
  music.play()
}

// pause
function pauseSong() {
  isPlaying = false
  playBtn.classList.replace('fa-pause', 'fa-play')
  playBtn.setAttribute('title', 'play')
  music.pause()
}

// play or pause event listener
playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong()
})

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName
  artist.textContent = song.artist
  music.src = `music/${song.name}.mp3`
  image.src = `img/${song.name}.jpg`
}

// current song
let songIndex = 0

// Previous Song
function prevSong() {
  songIndex--
  if (songIndex < 0) songIndex = songs.length - 1

  loadSong(songs[songIndex])
  playSong()
}

// Next Song
function nextSong() {
  songIndex++
  if (songIndex > songs.length - 1) songIndex = 0

  loadSong(songs[songIndex])
  playSong()
}

// On Load - Select first song
loadSong(songs[songIndex])

// Update ProgressBar and time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement

    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
    // Update progress bar width End

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60)
    let durationSeconds = Math.floor(duration % 60)
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}` //to display single digit in 01,02,...,09 format

    // To avoid NaN for a fraction of a second
    if (durationSeconds)
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`
    // Calculate display for duration End

    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60)
    let currentSeconds = Math.floor(currentTime % 60)
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    // Calculate display for currentTime End
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth //this represents progressContainer
  const clickX = e.offsetX
  const { duration } = music
  music.currentTime = (clickX / width) * duration
}

// Event Listeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
music.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', setProgressBar)
