const campo = document.getElementById('campo');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');

let score = 0;
let timeLeft = 30;
let gameActive = false;

const itens = [
    { emoji: '🌿', pts: 10 }, // Soja
    { emoji: '🛸', pts: 20 }, // Drone
    { emoji: '🔥', pts: -30 } // Fogo (Perde pontos)
];

function criarItem() {
    if (!gameActive) return;

    const itemData = itens[Math.floor(Math.random() * itens.length)];
    const div = document.createElement('div');
    div.className = 'alvo';
    div.innerText = itemData.emoji;

    const x = Math.random() * (campo.clientWidth - 50);
    const y = Math.random() * (campo.clientHeight - 50);

    div.style.left = x + 'px';
    div.style.top = y + 'px';

    div.onclick = (e) => {
        e.stopPropagation();
        score += itemData.pts;
        scoreDisplay.innerText = score;
        div.remove();
    };

    campo.appendChild(div);
    setTimeout(() => div.remove(), 1500);
}

startBtn.onclick = () => {
    score = 0;
    timeLeft = 30;
    gameActive = true;
    scoreDisplay.innerText = score;
    timerDisplay.innerText = timeLeft;
    startBtn.style.display = 'none';

    const jogo = setInterval(criarItem, 800);
    const relogio = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(jogo);
            clearInterval(relogio);
            gameActive = false;
            alert("Fim da colheita! Pontos: " + score);
            startBtn.style.display = 'block';
            startBtn.innerText = "Jogar Novamente";
        }
    }, 1000);
};
