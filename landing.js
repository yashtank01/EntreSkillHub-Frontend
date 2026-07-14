document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. TYPEWRITER EFFECT FOR TAGLINE
    // ==========================================
    const taglineElement = document.querySelector('.tagline');
    // This is the text that will be typed out!
    const textToType = "Turn your practical skills into a thriving micro-business with structured roadmaps and expert mentorship.";
    let charIndex = 0;

    // Set up the container and the blinking cursor
    taglineElement.innerHTML = '<span class="typed-text"></span><span class="typing-cursor">&nbsp;</span>';
    const textSpan = taglineElement.querySelector('.typed-text');

    function typeWriter() {
        if (charIndex < textToType.length) {
            textSpan.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 40); // 40ms delay per letter. Lower number = faster typing!
        } else {
            // Optional: Remove cursor when finished typing
            // document.querySelector('.typing-cursor').style.display = 'none';
        }
    }

    // Start the typing animation half a second after the page loads
    setTimeout(typeWriter, 500);


    // ==========================================
    // 2. SCROLL ANIMATION FOR STACKED CARDS
    // ==========================================
    const featureCards = document.querySelectorAll('.feature-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, { 
        threshold: 0.1 
    });

    featureCards.forEach(card => {
        observer.observe(card);
    });
});