document.addEventListener('DOMContentLoaded', () => {
    // Select all the feature cards
    const featureCards = document.querySelectorAll('.feature-card');

    // Create an Intersection Observer to watch when elements enter the screen
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the card is in the viewport, add the 'visible' class to trigger CSS animation
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once it has animated
                observer.unobserve(entry.target); 
            }
        });
    }, { 
        threshold: 0.1 // Trigger when 10% of the card is visible
    });

    // Attach the observer to each card
    featureCards.forEach(card => {
        observer.observe(card);
    });
});