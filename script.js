const canvas = document.getElementById('field-canvas');
const scoreEl = document.getElementById('score-val');
const timerEl = document.getElementById('timer-val');
const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('game-overlay');

let score = 0;
let time = 30;
let isPlaying = false;

// Itens: Emoji, Pontos, Probabilidade de aparecer
const gameItems = [
    { emoji: '🌿', pts: 10 },  // Soja Saudável
    { emoji: '🌱', pts: 10 },  // Broto
    { emoji: '🛸', pts: 30 },  // Drone de Tecnologia
    { emoji: '🐛', pts: -50 }, // Praga (Não clicar!)
    { emoji: '🔥', pts: -100 } // Queimada (Não clicar!)
];

function spawnItem() {
    if (!isPlaying) return;

    const item = document.createElement('div');
    const data = gameItems[Math.floor(Math.random() * gameItems.length)];
    
    item.className = 'soy-target';
    item.innerText = data.emoji;
    
    const x = Math.random() * (canvas.clientWidth - 70);
    const y = Math.random() * (canvas.clientHeight - 70);
    
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;

    item.onclick = (e) => {
        e.stopPropagation();
        score += data.pts;
        scoreEl.innerText = score;
        item.style.transform = 'scale(0)';
        setTimeout(() => item.remove(), 100);
    };

    canvas.appendChild(item);

    // Some após 1.2 segundos se não clicar
    setTimeout(() => { if(item) item.remove(); }, 1200);
}

function runGame() {
    score = 0;
    time = 30;
    isPlaying = true;
    scoreEl.innerText = score;
    timerEl.innerText = time;
    overlay.style.display = 'none';

    // Loop de criação de itens
    const gameInterval = setInterval(() => {
        spawnItem();
        if (time < 10) spawnItem(); // Fica mais difícil no final
    }, 700);

    // Loop do Cronômetro
    const timerInterval = setInterval(() => {
        time--;
        timerEl.innerText = time;

        if (time <= 0) {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
            isPlaying = false;
            finishGame();
        }
    }, 1000);
}

function finishGame() {
    alert("Operação Finalizada!\nPontuação de Sustentabilidade: " + score);
    overlay.style.display = 'flex';
    startBtn.innerText = 'Reiniciar Colheita Digital';
    document.querySelectorAll('.soy-target').forEach(i => i.remove());
}

startBtn.onclick = runGame;
