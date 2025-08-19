const board = document.getElementById('board');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const modeRadios = document.querySelectorAll('input[name="mode"]');

let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameMode = 'pvp'; // default: Player vs Player

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (gameState[index] !== "" || checkWinner()) return;

  makeMove(index, currentPlayer);

  if (checkWinner()) {
    status.textContent = `Player ${currentPlayer} Wins! 🎉`;
    return;
  }

  if (!gameState.includes("")) {
    status.textContent = "It's a Draw! 🤝";
    return;
  }

  if (gameMode === 'pvc' && currentPlayer === 'X') {
    currentPlayer = 'O';
    status.textContent = `AI is thinking...`;
    setTimeout(() => aiMove(), 500); // AI delay
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function makeMove(index, player) {
  gameState[index] = player;
  document.querySelector(`.cell[data-index="${index}"]`).textContent = player;
}

function aiMove() {
  // Simple AI: choose random empty cell
  const emptyCells = gameState.map((v,i)=>v===""?i:null).filter(v=>v!==null);
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randomIndex, 'O');

  if (checkWinner()) {
    status.textContent = "AI Wins! 🤖";
    return;
  }

  if (!gameState.includes("")) {
    status.textContent = "It's a Draw! 🤝";
    return;
  }

  currentPlayer = 'X';
  status.textContent = "Player X's turn";
}

function checkWinner() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function restartGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = "");
}

modeRadios.forEach(radio => {
  radio.addEventListener('change', e => {
    gameMode = e.target.value;
    restartGame();
  });
});

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
