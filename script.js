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


// Registration Modal Logic
const overlay = document.getElementById('welcome-overlay');
const attendanceForm = document.getElementById('attendance-form');

// Check if user has already registered
if (localStorage.getItem('towdah_registered') === 'true') {
    overlay.classList.add('hidden');
} else {
    document.body.classList.add('modal-active');
}

attendanceForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (title && name && phone) {
        // Google Forms Submission URL
        const formID = "1FAIpQLSe8p-ShReD4eC0PAnZ_4Wm_rEsSge9mIP95-aWThAtOY_uBFA";
        const googleFormUrl = `https://docs.google.com/forms/d/e/${formID}/formResponse`;

        // Form Data
        const formData = new FormData();
        formData.append("entry.1914926805", title); // Title
        formData.append("entry.2140188385", name);  // Full Name
        formData.append("entry.639860921", phone);  // Phone Number

        // Function to finish the process (clean UI)
        const finishRegistration = () => {
            // Save to local storage so they don't see it again
            localStorage.setItem('towdah_registered', 'true');
            localStorage.setItem('towdah_user_name', name);

            // Hide overlay with animation
            overlay.classList.add('hidden');
            document.body.classList.remove('modal-active');

            // Optional: Reset form
            attendanceForm.reset();
        };

        // Submit to Google Forms
        // mode: 'no-cors' is required because Google doesn't send CORS headers. 
        // We can't see the response, but the data is sent.
        fetch(googleFormUrl, {
            method: "POST",
            mode: "no-cors",
            body: formData
        })
            .then(() => {
                console.log("Form submitted successfully!");
                finishRegistration();
            })
            .catch((error) => {
                console.error("Error submitting form:", error);
                // Even if there's an error (network etc), we usually let them in
                // or show an alert. For now, we'll let them in to avoid blocking.
                finishRegistration();
            });
    }
});
