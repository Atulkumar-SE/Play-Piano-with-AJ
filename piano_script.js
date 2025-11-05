const pianoKeys = document.querySelectorAll(".piano_keys .key");
volumeSlider = document.querySelector(".volume_slidebar input");
keys_checkbox = document.querySelector(".keys_checkbox input");

let allKeys = [],
  audio = new Audio("tunes/notes_A.mp3");
const playTune = (key) => {
  audio.src = `tunes/${key}.wav`;
  audio.play();
  // console.log(allKeys)

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};
pianoKeys.forEach((key) => {
  allKeys.push(key.dataset.key);
  key.addEventListener("click", () => playTune(key.dataset.key));
});
const handleVolume = (e) => {
  audio.volume = e.target.value;
};
const showHideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};
const pressedKey = (e) => {
  if (allKeys.includes(e.key)) playTune(e.key);
};

keys_checkbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);

// ==================== 🎵 Auto Play Songs ====================

// Song Note Patterns
const jingleBellsNotes = [
  { key: "g", time: 400 },
  { key: "g", time: 400 },
  { key: "g", time: 800 },
  { key: "g", time: 400 },
  { key: "g", time: 400 },
  { key: "g", time: 800 },
  { key: "g", time: 400 },
  { key: "j", time: 400 },
  { key: "d", time: 400 },
  { key: "h", time: 400 },
  { key: "g", time: 1200 },
  { key: "a", time: 400 },
  { key: "a", time: 400 },
  { key: "a", time: 400 },
  { key: "a", time: 400 },
  { key: "a", time: 400 },
  { key: "g", time: 400 },
  { key: "g", time: 400 },
  { key: "g", time: 800 },
  { key: "j", time: 400 },
  { key: "d", time: 400 },
  { key: "h", time: 400 },
  { key: "g", time: 1600 },
];

const happyBirthdayNotes = [
  { key: "g", time: 400 },
  { key: "g", time: 400 },
  { key: "h", time: 800 },
  { key: "g", time: 800 },
  { key: "k", time: 800 },
  { key: "j", time: 1600 },
  { key: "g", time: 400 },
  { key: "g", time: 400 },
  { key: "h", time: 800 },
  { key: "g", time: 800 },
  { key: "l", time: 800 },
  { key: "k", time: 1600 },
  { key: "g", time: 400 },
  { key: "g", time: 400 },
  { key: "j", time: 800 },
  { key: "h", time: 800 },
  { key: "k", time: 800 },
  { key: "j", time: 800 },
  { key: "h", time: 1600 },
];

const twinkleNotes = [
  { key: "g", time: 400 },
  { key: "g", time: 400 },
  { key: "d", time: 400 },
  { key: "d", time: 400 },
  { key: "h", time: 400 },
  { key: "h", time: 400 },
  { key: "d", time: 800 },
  { key: "f", time: 400 },
  { key: "f", time: 400 },
  { key: "j", time: 400 },
  { key: "j", time: 400 },
  { key: "k", time: 400 },
  { key: "k", time: 400 },
  { key: "j", time: 800 },
  { key: "g", time: 400 },
  { key: "g", time: 400 },
  { key: "d", time: 400 },
  { key: "d", time: 400 },
  { key: "h", time: 400 },
  { key: "h", time: 400 },
  { key: "d", time: 800 },
];

// ==================== 🎵 Auto Play Songs with Play/Pause and Switch ====================

let songPlaying = false;
let currentTimeouts = [];
let currentSongNotes = [];

function playSong(songNotes) {
  stopCurrentSong(); // stop any currently playing song
  songPlaying = true;
  currentSongNotes = songNotes;
  document.querySelector(".auto_play_btn").textContent = "Pause Song";

  let index = 0;
  const playNext = () => {
    if (!songPlaying) return;
    if (index >= songNotes.length) {
      stopCurrentSong();
      return;
    }

    const note = songNotes[index];
    if (allKeys.includes(note.key)) playTune(note.key);
    const timeout = setTimeout(playNext, note.time);
    currentTimeouts.push(timeout);
    index++;
  };
  playNext();
}

function stopCurrentSong() {
  currentTimeouts.forEach(clearTimeout);
  currentTimeouts = [];
  songPlaying = false;
  document.querySelector(".auto_play_btn").textContent = "Play Song";
}

const songSelector = document.querySelector(".song_selector");
const playButton = document.querySelector(".auto_play_btn");

playButton.addEventListener("click", () => {
  const selectedSong = songSelector.value;
  let notesToPlay;

  if (selectedSong === "jingle") notesToPlay = jingleBellsNotes;
  else if (selectedSong === "birthday") notesToPlay = happyBirthdayNotes;
  else if (selectedSong === "twinkle") notesToPlay = twinkleNotes;

  if (
    songPlaying &&
    JSON.stringify(notesToPlay) === JSON.stringify(currentSongNotes)
  ) {
    stopCurrentSong(); // toggle pause
  } else {
    playSong(notesToPlay);
  }
});

songSelector.addEventListener("change", () => {
  if (songPlaying) {
    const selectedSong = songSelector.value;
    stopCurrentSong();

    let notesToPlay;
    if (selectedSong === "jingle") notesToPlay = jingleBellsNotes;
    else if (selectedSong === "birthday") notesToPlay = happyBirthdayNotes;
    else if (selectedSong === "twinkle") notesToPlay = twinkleNotes;

    playSong(notesToPlay);
  }
});
