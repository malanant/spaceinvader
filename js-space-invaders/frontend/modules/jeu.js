const player = document.querySelector('#joueur');
const gameArea = document.querySelector('#game');
const playerWidth = player.offsetWidth;
const gameAreaWidth = gameArea.offsetWidth;
const projectileWidth = 2;
const projectileHeight = 20;
const projectileSpeed = 7;

let playerX = gameAreaWidth/2 - playerWidth/2;
let enTir = false;

const enemies = [];

function createAliens() {
    for (let i = 0; i < 5; i++) {
        const alien = document.createElement('div');
        alien.className = 'alien';
        alien.style.width = '20px';
        alien.style.height = '20px';
        alien.style.backgroundColor = 'green';
        alien.style.position = 'absolute';
        alien.style.left = `${i * 50}px`;
        alien.style.top = '50px';
        gameArea.appendChild(alien);

        enemies.push(alien);
    }
}

createAliens();


// Déplacer le joueur
function updateGameArea() {
    player.style.left = `${playerX}px`;
    requestAnimationFrame(updateGameArea);
}

// Déplacer le joueur
function startMoving(direction) {
    if (direction === 'left' && playerX > 0) {
        playerX -= 6;
    } else if (direction === 'right' && playerX < gameAreaWidth ) {
        playerX += 6;
    }
}

function fireProjectile(positionX = playerX) {
    const projectile = document.createElement('#ennemis');
    projectile.className = 'projectile';
    projectile.style.width = projectileWidth + 'px';
    projectile.style.height = projectileHeight + 'px';
    projectile.style.backgroundColor = 'white';
    projectile.style.position = 'absolute';
    projectile.style.left = positionX - projectileWidth / 2 + 'px';
    projectile.style.bottom = '30px'; // Starting position from the bottom of the game container
    projectile.style.zIndex = 10;


    gameArea.appendChild(projectile);

    // Déplacer le projectile vers le haut
    function moveProjectile() {
        const projectileBottom = parseInt(projectile.style.bottom);
        if (projectileBottom < gameArea.offsetHeight) {
            projectile.style.bottom = (projectileBottom + projectileSpeed) + 'px';
            requestAnimationFrame(moveProjectile);
        } else {
            // Supprimer le projectile une fois qu'il sort de la zone de jeu
            projectile.remove();
            enTir = false;
        }
    }

    moveProjectile();
}   

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' && playerX > 0) {
        startMoving('left');
    } else if (event.key === 'ArrowRight' && playerX < gameAreaWidth - playerWidth) {
        startMoving('right');
    }
    if (event.key === ' '  && enTir === false || event.key === 'Spacebar' && enTir === false) {
        fireProjectile(playerX + playerWidth / 2);
        enTir = true;
    }
});

// Arrêter le mouvement lorsque la touche est relâchée
document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    }
});

function createAliens(){
    
}

// Démarrer l'animation
updateGameArea();