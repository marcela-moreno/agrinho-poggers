const canvas = document.getElementById('game-canvas');
const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('start-btn');

let score = 0;
let gameActive = false;

const items = [
    { emoji: '🌱', points: 10, type: 'good' },
    { emoji: '🛸', points: 15, type: 'good' }, // Drone
    { emoji: '💧', points: 10, type: 'good' },
    { emoji: '🔥', points: -20, type: 'bad' }  // Desperdício/Queimada
];

function createItem() {
    if (!gameActive) return;

    const itemData = items[Math.floor(Math.random() * items.length)];
    const item = document.createElement('div');
    
    item.className = 'target';
    item.innerText = itemData.emoji;
    
    // Posição aleatória
    const x = Math.random() * (canvas.offsetWidth - 50);
    const y = Math.random() * (canvas.offsetHeight - 50);
    
    item.style.left = x + 'px';
    item.style.top = y + 'px';

    item.onclick = () => {
        score += itemData.points;
        scoreElement.innerText = `Pontos: ${score}`;
        item.remove();
        if(itemData.type === 'bad') {
            canvas.style.backgroundColor = '#ffcdd2';
            setTimeout(() => canvas.style.backgroundColor = '#fff', 200);
        }
    };

    canvas.appendChild(item);

    // Remove o item após 2 segundos se não for clicado
    setTimeout(() => {
        if (item.parentNode) item.remove();
    }, 2000);
}

startBtn.addEventListener('click', () => {
    score = 0;
    scoreElement.innerText = `Pontos: ${score}`;
    gameActive = true;
    startBtn.style.display = 'none';
    
    // Criar itens a cada 800ms
    const gameInterval = setInterval(createItem, 800);

    // Jogo dura 30 segundos
    setTimeout(() => {
        gameActive = false;
        clearInterval(gameInterval);
        alert(`Fim de jogo! Você ajudou o Agro a ser mais sustentável com ${score} pontos.`);
        startBtn.style.display = 'inline-block';
        startBtn.innerText = 'Jogar Novamente';
    }, 30000);
});