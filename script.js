document.addEventListener("DOMContentLoaded", function () {
    const sectionElements = document.querySelectorAll('section > *');

    const observerOptions = {
        threshold: 0.1
    };

    const fadeInOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sectionElements.forEach(element => {
        fadeInOnScroll.observe(element);
    });
});