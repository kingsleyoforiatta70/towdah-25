// Set the date we're counting down to: Jan 4, 2026 17:00:00
const countDownDate = new Date("Jan 4, 2026 17:00:00").getTime();

// Update the count down every 1 second
const x = setInterval(function () {

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the elements
    document.getElementById("days").innerHTML = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? '0' + seconds : seconds;

    // If the count down is finished, write some text and show the outline
    if (distance < 0) {
        clearInterval(x);
        document.querySelector(".countdown-container").innerHTML = "<h2>THE GATES ARE OPEN!</h2>";
        // Show the programme outline
        document.getElementById("programme-outline").style.display = "block";

        // Optionally scroll to it automatically after a short delay
        setTimeout(() => {
            document.getElementById("programme-outline").scrollIntoView({ behavior: 'smooth' });
        }, 1000);


    }
}, 1000);


// Scroll Animation
const reveal = document.querySelectorAll('.reveal');

window.addEventListener('scroll', checkReveal);

checkReveal(); // Trigger once on load

function checkReveal() {
    const triggerBottom = window.innerHeight / 5 * 4;

    reveal.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            box.classList.add('active');
        } else {
            box.classList.remove('active');
        }
    })
}


// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Animate hamburger to X (optional simple rotation)
    // For now simple toggle is fine
});

// Close menu when link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});
