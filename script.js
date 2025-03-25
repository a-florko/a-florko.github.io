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