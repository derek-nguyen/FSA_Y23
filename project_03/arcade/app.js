const snake = {
    //tail is the highest index
    body: [[10, 4], [10, 3], [10, 2]],
    head: [10, 5]
}

const gameState = {
    boardSize: {
        defaultRow: 20,
        defaultColumn: 20,
    },
    apple: [10, 10],
    // snake: snake,
}

// game state
const gameContainer = document.querySelector('body')
const rows = gameState.boardSize.defaultRow
const cols = gameState.boardSize.defaultColumn
let cells = []
let score = 0
let highScore = 0


// initializes a new game, when the start game button is clicked
document.getElementById('startGame').addEventListener('click', () => {
    resetGame()
    loadBoard()
    initGame()
});

window.addEventListener('load',loadBoard())

function loadBoard(){
    let board
    board = gameContainer.appendChild(document.createElement('div'))
    board.setAttribute('id', 'gameBoard')
    for (let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.dataset.cellId = i * cols + j
            board.appendChild(cell);
            row.push(cell);
        }
        cells.push(row)
    }
}

function initGame() {
    // renders the initial apple
    let appleRow = gameState.apple[0]
    let appleCol = gameState.apple[1]
    cells[appleRow][appleCol].classList.add('apple')

    renderSnake();

    const intervalId = setInterval(() => {
        if (gameOver !== true) {
            endGame();
            moveSnake();
            keepScore();
        } else {
            clearInterval(intervalId) 
        }
    }, 100)
}

function moveSnake() {
    removeSnake()
    let newHead;

    if (previousDirection === 'left') {
        newHead = [snake.head[0], snake.head[1] - 1]
    } else if (previousDirection === 'up') {
        newHead = [snake.head[0] - 1, snake.head[1]]
    } else if (previousDirection === 'right') {
        newHead = [snake.head[0], snake.head[1] + 1];
    } else if (previousDirection === 'down') {
        newHead = [snake.head[0] + 1, snake.head[1]];
    } else {
        return;
    }

    snake.body.unshift(snake.head)
    snake.body.pop()
    snake.head = newHead


    renderSnake()
    eatAppleAndGrow()
}


function renderSnake() {
    // render snake o   n board based on snake object
    // add class snakeShape to the body
    for (let i = 0; i < snake.body.length; i++) {
        const [row, col] = snake.body[i]; //using array destructuring 
        const cell = cells[row][col]
        cell.classList.add('snakeShape')
    }

    // render snake head
    const [snakeHeadRow, snakeHeadCol] = snake.head
    cells[snakeHeadRow][snakeHeadCol].classList.add('snakeShape')
}


function removeSnake() {
    for (let i = 0; i < snake.body.length; i++) {
        const [row, col] = snake.body[i]; //using array destructuring 
        const cell = cells[row][col]
        cell.classList.remove('snakeShape')
    }

    // removes snake's head
    const [row, col] = snake.head
    const cellHead = cells[row][col]
    cellHead.classList.remove('snakeShape')
}

let previousDirection = 'right'
document.addEventListener('keydown', (event) => {
    let newHead;
    if (event.key === 'ArrowLeft' && previousDirection !== 'right') {
        //need to change existing positions of snake.body and add [x,y-1]
        previousDirection = 'left'

    }
    else if (event.key === 'ArrowUp' && previousDirection !== 'down') {
        //need to change existing positions of snake.body and add [x-1,y]
        previousDirection = 'up'
    }
    else if (event.key === 'ArrowRight' && previousDirection !== 'left') {
        //need to change existing positions of snake.body and add [x,y+1]
        previousDirection = 'right'
    }
    else if (event.key === 'ArrowDown' && previousDirection !== 'up') {
        //need to change existing positions of snake.body and add [x+1,y]
        previousDirection = 'down'
    }
    else {
        return;
    }

});


// render an apple at a random position on the board
function randomPosApple() {
    //random apple position 
    let appleRow = Math.floor(Math.random() * gameState.boardSize.defaultRow)
    let appleCol = Math.floor(Math.random() * gameState.boardSize.defaultColumn)
    cells[appleRow][appleCol].classList.add('apple')
}


// Snake will grow in length when an apple is eaten
function eatAppleAndGrow() {
    // check if the snake head is on the same cell as the apple
    // check to see if the current position of the snake head has 'apple' in class .contains()
    if (cells[snake.head[0]][snake.head[1]].classList.contains('apple') === true) {
        //add the current position of the apple to the tail of the snake
        snake.body.push([snake.head[0], snake.head[1]])
        score += 1;

        //remove "eat" apple from board
        cells[snake.head[0]][snake.head[1]].classList.remove('apple')

        //creates a new apple
        randomPosApple()
    }
}

let gameOver = false
// Game will end if the snake hits itself or hits the wall
function endGame() {
    // checks to see if snake is in body
    for (let i = 0; i < snake.body.length - 1; i++) {
        if (JSON.stringify(snake.body[i]).includes(JSON.stringify(snake.head))) {
            gameOver = true
        }
    }

    // checks if snake hits a wall
    const [snakeRow, snakeCol] = snake.head
    if (snakeRow < 0 || snakeRow >= rows || snakeCol < 0 || snakeCol >= cols) {
        gameOver = true
    }

    if (gameOver) {
        modal.style.display = "block"
    }
    
}

function resetGame() {
    const oldBoard = document.getElementById('gameBoard')
    oldBoard.remove()

    // Reset board
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = cells[i][j]
            cell.classList.remove('snakeShape', 'apple')
        }
    }

    // Reset game state
    gameState.apple = [10, 10]
    snake.body = [[10, 4], [10, 3], [10, 2]]
    snake.head = [10, 5]

    gameOver = false;
    score = 0
    previousDirection = 'right'
    cells = []
    score = 0

    //reset score on board
    let currentScore = document.getElementById('current-score')
    currentScore.innerHTML = score
}

function keepScore() {
    let currentScore = document.getElementById('current-score')
    let highScoreDOM = document.getElementById('high-score')
    currentScore.innerHTML = score

    if (score > highScore) {
        highScore = score
        highScoreDOM.innerHTML = highScore
    }
}

// END GAME MODAL
let modal = document.querySelector('.modal')
let modalBtn = document.querySelector('.close')

modalBtn.addEventListener('click',()=>{
  modal.style.display = "none"  
})