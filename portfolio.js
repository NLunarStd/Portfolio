document.addEventListener('DOMContentLoaded', (event) => {
    
    const world = document.getElementById('world');
    const backgroundLayer = document.querySelector('.background-layer');
    const moveLeftBtn = document.getElementById('moveLeft');
    const moveRightBtn = document.getElementById('moveRight');
    const player = document.getElementById('player');
    const introScreen = document.getElementById('intro-screen');

    
    let worldX = 0; 
    const WORLD_WIDTH = 20500; 
    const SCROLL_SPEED = 25; 
    let hasStarted = false; 
    let currentActiveNavId = '';

    const backgroundMusic = new Audio('audio/bg_music.mp3'); 
    backgroundMusic.loop = true; 
    
    const CHECKPOINTS = [
    // ABOUT ME 
    { id: 'item-1', element: document.getElementById('item-1'), triggerX: 1000 }, 
    { id: 'item-2', element: document.getElementById('item-2'), triggerX: 1600 },
    { id: 'item-3', element: document.getElementById('item-3'), triggerX: 2800 },
    
    // HOBBY 
    { id: 'item-4', element: document.getElementById('item-4'), triggerX: 3400 }, // MY HOBBY (Start of Section)
    { id: 'item-5', element: document.getElementById('item-5'), triggerX: 4000 }, // GAME
    { id: 'item-6', element: document.getElementById('item-6'), triggerX: 4600 }, 
    { id: 'item-7', element: document.getElementById('item-7'), triggerX: 5200 }, 
    { id: 'item-8', element: document.getElementById('item-8'), triggerX: 5800 }, 
    { id: 'item-9', element: document.getElementById('item-9'), triggerX: 6400 }, // MUSIC
    { id: 'item-10', element: document.getElementById('item-10'), triggerX: 7000 },
    { id: 'item-11', element: document.getElementById('item-11'), triggerX: 7600 },
    { id: 'item-12', element: document.getElementById('item-12'), triggerX: 8200 },
    { id: 'item-13', element: document.getElementById('item-13'), triggerX: 8800 }, // PHOTOGRAPHING
    { id: 'item-14', element: document.getElementById('item-14'), triggerX: 9400 },
    { id: 'item-15', element: document.getElementById('item-15'), triggerX: 10000 },
    { id: 'item-16', element: document.getElementById('item-16'), triggerX: 10600 }, // Bridge Photo
    { id: 'item-17', element: document.getElementById('item-17'), triggerX: 11200 }, // 3D MODELING (H2)
    { id: 'item-18', element: document.getElementById('item-18'), triggerX: 11800 }, // Room
    { id: 'item-19', element: document.getElementById('item-19'), triggerX: 12400 }, // Character
    { id: 'item-20', element: document.getElementById('item-20'), triggerX: 13000 }, // CryoChamber
    
    // MY SKILLS
    { id: 'item-21', element: document.getElementById('item-21'), triggerX: 13600 }, // MY SKILLS (H2)
    { id: 'item-22', element: document.getElementById('item-22'), triggerX: 14200 }, // HARD SKILLS
    { id: 'item-23', element: document.getElementById('item-23'), triggerX: 14800 }, // SOFT SKILLS
    
    // INTERESTS 
    { id: 'item-24', element: document.getElementById('item-24'), triggerX: 15400 }, // MY INTERESTS (H2)
    { id: 'item-25', element: document.getElementById('item-25'), triggerX: 16000 },
    { id: 'item-26', element: document.getElementById('item-26'), triggerX: 16600 },
    { id: 'item-27', element: document.getElementById('item-27'), triggerX: 17200 },
    { id: 'item-28', element: document.getElementById('item-28'), triggerX: 17800 },
          
    // MY PROJECTS 
    { id: 'item-29', element: document.getElementById('item-29'), triggerX: 18400 }, // MY PROJECTS (H2)
    { id: 'item-30', element: document.getElementById('item-30'), triggerX: 19000 }, // Project List
    
    // CONTACT 
    { id: 'item-31', element: document.getElementById('item-31'), triggerX: 19600 }  // CONTACT ME
    ];
    
    // ควบคุมการเคลื่อนที่
    function updateWorld(direction) {
        if (direction === 'left') {
            worldX += SCROLL_SPEED;
        } else if (direction === 'right') {
            worldX -= SCROLL_SPEED;
        }

        if (worldX > 0) {
            worldX = 0;
        }
        
        const maxScroll = -(WORLD_WIDTH - window.innerWidth);
        if (worldX < maxScroll) {
            worldX = maxScroll;
        }

        if (world) {
            world.style.transform = `translateX(${worldX}px)`;
        }
        
        if (backgroundLayer) {
             backgroundLayer.style.backgroundPositionX = `${worldX}px`;
        }
        
        if (player) {
            player.style.backgroundImage = "url('images/Chara_Walk-Sheet.png')";
            player.style.backgroundPosition = "0px -256px"; 

            player.classList.add('is-walking'); 
            
            if (direction === 'right') {
                player.classList.remove('facing-left'); 
             } else if (direction === 'left') {
                 player.classList.add('facing-left');
             }
        }
        checkTriggers();
        updateNavbarHighlight(); 
    }

    // ตรวจสอบ Trigger 
    function checkTriggers() {
        const playerCenter = window.innerWidth / 2;
        const activationRange = 300; 

        CHECKPOINTS.forEach(checkpoint => {
            const { element, triggerX } = checkpoint;
            
            if (!element) return; 

            const checkpointScreenPosition = triggerX + worldX;
            
            if (checkpointScreenPosition > playerCenter - activationRange && 
                checkpointScreenPosition < playerCenter + activationRange) 
            {
                element.classList.add('is-active');
            } else {
                element.classList.remove('is-active');
            }
        });
    }

    // Navbar Highlight 
    function updateNavbarHighlight() {
        const sectionMapping = {
            // ABOUT ME (Target Link: #item-1)
            'item-1': 'item-1', 'item-2': 'item-1', 'item-3': 'item-1',
            
            // HOBBY Group (Target Link: #item-4)
            'item-4': 'item-4', 'item-5': 'item-4', 'item-6': 'item-4', 'item-7': 'item-4', 
            'item-8': 'item-4', 'item-9': 'item-4', 'item-10': 'item-4', 'item-11': 'item-4', 
            'item-12': 'item-4', 'item-13': 'item-4', 'item-14': 'item-4', 'item-15': 'item-4', 
            'item-16': 'item-4', 'item-17': 'item-4', 'item-18': 'item-4', 'item-19': 'item-4',
            'item-20': 'item-4', 
            
            // MY SKILLS (Target Link: #item-21)
            'item-21': 'item-21', 'item-22': 'item-21', 'item-23': 'item-21',
            
            // INTERESTS (Target Link: #item-24) 
            'item-24': 'item-24', 'item-25': 'item-24', 'item-26': 'item-24', 'item-27': 'item-24', 'item-28': 'item-24',
            
            // MY PROJECTS (Target Link: #item-29)
            'item-29': 'item-29',
            'item-30': 'item-29', 

            // CONTACT (Target Link: #item-31)
            'item-31': 'item-31' 
        };

        const playerCenter = window.innerWidth / 2;
        const navActivationRange = 500; 
        let currentCheckpointId = ''; 

       
        for (let i = CHECKPOINTS.length - 1; i >= 0; i--) {
            const checkpoint = CHECKPOINTS[i];
            const checkpointScreenPosition = checkpoint.triggerX + worldX;
            
            if (checkpointScreenPosition < playerCenter + navActivationRange) {
                currentCheckpointId = checkpoint.id;
                break; 
            }
        }
        
        
        let newActiveId = sectionMapping[currentCheckpointId] || ''; 

        
        if (worldX >= 0 || !newActiveId) {
            newActiveId = 'item-1';
        }

        
        if (newActiveId !== currentActiveNavId) {
            
            const oldLink = document.querySelector(`.navbar a[href="#${currentActiveNavId}"]`);
            if (oldLink) {
                oldLink.classList.remove('is-nav-active');
            }

            
            const newLink = document.querySelector(`.navbar a[href="#${newActiveId}"]`);
            if (newLink) {
                newLink.classList.add('is-nav-active');
            }

            currentActiveNavId = newActiveId;
        }
    }


    function jumpToItem(targetId) {
       
        const targetCheckpointId = targetId;
        const targetCheckpoint = CHECKPOINTS.find(cp => cp.id === targetCheckpointId);
        
        if (targetId === 'item-29') {
             window.open('/project.html', '_blank');
             return;
        }

        if (!targetCheckpoint) {
             console.error(`Checkpoint not found for ID: ${targetId}`);
             return;
        }
        
        const targetX = targetCheckpoint.triggerX;
        const playerCenter = window.innerWidth / 2;
        let newWorldX = -(targetX - playerCenter);
        
        const maxScroll = -(WORLD_WIDTH - window.innerWidth);
        
        if (newWorldX > 0) {
            newWorldX = 0;
        } else if (newWorldX < maxScroll) {
            newWorldX = maxScroll;
        }
        
        worldX = newWorldX;
        if (world) {
            world.style.transform = `translateX(${worldX}px)`;
        }
        
        checkTriggers();
        updateNavbarHighlight(); 
    }


    
    function addMovementListeners() {
        document.addEventListener('keydown', (event) => {
            const key = event.key.toLowerCase(); 
    if (document.activeElement.tagName === 'BUTTON') {
                    document.activeElement.blur(); 
                }
                
            if (key === 'arrowleft' || key === 'a' || key ==='ฟ') {
                updateWorld('left');
            } 
            else if (key === 'arrowright' || key === 'd' || key ==='ก') {
                updateWorld('right');
            }
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();
            }
        });
        document.addEventListener('keyup', (event) => {
            const key = event.key.toLowerCase(); 
            if (player && (key === 'arrowleft' || key === 'a' || key === 'arrowright' || key === 'd')) {
                player.classList.remove('is-walking'); 
                player.style.backgroundImage = "url('images/Chara_Idle-Sheet.png')";
                player.style.backgroundPosition = "0px -256px"; 
            }
        });
        if (moveLeftBtn && moveRightBtn) {
            moveLeftBtn.addEventListener('mousedown', () => updateWorld('left'));
            moveLeftBtn.addEventListener('mouseup', () => {
                player.classList.remove('is-walking'); 
                player.style.backgroundImage = "url('images/Chara_Idle-Sheet.png')";
                player.style.backgroundPosition = "0px -256px"; 
            });
            moveRightBtn.addEventListener('mousedown', () => updateWorld('right'));
            moveRightBtn.addEventListener('mouseup', () => {
                player.classList.remove('is-walking'); 
                player.style.backgroundImage = "url('images/Chara_Idle-Sheet.png')";
                player.style.backgroundPosition = "0px -256px"; 
            });
        }
    }


    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1); 
            jumpToItem(targetId);
        });
    });

    
    function startGame() {
        if (hasStarted) return;
        hasStarted = true;

        if (introScreen) {
            introScreen.style.transform = 'translateY(-100vh)';
            setTimeout(() => {
                introScreen.remove();
            }, 1000); 
        }

        backgroundMusic.play().catch(error => {
            console.warn("Audio playback failed. Check the file path or Autoplay policy.");
        });

         addMovementListeners(); 
        
        checkTriggers();
        updateNavbarHighlight(); 

        document.removeEventListener('keyup', startGame); 
        document.removeEventListener('click', startGame); 
    }

    document.addEventListener('keyup', startGame); 
    document.addEventListener('click', startGame); 
});