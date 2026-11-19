
document.addEventListener("DOMContentLoaded", () => {

  // PHOTO GALLERIES
  const childhoodGallery = document.getElementById("childhoodGallery");
  const adultGallery = document.getElementById("adultGallery");

  function createGallery(container, prefix, total) {
    if (!container) return;

    for (let i = 1; i <= total; i++) {
      const image = document.createElement("img");
      const number = String(i).padStart(2, "0");

      image.src = `assets/${prefix}-${number}.jpg`;
      image.alt = `Marizz ${prefix} photo ${i}`;
      image.className = "gallery-photo";
      image.loading = "lazy";

      image.addEventListener("error", () => {
        image.classList.add("image-missing");
      });

      container.appendChild(image);
    }
  }

  createGallery(childhoodGallery, "childhood", 3);
  createGallery(adultGallery, "adult", 16);


  // MUSIC PLAYER
  const song = document.getElementById("birthdaySong");
  const button = document.getElementById("musicButton");
  const icon = document.getElementById("musicIcon");

  if (!song || !button || !icon) {
    console.error("Music player elements are missing from tribute.html");
    return;
  }

  function updateIcon(playing) {
    icon.textContent = playing ? "Ⅱ" : "♫";
    button.title = playing ? "Pause music" : "Play music";
    button.setAttribute(
      "aria-label",
      playing ? "Pause favourite song" : "Play favourite song"
    );
  }

  button.addEventListener("click", async () => {
    console.log("Music button clicked");

    try {
      if (song.paused) {
        await song.play();
      } else {
        song.pause();
      }
    } catch (error) {
      console.error("Playback error:", error);
      alert("The song could not play. Please check mushin.mp3.");
    }
  });

  song.addEventListener("play", () => updateIcon(true));
  song.addEventListener("pause", () => updateIcon(false));

  song.addEventListener("error", () => {
    console.error("Audio loading error:", song.error);
    button.title = "Song could not be loaded";
  });

  // Attempt autoplay. Browsers may block it.
  song.play().catch(error => {
    console.log("Autoplay was blocked. Tap the music icon.", error);
    updateIcon(false);
  });

});
