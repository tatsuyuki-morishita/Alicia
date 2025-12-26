document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const paper = document.getElementById('paper');
    const greetingEl = document.getElementById('greeting');
    const bodyEl = document.getElementById('message-body');
    const signatureEl = document.getElementById('signature');
    const char1 = document.getElementById('char1');
    const char2 = document.getElementById('char2');
    const particlesContainer = document.getElementById('particles-container');

    // Falling Particles Logic
    function createParticle() {
        const particle = document.createElement('div');
        // Randomly choose between snowflake and maple leaf
        const isSnow = Math.random() > 0.3; // 70% snow, 30% maple

        particle.classList.add(isSnow ? 'snowflake' : 'maple-leaf');
        particle.innerHTML = isSnow ? '❄' : '🍁';

        // Random positioning and duration
        const startLeft = Math.random() * 100;
        const duration = Math.random() * 5 + 5; // 5-10s
        const size = Math.random() * 0.5 + 0.5; // 0.5x - 1x size

        particle.style.left = `${startLeft}vw`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.fontSize = `${size}rem`;
        particle.style.opacity = Math.random();

        particlesContainer.appendChild(particle);

        // Cleanup
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    // Start particles immediately
    setInterval(createParticle, 200);

    // Sample Content
    const greetingText = "Dearest Friend,";
    const bodyText = "I am so incredibly happy to welcome you to Toronto! It has been far too long, and I cannot wait to show you around this beautiful city. From the CN Tower to the hidden cafes, we are going to have an amazing time. \n\nGet ready for an unforgettable adventure!";
    const signatureText = "With love,\n[Your Name]";

    let isLetterOpen = false;

    // Open Letter Event
    envelope.addEventListener('click', () => {
        if (!isLetterOpen) {
            // 1. Open Flap
            envelope.classList.add('open');

            // 2. Slide Paper Out (Extract)
            setTimeout(() => {
                paper.classList.add('extracting');
            }, 600); // Wait for flap

            // 3. Unfold/Expand Paper to screen
            setTimeout(() => {
                paper.classList.remove('extracting');
                paper.classList.add('visible');

                // Show content immediately when paper is visible
                showContent();

            }, 1600); // Wait for slide out

            // Start animations
            setTimeout(() => {
                startCharacterAnimations();
            }, 2500);

            isLetterOpen = true;
        }
    });

    // Typewriter with Quill effect
    function showContent() {
        greetingEl.innerHTML = greetingText.replace(/\n/g, '<br>');
        bodyEl.innerHTML = bodyText.replace(/\n/g, '<br>');
        signatureEl.innerHTML = signatureText.replace(/\n/g, '<br>');
    }

    // Character Animation Logic
    function startCharacterAnimations() {
        const cont1 = document.getElementById('cont1');
        const char1 = document.getElementById('char1');
        const cont2 = document.getElementById('cont2');
        const char2 = document.getElementById('char2');

        // Styles for initial position (JS override not strictly needed if CSS matches, but good for safety)
        cont1.style.left = '0px';
        cont1.style.top = '20px'; // Slight offset

        cont2.style.left = '50px'; // Staggered start
        cont2.style.top = '50px';

        // Apply animations
        // Apply animations
        // Container gets the Path
        cont1.classList.add('walking-path');

        // Character gets the Action (Image/Flip/Bob)
        char1.classList.add('walking-action');

        // Delay second character
        setTimeout(() => {
            cont2.classList.add('walking-path');
            char2.classList.add('walking-action');
        }, 3000); // 3s delay so they aren't on top of each other

    }
});
