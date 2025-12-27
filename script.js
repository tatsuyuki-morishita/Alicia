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
    const greetingText = "Dear Alicia,";
    const bodyText = "I am so incredibly happy to welcome you to Toronto! It has been far too long, and I cannot wait to show you around this beautiful city. From the CN Tower to the hidden cafes, we are going to have an amazing time. \n\nGet ready for an unforgettable adventure!";
    const signatureText = "Warmly,\nTatsuyuki";

    let isLetterOpen = false;

    // Open Letter Event
    // TARGET DATE: Change this to controls when the letter can be opened
    const TARGET_DATE = new Date('2025-12-30T00:00:00');

    envelope.addEventListener('click', () => {
        const now = new Date();

        if (!isLetterOpen) {
            if (now < TARGET_DATE) {
                // Too early!
                envelope.classList.add('shake');

                // Optional: visual feedback text
                const originalSealText = document.querySelector('.seal').innerText;
                document.querySelector('.seal').innerText = "Not Yet!";

                setTimeout(() => {
                    envelope.classList.remove('shake');
                    document.querySelector('.seal').innerText = originalSealText;
                }, 500); // 0.5s matches CSS animation

                return; // STOP here
            }
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
    // Typewriter effect
    function typeWriter(text, element, speed = 30, callback) {
        // Quill reference
        const quill = document.getElementById('quill');
        let i = 0;
        element.innerHTML = "";

        if (quill) quill.classList.add('writing');

        function type() {
            if (i < text.length) {
                const char = text.charAt(i);
                if (char === '\n') {
                    element.innerHTML += '<br>';
                } else {
                    // Create a span to get position
                    const span = document.createElement('span');
                    span.textContent = char;
                    element.appendChild(span);

                    // Move Quill to this span
                    if (quill) {
                        const rect = span.getBoundingClientRect();
                        // Offset to place quill tip at end of letter
                        quill.style.left = `${rect.right}px`;
                        // -5px offset for hot spot usually at bottom-left of image if transform-origin is bottom
                        quill.style.top = `${rect.top - 60}px`;
                    }
                }
                i++;
                // Randomize speed slightly for realism
                const randomSpeed = speed + (Math.random() * 20 - 10);
                setTimeout(type, randomSpeed);
            } else {
                if (quill) quill.classList.remove('writing');
                if (callback) callback();
            }
        }
        type();
    }

    function showContent() {
        // Clear content initially
        greetingEl.innerHTML = "";
        bodyEl.innerHTML = "";
        signatureEl.innerHTML = "";

        // Start typing sequence
        typeWriter(greetingText, greetingEl, 50, () => {
            setTimeout(() => {
                typeWriter(bodyText, bodyEl, 30, () => {
                    setTimeout(() => {
                        typeWriter(signatureText, signatureEl, 40);
                    }, 300);
                });
            }, 300);
        });
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
        // Character gets the Action (Image/Flip/Bob)
        // Note: Direction is now handled by JS loop below to ensure Safari compatibility
        char1.classList.add('walking-action');
        char2.classList.add('walking-action');

        // Start Random Walk for Char 1 
        // Initialize positions explicitly side-by-side
        // Match CSS: 20vw (0.2) and 80vw (0.8) - 100px width for symmetry
        cont1.style.transform = `translate(${window.innerWidth * 0.2}px, ${window.innerHeight * 0.5}px)`;
        cont2.style.transform = `translate(${window.innerWidth * 0.8 - 100}px, ${window.innerHeight * 0.5}px)`;
        // Ensure they face inward (Symmetric)
        char1.classList.remove('dir-front');
        char1.classList.add('dir-right'); // Left char faces Right
        char1.classList.remove('dir-front');
        char1.classList.add('dir-right'); // Left char faces Right

        char2.classList.remove('dir-front');
        char2.classList.add('dir-left');  // Right char faces Left

        // Wait 3 seconds before starting the random walk so they stay side-by-side initially
        setTimeout(() => {
            // Start Random Walk for Char 1
            startRandomWalk(cont1, char1, window.innerWidth * 0.2, window.innerHeight * 0.5);
        }, 3000);

        setTimeout(() => {
            // Start Random Walk for Char 2
            startRandomWalk(cont2, char2, window.innerWidth * 0.8 - 100, window.innerHeight * 0.5);
        }, 3000);


        function startRandomWalk(container, character, startX, startY) {
            // Initial Pos - Check for undefined specifically, as 0 is valid
            let currentX = (startX !== undefined) ? startX : Math.random() * (window.innerWidth - 100);
            let currentY = (startY !== undefined) ? startY : Math.random() * (window.innerHeight - 150);

            container.style.transform = `translate(${currentX}px, ${currentY}px)`;

            function walkToNewPoint() {
                // Pick random destination
                const nextX = Math.random() * (window.innerWidth - 100);
                const nextY = Math.random() * (window.innerHeight - 150);

                // Calculate distance to determine duration (constant speed)
                const dx = nextX - currentX;
                const dy = nextY - currentY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const speed = 100; // pixels per second (adjust for speed)
                const duration = distance / speed;

                // Determine Direction
                character.classList.remove('dir-right', 'dir-front', 'dir-left', 'dir-back');

                // Simple direction logic: mainly horizontal or vertical?
                if (Math.abs(dx) > Math.abs(dy)) {
                    // Horizontal
                    if (dx > 0) character.classList.add('dir-right');
                    else character.classList.add('dir-left');
                } else {
                    // Vertical
                    if (dy > 0) character.classList.add('dir-front'); // Down
                    else character.classList.add('dir-back'); // Up
                }

                // Apply Transition
                container.style.transition = `transform ${duration}s linear`;
                // Force reflow
                void container.offsetWidth;

                // Move
                container.style.transform = `translate(${nextX}px, ${nextY}px)`;

                // Update current for next step
                currentX = nextX;
                currentY = nextY;

                // Next walk after this one finishes
                setTimeout(walkToNewPoint, duration * 1000);
            }

            // Start first walk shortly
            setTimeout(walkToNewPoint, 100);
        }

    }
});
