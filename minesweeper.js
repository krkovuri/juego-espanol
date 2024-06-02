let GRID_SIZE_X = 10;
let GRID_SIZE_Y = 10;
let MINE_PROBABILITY = 0.1;
let score = 0;

let board = [];
let flagCounter = 0;
let mineCounter = 0;

const gameBoardElement = document.getElementById('game-board');
const minesCountElement = document.getElementById('mines-count');
const flagsCountElement = document.getElementById('flags-count');
const scoreCountElement = document.getElementById('score-count');

function createBoard() {
    gameBoardElement.style.gridTemplateColumns = `repeat(${GRID_SIZE_Y}, 30px)`;

    for (let x = 0; x < GRID_SIZE_X; x++) {
        board[x] = [];
        for (let y = 0; y < GRID_SIZE_Y; y++) {
            const isMine = Math.random() < MINE_PROBABILITY;
            if (isMine) mineCounter++;

            board[x][y] = {
                isMine,
                isRevealed: false,
                isFlagged: false,
                adjacentMines: 0,
                element: createTileElement(x, y)
            };
        }
    }
    updateMineCounts();
    updateStatus();
}

function createTileElement(x, y) {
    const tileElement = document.createElement('div');
    tileElement.className = 'tile';
    tileElement.dataset.x = x;
    tileElement.dataset.y = y;
    tileElement.addEventListener('click', () => onTileClick(x, y));
    tileElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        onTileRightClick(x, y);
    });
    gameBoardElement.appendChild(tileElement);
    return tileElement;
}

function updateMineCounts() {
    for (let x = 0; x < GRID_SIZE_X; x++) {
        for (let y = 0; y < GRID_SIZE_Y; y++) {
            if (!board[x][y].isMine) {
                let mineCount = 0;
                getNeighbors(x, y).forEach(neighbor => {
                    if (neighbor.isMine) mineCount++;
                });
                board[x][y].adjacentMines = mineCount;
            }
        }
    }
}

function getNeighbors(x, y) {
    const neighbors = [];
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if (dx !== 0 || dy !== 0) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < GRID_SIZE_X && ny >= 0 && ny < GRID_SIZE_Y) {
                    neighbors.push(board[nx][ny]);
                }
            }
        }
    }
    return neighbors;
}

function onTileClick(x, y) {
    const tile = board[x][y];
    if (tile.isRevealed || tile.isFlagged) return;
    if (tile.isMine) {
        revealAllMines();
        alert('Game Over! You hit a mine.');
        resetGame();
        return;
    }
    revealTile(x, y);
    if (checkWinCondition()) {
        score++;
        updateStatus();
        alert('You Win!');
        resetGame();
    }
}

function onTileRightClick(x, y) {
    const tile = board[x][y];
    if (tile.isRevealed) return;
    tile.isFlagged = !tile.isFlagged;
    tile.element.classList.toggle('flagged', tile.isFlagged);
    flagCounter += tile.isFlagged ? 1 : -1;
    updateStatus();
}

function revealTile(x, y) {
    const tile = board[x][y];
    if (tile.isRevealed || tile.isFlagged) return;
    tile.isRevealed = true;
    tile.element.classList.add('revealed');
    if (tile.adjacentMines > 0) {
        tile.element.textContent = tile.adjacentMines;
        tile.element.classList.add(`tile-${tile.adjacentMines}`);
    } else {
        getNeighbors(x, y).forEach(neighbor => {
            if (!neighbor.isRevealed && !neighbor.isMine) {
                revealTile(parseInt(neighbor.element.dataset.x), parseInt(neighbor.element.dataset.y));
            }
        });
    }
}

function revealAllMines() {
    for (let x = 0; x < GRID_SIZE_X; x++) {
        for (let y = 0; y < GRID_SIZE_Y; y++) {
            const tile = board[x][y];
            if (tile.isMine) {
                tile.element.classList.add('mine');
            }
        }
    }
}

function checkWinCondition() {
    for (let x = 0; x < GRID_SIZE_X; x++) {
        for (let y = 0; y < GRID_SIZE_Y; y++) {
            const tile = board[x][y];
            if (!tile.isMine && !tile.isRevealed) {
                return false;
            }
        }
    }
    return true;
}

function updateStatus() {
    minesCountElement.textContent = `Mines: ${mineCounter}`;
    flagsCountElement.textContent = `Flags: ${flagCounter}`;
    scoreCountElement.textContent = `Score: ${score}`;
}

function resetGame() {
    gameBoardElement.innerHTML = '';
    board = [];
    flagCounter = 0;
    mineCounter = 0;
    createBoard();
}

function setDifficulty(difficulty) {
    switch (difficulty) {
        case 'easy':
            GRID_SIZE_X = 10;
            GRID_SIZE_Y = 10;
            MINE_PROBABILITY = 0.1;
            break;
        case 'medium':
            GRID_SIZE_X = 15;
            GRID_SIZE_Y = 15;
            MINE_PROBABILITY = 0.15;
            break;
        case 'hard':
            GRID_SIZE_X = 20;
            GRID_SIZE_Y = 20;
            MINE_PROBABILITY = 0.2;
            break;
    }
    resetGame();
}

createBoard();
