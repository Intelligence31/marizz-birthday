document.addEventListener("DOMContentLoaded", () => {

/* =================================
PHOTO GALLERY
================================= */

const childhoodGallery =
document.getElementById("childhoodGallery");

const adultGallery =
document.getElementById("adultGallery");


function createGalleryImages(container, prefix, total) {

for (let i = 1; i <= total; i++) {

const image = document.createElement("img");

const number = String(i).padStart(2, "0");

image.src = `assets/${prefix}-${number}.jpg`;

image.alt = prefix === "childhood"
? `Marizz childhood photograph ${i}`
: `Marizz photograph ${i}`;

image.className = "gallery-photo";

image.loading = "lazy";

image.addEventListener("error", () => {
image.classList.add("image-missing");
});

container.appendChild(image);

}

}


createGalleryImages(
childhoodGallery,
"childhood",
3
);

createGalleryImages(
adultGallery,
"adult",
16
);


/* =================================
BIRTHDAY MUSIC
================================= */

const song =
document.getElementById("birthdaySong");

const musicButton =
document.getElementById("musicButton");

const musicIcon =
document.getElementById("musicIcon");


function updateMusicButton(isPlaying) {

musicIcon.textContent = isPlaying ? "Ⅱ" : "♫";

musicButton.setAttribute(
"aria-label",
isPlaying
? "Pause favourite song"
: "Play favourite song"
);

musicButton.title = isPlaying
? "Pause music"
: "Play music";

}


async function playSong() {

try {

await song.play();

updateMusicButton(true);

} catch (error) {

// Browser may block autoplay.
// The floating music icon remains available.

updateMusicButton(false);

}

}


musicButton.addEventListener("click", async () => {

if (song.paused) {

await playSong();

} else {

song.pause();

updateMusicButton(false);

}

});


// Attempt to play Mushin when the birthday page opens.
playSong();


song.addEventListener("play", () => {
updateMusicButton(true);
});


song.addEventListener("pause", () => {
updateMusicButton(false);
});


song.addEventListener("error", () => {

musicButton.disabled = true;

musicButton.title = "Music unavailable";

musicButton.setAttribute(
"aria-label",
"Music unavailable"
);

});

});

