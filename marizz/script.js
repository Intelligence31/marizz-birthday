document.addEventListener("DOMContentLoaded", () => {

// Mary Bitrus (Marizz)
// November 23, 2026 — 12:00 AM Nigerian time

const BIRTHDAY_DATE = new Date(
"2026-11-23T00:00:00+01:00"
).getTime();

const TRIBUTE_PAGE = "tribute.html";

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

let countdownInterval = null;

function openTributePage() {

if (countdownInterval !== null) {
clearInterval(countdownInterval);
}

window.location.replace(TRIBUTE_PAGE);
}

function updateCountdown() {

const now = Date.now();

const remaining = BIRTHDAY_DATE - now;

// Birthday has arrived or already passed.
// Always open the tribute page.
if (remaining <= 0) {
openTributePage();
return;
}

// Calculate countdown.
const days = Math.floor(
remaining / (1000 * 60 * 60 * 24)
);

const hours = Math.floor(
(remaining / (1000 * 60 * 60)) % 24
);

const minutes = Math.floor(
(remaining / (1000 * 60)) % 60
);

const seconds = Math.floor(
(remaining / 1000) % 60
);

// Update countdown display.
if (daysElement) {
daysElement.textContent = days;
}

if (hoursElement) {
hoursElement.textContent = String(hours).padStart(2, "0");
}

if (minutesElement) {
minutesElement.textContent = String(minutes).padStart(2, "0");
}

if (secondsElement) {
secondsElement.textContent = String(seconds).padStart(2, "0");
}

}

// Check immediately when Page 1 loads.
updateCountdown();

// Only run countdown while birthday is still approaching.
if (Date.now() < BIRTHDAY_DATE) {

countdownInterval = setInterval(
updateCountdown,
1000
);

}

});

