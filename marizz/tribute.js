
document.addEventListener("DOMContentLoaded", () => {

  // PHOTO GALLERIES

  function createGallery(galleryId, prefix, total) {
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;

    gallery.innerHTML = "";

    for (let i = 1; i <= total; i++) {
      const image = document.createElement("img");
      const number = String(i).padStart(2, "0");

      image.src = `assets/${prefix}-${number}.jpg`;
      image.alt = `${prefix} photograph ${i}`;
      image.loading = "lazy";

      image.onerror = () => {
        image.style.display = "none";
      };

      gallery.appendChild(image);
    }
  }

  createGallery("childhoodGallery", "childhood", 3);
  createGallery("adultGallery", "adult", 16);


  // BIRTHDAY ENTRANCE CELEBRATION

  function startCelebration() {
    const layer = document.getElementById("celebrationLayer");

    if (!layer ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    layer.innerHTML = "";

    const decorations = [
      { symbol: "🎈", className: "balloon", count: 9 },
      { symbol: "🎀", className: "ribbon", count: 13 },
      { symbol: "🌸", className: "petal", count: 21 },
      { symbol: "✦", className: "confetti", count: 25 }
    ];

    decorations.forEach(({ symbol, className, count }) => {
      for (let i = 0; i < count; i++) {
        const item = document.createElement("span");

        item.className = `fall-item ${className}`;
        item.textContent = symbol;
        item.style.left = `${Math.random() * 100}%`;
        item.style.animationDuration = `${4.5 + Math.random() * 3.5}s`;
        item.style.animationDelay = `${Math.random() * 1.5}s`;

        layer.appendChild(item);
      }
    });

    setTimeout(() => {
      layer.innerHTML = "";
    }, 10500);
  }

  startCelebration();


  // MUSIC PLAYER

  const musicButton = document.getElementById("musicButton");
  const musicIcon = document.getElementById("musicIcon");
  const musicHint = document.getElementById("musicHint");

  const birthdayMusic = new Audio("assets/mushin.mp3");
  birthdayMusic.loop = true;
  birthdayMusic.volume = 0.7;

  function updateMusicButton(isPlaying) {
    if (musicIcon) {
      musicIcon.textContent = isPlaying ? "Ⅱ" : "♫";
    }

    if (musicButton) {
      musicButton.setAttribute(
        "aria-label",
        isPlaying ? "Pause music" : "Play music"
      );
    }
  }

  async function playBirthdayMusic() {
    try {
      await birthdayMusic.play();
      updateMusicButton(true);

      if (musicHint) {
        musicHint.style.display = "none";
      }
    } catch (error) {
      updateMusicButton(false);
    }
  }

  if (musicButton) {
    musicButton.addEventListener("click", async () => {
      if (birthdayMusic.paused) {
        await playBirthdayMusic();
      } else {
        birthdayMusic.pause();
        updateMusicButton(false);
      }
    });
  }

  // Browsers may block autoplay until the visitor interacts.
  playBirthdayMusic();

  birthdayMusic.addEventListener("ended", () => {
    updateMusicButton(false);
  });

});
