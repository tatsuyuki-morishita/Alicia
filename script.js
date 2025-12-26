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
        // Apply animations
        // Apply animations
        // Container gets the Path
        cont1.classList.add('walking-path');

        // Character gets the Action (Image/Flip/Bob)
        // Note: Direction is now handled by JS loop below to ensure Safari compatibility
        char1.classList.add('walking-action');

        // Delay second character
        setTimeout(() => {
            cont2.classList.add('walking-path');
            char2.classList.add('walking-action');
            // Sync direction loop for char2 (offset by 3s in logic if needed, but path is continuous)
            // Actually, if we start the interval for both, they follow the same absolute time if path starts same time.
            // But cont2 starts 3s later. 
            // Simplified: The path animation handles position. The direction class handles image.
            // Since cont2 starts 3s later, its "0%" is 3s behind.
            // So we need separate timers or logic.
            startDirectionLoop(char2);
        }, 3000);

        startDirectionLoop(char1);

        function startDirectionLoop(element) {
            const directions = ['dir-right', 'dir-front', 'dir-left', 'dir-back'];
            let currentDir = 0;

            // Function to set direction
            const setDir = () => {
                element.classList.remove(...directions);
                element.classList.add(directions[currentDir]);
                currentDir = (currentDir + 1) % 4;
            };

            // Set initial immediately
            setDir();

            // Change every 5000ms (25% of 20s)
            setInterval(setDir, 5000);
        }

    }
});
