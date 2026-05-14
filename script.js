const canvas = document.getElementById('game-canvas');
const scoreDisp = document.getElementById('score');
const timerDisp = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');

let score = 0;
let timeLeft = 20;
let gameRunning = false;

const items = [
    { icon: '🌲', pts: 10 },
    { icon: '🚜', pts: 15 },
    { icon: '📡', pts: 20 },
    { icon: '🔥', pts: -25 }
];

function createItem() {
    if (!gameRunning) return;

    const item = document.createElement('div');
    const data = items[Math.floor(Math.random() * items.length)];
    
    item.className = 'item-jogo';
    item.innerText = data.icon;
    
    const x = Math.random() * (canvas.clientWidth - 60);
    const y = Math.random() * (canvas.clientHeight - 60);
    
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;

    item.onclick = () => {
        score += data.pts;
        scoreDisp.innerText = score;
        item.style.transform = 'scale(0)'; // Efeito ao clicar
        setTimeout(() => item.remove(), 100);
    };

    canvas.appendChild(item);
    setTimeout(() => { if(item) item.remove(); }, 1200);
}

startBtn.onclick = () => {
    score = 0;
    timeLeft = 20;
    gameRunning = true;
    scoreDisp.innerText = score;
    startBtn.parentElement.style.display = 'none';

    const timer = setInterval(() => {
        timeLeft--;
        timerDisp.innerText = timeLeft;
        createItem();
        
        if(timeLeft <= 0) {
            clearInterval(timer);
            gameRunning = false;
            alert(`Missão Cumprida! Sua pontuação sustentável: ${score}`);
            startBtn.parentElement.style.display = 'flex';
            startBtn.innerText = 'Reiniciar Tecnologia';
            document.querySelectorAll('.item-jogo').forEach(i => i.remove());
        }
    }, 1000);
};
