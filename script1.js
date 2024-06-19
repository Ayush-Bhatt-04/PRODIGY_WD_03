const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (boardState[cellIndex] !== '' || !gameActive) {
        return;
    }

    cell.innerText = currentPlayer;
    boardState[cellIndex] = currentPlayer;
    handleResultValidation();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = boardState[winCondition[0]];
        let b = boardState[winCondition[1]];
        let c = boardState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    let roundDraw = !boardState.includes('');
    if (roundDraw) {
        message.innerText = 'Game ended in a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    message.innerText = '';
    cells.forEach(cell => (cell.innerText = ''));
}
