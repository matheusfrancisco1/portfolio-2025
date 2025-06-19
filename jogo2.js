const gameBoard = document.querySelector('.game-board');
const scoreSpan = document.getElementById('score');
const resetButton = document.getElementById('reset-button');

let cards = [];
let flippedCards = []; 
let matchedPairs = 0;
let score = 0;
let lockBoard = false; 

const cardImages = [
    'cheetos1.jpg',
    'cheetos2.jpg',
    'cebolitos.jpg',
    'ruffles.jpg',
    'fandangos.jpg',
    'cheetos3.jpg',
];


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function createBoard() {
    gameBoard.innerHTML = ''; 
    score = 0;
    matchedPairs = 0;
    scoreSpan.textContent = score;

    
    const gameImagePaths = [...cardImages, ...cardImages];
    shuffle(gameImagePaths); 

    gameImagePaths.forEach(imagePath => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = imagePath; 

        const frontFace = document.createElement('div');
        frontFace.classList.add('card-face', 'front-face');
        const img = document.createElement('img');
        img.src = imagePath;
        frontFace.appendChild(img);

        const backFace = document.createElement('div');
        backFace.classList.add('card-face', 'back-face');
        backFace.imageContent= 'elma.png'; 

        card.appendChild(frontFace);
        card.appendChild(backFace);

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

// Função para virar uma carta
function flipCard() {
    if (lockBoard) return;
    if (this === flippedCards[0]) return;

    this.classList.add('flip');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        lockBoard = true;
        checkForMatch();
    }
}

// Função para verificar se as cartas viradas são um par
function checkForMatch() {
    const [card1, card2] = flippedCards;
    // Compara o atributo 'data-image' para ver se os caminhos das imagens são iguais
    const isMatch = card1.dataset.image === card2.dataset.image;

    if (isMatch) {
        disableCards();
        score += 10; // Adiciona 10 pontos por acerto
        matchedPairs++;
    } else {
        unflipCards();
        score = Math.max(0, score - 5); // Subtrai 5 pontos por erro, sem ir abaixo de zero
    }
    scoreSpan.textContent = score;

    // Se todos os pares foram encontrados
    if (matchedPairs === cardImages.length) {
        setTimeout(() => alert(`Parabéns! Você ganhou com ${score} pontos!`), 500);
    }
}

// Função para desabilitar as cartas que formaram um par
function disableCards() {
    flippedCards[0].removeEventListener('click', flipCard);
    flippedCards[1].removeEventListener('click', flipCard);
    flippedCards[0].classList.add('matched');
    flippedCards[1].classList.add('matched');
    resetBoard();
}

// Função para desvirar as cartas que não formaram um par
function unflipCards() {
    setTimeout(() => {
        flippedCards[0].classList.remove('flip');
        flippedCards[1].classList.remove('flip');
        resetBoard();
    }, 1000); // Espera 1 segundo antes de desvirar
}

// Função para resetar as variáveis de controle do tabuleiro
function resetBoard() {
    [flippedCards, lockBoard] = [[], false];
    shuffle;
}

// Event listener para o botão de reiniciar
resetButton.addEventListener('click', createBoard);

// Iniciar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', createBoard);
