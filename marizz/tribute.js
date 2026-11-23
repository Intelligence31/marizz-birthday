
document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // BUSINESS DETAILS
  // Replace these with her real details.
  // =====================================

  const BUSINESS = {
    name: "Her Business Name",

    description: "A short description of what her business offers.",

    // International format, digits only.
    // Example: 2348012345678
    whatsappNumber: "2348012345678",

    whatsappMessage:
      "Hello! I saw your business on your birthday tribute website and would love to make an enquiry."
  };


  const businessName = document.getElementById("businessName");
  const businessDescription = document.getElementById("businessDescription");
  const businessContact = document.getElementById("businessContact");

  if (businessName) {
    businessName.textContent = BUSINESS.name;
  }

  if (businessDescription) {
    businessDescription.textContent = BUSINESS.description;
  }

  if (businessContact) {

    const digits = BUSINESS.whatsappNumber.replace(/\D/g, "");

    if (digits && digits !== "2348012345678") {

      businessContact.href =
        `https://wa.me/${digits}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`;

    } else {

      businessContact.href = "#businessSection";

      businessContact.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Add her approved WhatsApp number in tribute.js first.");
      });

    }
  }


  // =====================================
  // PHOTO GALLERIES
  // =====================================

  const childhoodGallery =
    document.getElementById("childhoodGallery");

  const adultGallery =
    document.getElementById("adultGallery");


  function createGallery(container, prefix, total, label) {

    if (!container) return;

    for (let i = 1; i <= total; i++) {

      const image = document.createElement("img");

      const number = String(i).padStart(2, "0");

      image.src = `assets/${prefix}-${number}.jpg`;

      image.alt = `Marizz ${label} photo ${i}`;

      image.className = "gallery-photo";

      image.loading = "lazy";

      image.addEventListener("error", () => {
        image.classList.add("image-missing");
      });

      container.appendChild(image);

    }

  }


  createGallery(childhoodGallery, "childhood", 3, "childhood");

  createGallery(adultGallery, "adult", 16, "adult");


  // =====================================
  // ONE-TIME ENTRANCE CELEBRATION
  // =====================================

  const celebrationLayer =
    document.getElementById("celebrationLayer");

  const reducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  function launchCelebration() {

    if (!celebrationLayer || reducedMotion) return;

    const symbols = ["✿", "✽", "❀", "♡"];

    const colors = [
      "#b98ac5",
      "#e9a9a8",
      "#f2c3a5",
      "#d7b6e4",
      "#f4d9c9"
    ];

    const random = (min, max) =>
      Math.random() * (max - min) + min;


    for (let i = 0; i < 68; i++) {

      const item = document.createElement("span");

      let type;

      if (i < 9) {
        type = "balloon";
      } else if (i < 22) {
        type = "ribbon";
      } else if (i < 43) {
        type = "petal";
      } else {
        type = "confetti";
      }

      item.className = `fall-item ${type}`;

      item.style.setProperty("--x", `${random(0, 100)}vw`);

      item.style.setProperty("--duration", `${random(4.5, 8)}s`);

      item.style.setProperty("--delay", `${random(0, 1.5)}s`);

      item.style.setProperty("--drift", `${random(-100, 100)}px`);

      item.style.setProperty("--spin", `${random(-500, 500)}deg`);

      item.style.setProperty("--size", `${random(17, 31)}px`);

      item.style.setProperty(
        "--item-color",
        colors[Math.floor(random(0, colors.length))]
      );


      if (type === "petal" || type === "ribbon") {

        item.textContent =
          type === "petal"
            ? symbols[Math.floor(random(0, symbols.length))]
            : "〰";

      }

      celebrationLayer.appendChild(item);

    }


    // Remove decorations after the entrance celebration.

    window.setTimeout(() => {

      celebrationLayer.classList.add("finished");

      celebrationLayer.replaceChildren();

    }, 10500);

  }


  launchCelebration();


  // =====================================
  // MUSIC PLAYER
  // =====================================

  const song = document.getElementById("birthdaySong");

  const button = document.getElementById("musicButton");

  const icon = document.getElementById("musicIcon");

  const hint = document.getElementById("musicHint");


  if (!song || !button || !icon) return;


  function updateMusicButton(playing) {

    icon.textContent = playing ? "Ⅱ" : "♫";

    button.title = playing ? "Pause music" : "Play music";

    button.setAttribute(
      "aria-label",
      playing ? "Pause favourite song" : "Play favourite song"
    );

  }


  button.addEventListener("click", async () => {

    if (hint) {
      hint.classList.add("hidden");
    }

    try {

      if (song.paused) {
        await song.play();
      } else {
        song.pause();
      }

    } catch (error) {

      console.error("Music playback error:", error);

      alert(
        "The song could not play. Check that assets/mushin.mp3 is uploaded correctly."
      );

    }

  });


  song.addEventListener("play", () => {

    updateMusicButton(true);

    if (hint) {
      hint.classList.add("hidden");
    }

  });


  song.addEventListener("pause", () => {
    updateMusicButton(false);
  });


  song.addEventListener("error", () => {

    console.error("Audio loading error:", song.error);

    button.title = "Song could not be loaded";

  });


  // iPhone Safari may block autoplay.
  // The visitor can tap the music button.

  song.play().catch(() => {
    updateMusicButton(false);
  });

});
