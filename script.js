const container = document.getElementById('game-container');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('overlay');

let score = 0;
let time = 30;
let gameActive = false;

const targets = [
    { icon: '🌿', pts: 10 }, // Soja
    { icon: '🌱', pts: 10 }, // Broto
    { icon: '🛸', pts: 25 }, // Drone Tech
    { icon: '🐛', pts: -20 }, // Praga
    { icon: '🔥', pts: -50 }  // Queimada
];

function createTarget() {
    if (!gameActive) return;

    const data = targets[Math.floor(Math.random() * targets.length)];
    const div = document.createElement('div');
    
    div.className = 'game-obj';
    div.innerText = data.icon;
    
    // Posição segura dentro do container
    const x = Math.random() * (container.clientWidth - 60);
    const y = Math.random() * (container.clientHeight - 60);
    
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;

    div.onclick = (e) => {
        e.stopPropagation();
        score += data.pts;
        scoreEl.innerText = score;
        
        // Efeito visual rápido
        div.style.transform = 'scale(1.5)';
        setTimeout(() => div.remove(), 100);
    };

    container.appendChild(div);

    // Tempo de vida do objeto na tela (fica mais rápido conforme o tempo passa)
    const lifespan = time > 15 ? 1500 : 1000;
    setTimeout(() => { if(div) div.remove(); }, lifespan);
}

function startGame() {
    score = 0;
    time = 30;
    gameActive = true;
    scoreEl.innerText = score;
    timerEl.innerText = time;
    overlay.style.display = 'none';

    const loop = setInterval(() => {
        createTarget();
        if (Math.random() > 0.5) createTarget(); // Dobra a dificuldade às vezes
    }, 800);

    const countdown = setInterval(() => {
        time--;
        timerEl.innerText = time;

        if (time <= 0) {
            clearInterval(loop);
            clearInterval(countdown);
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameActive = false;
    alert(`Operação Concluída!\nPontuação de Sustentabilidade: ${score}`);
    overlay.style.display = 'flex';
    startBtn.innerText = 'REINICIAR OPERAÇÃO';
    document.querySelectorAll('.game-obj').forEach(obj => obj.remove());
}

startBtn.addEventListener('click', startGame);
