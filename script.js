document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const lockScreen = document.getElementById('lockScreen');
    const mainScene = document.getElementById('mainScene');
    const nameInput = document.getElementById('nameInput');
    const unlockBtn = document.getElementById('unlockBtn');
    const errorMsg = document.getElementById('errorMsg');
    const photoCircle = document.getElementById('photoCircle');
    const proposalBtn = document.getElementById('proposalBtn');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicText = document.getElementById('musicText');
    
    // Correct unlock name
    const correctName = "budhu";
    
    // Photo configuration
    const photoCount = 12; // Number of photos in the circle
    const photoRadius = 40; // Percentage of container radius
    
    // Initialize
    createPhotoCircle();
    
    // Unlock button click event
    unlockBtn.addEventListener('click', unlockScreen);
    
    // Enter key in input field
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            unlockScreen();
        }
    });
    
    // Unlock function
    function unlockScreen() {
        const inputName = nameInput.value.trim().toLowerCase();
        
        if (inputName === correctName) {
            // Correct name
            errorMsg.textContent = "";
            lockScreen.classList.remove('active');
            
            // Show main scene after a brief delay
            setTimeout(() => {
                mainScene.classList.add('active');
                // Start playing music
                bgMusic.volume = 0.7;
                bgMusic.play().catch(e => {
                    console.log("Autoplay prevented. User interaction required.");
                    musicText.textContent = "Play Music";
                });
            }, 800);
        } else {
            // Wrong name
            errorMsg.textContent = "Sirf mera Budhu hi unlock kar sakta hai ❤️";
            errorMsg.style.color = "#ff99c2";
            
            // Shake animation for wrong input
            nameInput.style.animation = "shake 0.5s";
            setTimeout(() => {
                nameInput.style.animation = "";
            }, 500);
            
            // Clear input
            nameInput.value = "";
        }
    }
    
    // Create rotating photo circle
    function createPhotoCircle() {
        // Clear any existing photos
        photoCircle.innerHTML = "";
        
        // Calculate positions for photos in a circle
        for (let i = 0; i < photoCount; i++) {
            // Calculate angle for this photo
            const angle = (i / photoCount) * Math.PI * 2;
            
            // Calculate position (x, y) on the circle
            const x = 50 + photoRadius * Math.cos(angle);
            const y = 50 + photoRadius * Math.sin(angle);
            
            // Create photo element
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            
            // Calculate rotation for the photo to face the center
            const photoRotation = (angle * 180 / Math.PI) + 90;
            
            // Set position and rotation
            photoItem.style.left = `${x}%`;
            photoItem.style.top = `${y}%`;
            photoItem.style.transform = `translate(-50%, -50%) rotate(${photoRotation}deg)`;
            
            // Add image (using placeholder if actual photos don't exist)
            const img = document.createElement('img');
            
            // Try to load from photos folder, fallback to placeholder
            const photoNumber = (i % 8) + 1; // Cycle through p1.jpg to p8.jpg
            img.src = `photos/p${photoNumber}.jpeg`;
            img.alt = `Our memory ${i + 1}`;
            
            // Handle image loading error
            img.onerror = function() {
                // If photo doesn't exist, use a colored placeholder with heart icon
                this.src = '';
                this.onerror = null;
                photoItem.innerHTML = `<div class="placeholder-photo" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, #${((i*7)%256).toString(16).padStart(2,'0')}${((i*13)%256).toString(16).padStart(2,'0')}${((i*19)%256).toString(16).padStart(2,'0')}, #${((i*29)%256).toString(16).padStart(2,'0')}${((i*37)%256).toString(16).padStart(2,'0')}${((i*43)%256).toString(16).padStart(2,'0')});color:white;font-size:2rem;"><i class="fas fa-heart"></i></div>`;
            };
            
            photoItem.appendChild(img);
            photoCircle.appendChild(photoItem);
        }
    }
    
    // Proposal button click event
    proposalBtn.addEventListener('click', function() {
        // Create a romantic animation
        createHeartsAnimation();
        
        // Play romantic sound (if we had one)
        // Show the proposal message after a delay
        setTimeout(() => {
            // Create a custom alert modal
            const alertModal = document.createElement('div');
            alertModal.className = 'proposal-alert';
            alertModal.innerHTML = `
                <div class="alert-content">
                    <i class="fas fa-gem"></i>
                    <h2>She said YES! ❤️💍</h2>
                    <p>And this is just the beginning of our beautiful forever...</p>
                    <button id="closeAlert">Continue Our Story</button>
                </div>
            `;
            
            // Style the alert
            alertModal.style.position = 'fixed';
            alertModal.style.top = '0';
            alertModal.style.left = '0';
            alertModal.style.width = '100%';
            alertModal.style.height = '100%';
            alertModal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            alertModal.style.display = 'flex';
            alertModal.style.justifyContent = 'center';
            alertModal.style.alignItems = 'center';
            alertModal.style.zIndex = '100';
            
            document.body.appendChild(alertModal);
            
            // Style the alert content
            const alertContent = alertModal.querySelector('.alert-content');
            alertContent.style.background = 'linear-gradient(135deg, rgba(20,0,10,0.95), rgba(60,0,30,0.95))';
            alertContent.style.padding = '3rem';
            alertContent.style.borderRadius = '20px';
            alertContent.style.textAlign = 'center';
            alertContent.style.border = '2px solid #ff0064';
            alertContent.style.boxShadow = '0 0 50px rgba(255, 0, 100, 0.7)';
            alertContent.style.maxWidth = '500px';
            alertContent.style.width = '90%';
            
            // Style the icon
            alertContent.querySelector('.fa-gem').style.fontSize = '4rem';
            alertContent.querySelector('.fa-gem').style.color = '#ff0064';
            alertContent.querySelector('.fa-gem').style.marginBottom = '1.5rem';
            alertContent.querySelector('.fa-gem').style.animation = 'heartbeat 1.5s infinite';
            
            // Style the heading
            alertContent.querySelector('h2').style.fontFamily = "'Dancing Script', cursive";
            alertContent.querySelector('h2').style.fontSize = '2.8rem';
            alertContent.querySelector('h2').style.marginBottom = '1rem';
            alertContent.querySelector('h2').style.background = 'linear-gradient(45deg, #ff0064, #ff99c2)';
            alertContent.querySelector('h2').style.webkitBackgroundClip = 'text';
            alertContent.querySelector('h2').style.backgroundClip = 'text';
            alertContent.querySelector('h2').style.color = 'transparent';
            
            // Style the paragraph
            alertContent.querySelector('p').style.fontSize = '1.3rem';
            alertContent.querySelector('p').style.marginBottom = '2rem';
            alertContent.querySelector('p').style.color = '#ffccdd';
            
            // Style the button
            const closeBtn = alertContent.querySelector('#closeAlert');
            closeBtn.style.padding = '1rem 2rem';
            closeBtn.style.fontSize = '1.2rem';
            closeBtn.style.borderRadius = '50px';
            closeBtn.style.border = 'none';
            closeBtn.style.background = 'linear-gradient(45deg, #ff0064, #ff4d94)';
            closeBtn.style.color = 'white';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.transition = 'all 0.3s ease';
            closeBtn.style.fontWeight = 'bold';
            
            closeBtn.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 0 20px rgba(255, 0, 100, 0.7)';
            });
            
            closeBtn.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
            
            // Close button event
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(alertModal);
            });
        }, 1000);
    });
    
    // Create floating hearts animation
    function createHeartsAnimation() {
        for (let i = 0; i < 30; i++) {
            createHeart();
        }
    }
    
    // Create a single floating heart
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.fontSize = Math.random() * 30 + 20 + 'px';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.opacity = '0.9';
        heart.style.zIndex = '100';
        heart.style.pointerEvents = 'none';
        
        document.body.appendChild(heart);
        
        // Animation
        const animation = heart.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: `translateY(-${Math.random() * 300 + 100}px) scale(${Math.random() * 0.5 + 0.5})`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 2000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        // Remove heart after animation
        animation.onfinish = () => {
            document.body.removeChild(heart);
        };
    }
    
    // Music toggle functionality
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            musicText.textContent = "Music On";
            this.innerHTML = '<i class="fas fa-music"></i> <span id="musicText">Music On</span>';
        } else {
            bgMusic.pause();
            musicText.textContent = "Music Off";
            this.innerHTML = '<i class="fas fa-music"></i> <span id="musicText">Music Off</span>';
        }
    });
    
    // Auto-start music on user interaction (for browsers that block autoplay)
    document.body.addEventListener('click', function initAudio() {
        if (bgMusic.paused && mainScene.classList.contains('active')) {
            bgMusic.play().then(() => {
                musicText.textContent = "Music On";
            }).catch(e => {
                console.log("Audio play failed:", e);
            });
        }
        
        // Remove this event listener after first interaction
        document.body.removeEventListener('click', initAudio);
    });
    
    // Pause music when tab is not active
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            bgMusic.pause();
        } else if (mainScene.classList.contains('active') && !bgMusic.paused) {
            bgMusic.play().catch(e => console.log("Autoplay prevented"));
        }
    });
    
    // Add shake animation for wrong input
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(styleSheet);
});