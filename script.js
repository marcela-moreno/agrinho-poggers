const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score-val');
const timeDisplay = document.getElementById('time-val');
const btnStart = document.getElementById('btn-start');

let score = 0;
let timeLeft = 20;
let gameInterval;

// Itens do jogo: Emoji, Pontos
const elements = [
    { txt: '🌱', pts: 10 },
    { txt: '💧', pts: 10 },
    { txt: '🛸', pts: 20 }, // Drone
    { txt: '🔥', pts: -30 } // Evitar!
];

function spawnItem() {
    const item = document.createElement('div');
    const type = elements[Math.floor(Math.random() * elements.length)];
    
    item.className = 'item-jogo';
    item.innerText = type.txt;
    
    // Calcula posição aleatória dentro da área do jogo
    const posX = Math.random() * (gameArea.clientWidth - 50);
    const posY = Math.random() * (gameArea.clientHeight - 80) + 40;

    item.style.left = posX + 'px';
    item.style.top = posY + 'px';

    item.onclick = function() {
        score += type.pts;
        scoreDisplay.innerText = score;
        this.remove();
    };

    gameArea.appendChild(item);

    // Remove o item sozinho após 1.5 segundos se ninguém clicar
    setTimeout(() => { if(item) item.remove(); }, 1500);
}

function startGame() {
    score = 0;
    timeLeft = 20;
    scoreDisplay.innerText = score;
    timeDisplay.innerText = timeLeft;
    btnStart.style.display = 'none';

    gameInterval = setInterval(() => {
        spawnItem();
        timeLeft--;
        timeDisplay.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            gameActive = false;
            alert("Fim da Missão! Pontuação final: " + score);
            btnStart.style.display = 'block';
            btnStart.innerText = 'Tentar Novamente';
            // Limpa itens restantes
            document.querySelectorAll('.item-jogo').forEach(i => i.remove());
        }
    }, 1000);
}

btnStart.addEventListener('click', startGame);
