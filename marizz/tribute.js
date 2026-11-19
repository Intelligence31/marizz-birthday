
document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // PHOTO GALLERIES
  // =====================================

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


  // =====================================
  // MUSIC PLAYER
  // =====================================

  const song = document.getElementById("birthdaySong");
  const button = document.getElementById("musicButton");
  const icon = document.getElementById("musicIcon");
  const musicHint = document.getElementById("musicHint");

  if (!song || !button || !icon) {
    console.error("Music player elements are missing from tribute.html");
    return;
  }

  function updateMusicButton(playing) {
    icon.textContent = playing ? "Ⅱ" : "♫";

    button.title = playing ? "Pause music" : "Play music";

    button.setAttribute(
      "aria-label",
      playing ? "Pause favourite song" : "Play favourite song"
    );
  }

  function hideMusicHint() {
    musicHint?.classList.add("hidden");
  }

  // Hide the prompt when the visitor taps the music button.
  button.addEventListener("click", async () => {
    hideMusicHint();

    try {
      if (song.paused) {
        await song.play();
      } else {
        song.pause();
      }
    } catch (error) {
      console.error("Music playback error:", error);
      alert("The song could not play. Please check that mushin.mp3 is uploaded correctly.");
    }
  });

  // Update the icon and hide the prompt when music starts.
  song.addEventListener("play", () => {
    updateMusicButton(true);
    hideMusicHint();
  });

  song.addEventListener("pause", () => {
    updateMusicButton(false);
  });

  song.addEventListener("error", () => {
    console.error("Audio loading error:", song.error);
    button.title = "Song could not be loaded";
  });

  // Attempt autoplay. iPhone and other browsers may block it.
  song.play().catch((error) => {
    console.log("Autoplay blocked. Visitor can tap the music button.", error);
    updateMusicButton(false);
  });

});
