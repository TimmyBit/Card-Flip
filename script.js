// Init variables
const board = document.querySelector('#board');
const start = document.querySelector('.start')
const colors = ['#03b3a4', '#ff0000', '#00ff73', '#d000ff', '#ffdd00'];
const allColors = [...colors, ...colors];
const timer = document.querySelector('p')
const timeSpan = document.querySelector('#time')
const timeText = document.querySelector('#time-text')

// Create cards, assign colors
const createCards = () => {
    board.replaceChildren();

    allColors.sort(() => Math.random() - 0.5);

    timer.classList.remove('hidden');
    start.innerText = 'Restart'

    allColors.forEach(color => {
        const card = document.createElement('button');
        card.classList.add('card');
        card.innerText = '?'
        card.dataset.value = color;
        board.appendChild(card);
    });

    const cards = document.querySelectorAll('#board button');
    cards.forEach(button => button.addEventListener('click', flipCard));

    startTime()
}

// Start timer
let time = 0;
let timeInterval;

const startTime = () => {
    time = 0;
    timeSpan.innerText = '0'
    timeText.innerText = 'Time:'
    clearInterval(timeInterval)
    timeInterval = setInterval(() => {
        time++;
        timeSpan.innerText = `${time}`
    }, 1000)
}

// Flip cards
let firstCard = null;
let secondCard = null;
let lockBoard = false;


function flipCard () {
    if (lockBoard || this === firstCard || this.classList.contains('matched')) return;

    this.style.backgroundColor = this.dataset.value
    this.classList.add('flipped');
    this.innerText = ''

    if (!firstCard) {
        firstCard = this
    } else {
        secondCard = this
        lockBoard = true;
    }

    if (firstCard.dataset.value === secondCard.dataset.value) {
        setTimeout(() => {
            firstCard.classList.add('matched')
            secondCard.classList.add('matched')
            
            // Win condition
            if (document.querySelectorAll('.matched').length === allColors.length) {
                clearInterval(timeInterval);
                timeText.innerText = 'Final Time:'
                start.innerText = 'Play Again'
                board.classList.add('win');
                setTimeout(() => board.classList.remove('win'), 1000);
            }
            resetBoard();
        }, 100)
    } else {
        setTimeout(() => {
            firstCard.style.backgroundColor = '#000'
            secondCard.style.backgroundColor = '#000'
            firstCard.innerText = '?'
            secondCard.innerText = '?'
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000)
    }
}

// Reset board
const resetBoard = () => {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Event listeners
start.addEventListener('click', createCards)