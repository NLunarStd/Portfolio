document.addEventListener('DOMContentLoaded', (event) => {
    
    const world = document.getElementById('world');
    const backgroundLayer = document.querySelector('.background-layer');
    const player = document.getElementById('player'); 
    const moveLeftBtn = document.getElementById('moveLeft');
    const moveRightBtn = document.getElementById('moveRight');


    let worldX = 0; 
    const WORLD_WIDTH = 11000; 
    const SCROLL_SPEED = 25; 
    let moveInterval = null;
    let currentDirection = null; 

    const CHECKPOINTS = [
        { id: 'item-32', element: document.getElementById('item-32'), triggerX: 1000 }, 
        { id: 'item-33', element: document.getElementById('item-33'), triggerX: 1600 },
        { id: 'item-34', element: document.getElementById('item-34'), triggerX: 2200 },
        { id: 'item-35', element: document.getElementById('item-35'), triggerX: 2800 },
        { id: 'item-36', element: document.getElementById('item-36'), triggerX: 3400 },
        { id: 'item-37', element: document.getElementById('item-37'), triggerX: 4000 },
        { id: 'item-38', element: document.getElementById('item-38'), triggerX: 4600 },
        { id: 'item-39', element: document.getElementById('item-39'), triggerX: 5200 },
        { id: 'item-40', element: document.getElementById('item-40'), triggerX: 5800 },
        { id: 'item-41', element: document.getElementById('item-41'), triggerX: 6400 },
        { id: 'item-42', element: document.getElementById('item-42'), triggerX: 7000 },
        { id: 'item-43', element: document.getElementById('item-43'), triggerX: 7600 },
        { id: 'item-44', element: document.getElementById('item-44'), triggerX: 8200 },
        { id: 'item-45', element: document.getElementById('item-45'), triggerX: 8800 },
        { id: 'item-46', element: document.getElementById('item-46'), triggerX: 9400 } 
    ];

    function setPlayerAnimation(direction, isMoving) {
        if (!player) return;
        
        player.classList.toggle('is-walking', isMoving);

        if (isMoving) {
            player.classList.toggle('facing-left', direction === 'left');
        }
    }

    function updateWorld(direction) {
        if (direction === 'left') {
            worldX += SCROLL_SPEED;
        } else if (direction === 'right') {
            worldX -= SCROLL_SPEED;
        }

        // Boundary Check
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
        
        //parallax effect
        if (backgroundLayer) {
             backgroundLayer.style.backgroundPositionX = `${worldX * 0.5}px`; 
        }
        
        checkTriggers();
    }
    
    const startMove = (direction) => {
        if (moveInterval || currentDirection === direction) return;
        
        currentDirection = direction;
        setPlayerAnimation(direction, true); 
        
        updateWorld(direction); 
        moveInterval = setInterval(() => updateWorld(direction), 50); 
    };

    const stopMove = (direction) => {
        if (currentDirection !== direction) return; 
        
        clearInterval(moveInterval);
        moveInterval = null;
        currentDirection = null;
        setPlayerAnimation(direction, false);
    };
    
    // check แสดง ตัว portfolio-item
    function checkTriggers() {
        const viewportCenter = window.innerWidth / 2;
        const activationRange = 300; 

        CHECKPOINTS.forEach(checkpoint => {
            const { element, triggerX } = checkpoint;
            
            if (!element) return; 

            const itemScreenPosition = triggerX + worldX;
            
            if (itemScreenPosition > viewportCenter - activationRange && 
                itemScreenPosition < viewportCenter + activationRange) 
            {
                element.classList.add('is-active');
            } else {
                element.classList.remove('is-active');
            }
        });
    }

    function addMovementListeners() {
        // Keyboard Controls
        document.addEventListener('keydown', (event) => {
            const key = event.key.toLowerCase(); 
            if (key === 'arrowleft' || key === 'a' || key ==='ฟ') {
                event.preventDefault(); 
                startMove('left');
            } 
            else if (key === 'arrowright' || key === 'd' || key ==='ก') {
                event.preventDefault();
                startMove('right');
            }
        });
        
        document.addEventListener('keyup', (event) => {
            const key = event.key.toLowerCase(); 
            if (key === 'arrowleft' || key === 'a' || key ==='ฟ') {
                stopMove('left');
            } 
            else if (key === 'arrowright' || key === 'd' || key ==='ก') {
                stopMove('right');
            }
        });

        // Button controls 
        if (moveLeftBtn && moveRightBtn) {
            let buttonInterval = null;
            let buttonDirection = null; 

            const startButtonMove = (direction) => {
                if (buttonInterval) return;
                buttonDirection = direction;
                setPlayerAnimation(direction, true);
                updateWorld(direction); 
                buttonInterval = setInterval(() => updateWorld(direction), 50); 
            };

            const stopButtonMove = (direction) => {
                if (buttonDirection !== direction) return;
                clearInterval(buttonInterval);
                buttonInterval = null;
                buttonDirection = null;
                setPlayerAnimation(direction, false);
            };

            moveLeftBtn.addEventListener('mousedown', () => startButtonMove('left'));
            moveLeftBtn.addEventListener('mouseup', () => stopButtonMove('left'));
            moveLeftBtn.addEventListener('mouseleave', () => stopButtonMove('left'));
            moveLeftBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startButtonMove('left'); }, {passive: false});
            moveLeftBtn.addEventListener('touchend', () => stopButtonMove('left'));

            moveRightBtn.addEventListener('mousedown', () => startButtonMove('right'));
            moveRightBtn.addEventListener('mouseup', () => stopButtonMove('right'));
            moveRightBtn.addEventListener('mouseleave', () => stopButtonMove('right'));
            moveRightBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startButtonMove('right'); }, {passive: false});
            moveRightBtn.addEventListener('touchend', () => stopButtonMove('right'));
        }
    }

    addMovementListeners();
    checkTriggers(); 
});