function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = '';
}

document.getElementById('burger').addEventListener('change', function() {
    const navMenu = document.querySelector('.nav-menu');

    if (this.checked) {
        navMenu.classList.add('nav-mobile-menu');
        disableScroll();
    } else {
        navMenu.classList.remove('nav-mobile-menu');
        enableScroll();
    }
});

const burger = document.getElementById('burger');
const navMenu = document.querySelector('.nav-menu');

// Add click event to each anchor link in the nav menu
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function(event) {
        burger.checked = false;

        navMenu.classList.remove('nav-mobile-menu');
        enableScroll();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const sectionElements = document.querySelectorAll('section > *');

    // Observer options
    const observerOptions = {
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const fadeInOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); // Add fade-in class when in view
                observer.unobserve(entry.target); // Stop observing once it has faded in
            }
        });
    }, observerOptions);

    sectionElements.forEach(element => {
        fadeInOnScroll.observe(element);
    });
});