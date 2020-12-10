const form = document.querySelector('form');
const errorMessage = document.querySelector('.error-message');
const squares = Array.from(document.querySelectorAll('.container .square'));

const computerSection = document.querySelector('.computer');
const playerSection = document.querySelector('.player');

const compXRef = document.querySelector('#xValueComp');
const compYRef = document.querySelector('#yValueComp');

const gameStatus = document.querySelector('.game-status');
const statusText = document.querySelector('.game-status p');
const restartButton = document.querySelector('.restart');

let visited = [[false, false, false], [false, false, false], [false, false, false]];
let noOfRounds = 0;

let gameOver = false;
let isGameDraw = false;
let currentTurn = "Player";

const handlePlayerInput = e => {
  e.preventDefault();

  const xPos = form.xValue.value;
  const yPos = form.yValue.value;

  const isValidInput = validatePlayerInput(parseInt(xPos), parseInt(yPos));

  if (!isValidInput) {
    errorMessage.style.display = 'block';
  } else {
    errorMessage.style.display = 'none';
    drawSquare(parseInt(xPos), parseInt(yPos), true);

    if(!isGameOver())  {
      currentTurn = "Computer";
      toggleSections("computer");
    }
  }
}

//*Check if player enters a valid position and it is not already visited
function validatePlayerInput(xPos, yPos) {
  return (xPos >= 0 && xPos <= 2) && (yPos >= 0 && yPos <= 2) && !(visited[xPos][yPos]) ? true : false;
}

function drawSquare(xPos, yPos, isXShape) {
  let position = (xPos * 3) + yPos;
  let squareToDraw = squares[position];

  let className = isXShape ? 'xShape' : 'oShape';
  let content = isXShape ? 'X' : 'O';

  let html = `<p class="${className}">${content}</p>`;
  squareToDraw.innerHTML = html;

  //*Mark the visited square in the visited array
  visited[xPos][yPos] = content;

  noOfRounds++;  //*Increment round counter

  if(noOfRounds >= 5 && noOfRounds < 9) {
    let gameStatus = isGameOver();

    if(gameStatus) declareResults();

  } else if(noOfRounds === 9) {
    gameOver = true;

    if(checkDiagonals() || checkRowWiseDirections() || checkColumnWiseDirections()) {
      isGameDraw = false;
    } else {
      isGameDraw = true;
    }

    declareResults();
  }

}

function toggleSections(sectionName) {
  if (sectionName === "computer") {
    playerSection.style.display = 'none';
    computerSection.style.display = 'flex';
    calculateRandomPositionForComputer();
  } else if (sectionName === "player") {
    computerSection.style.display = 'none';
    playerSection.style.display = 'flex';
    form.reset();
  }
}

//*Generate random position for computer's turn
function calculateRandomPositionForComputer() {
  let randomXPos = null;
  let randomYPos = null;
  let isValidRandomPos = false;

  //*Continue until a position is generated which is not already visited
  while(!isValidRandomPos) {
    randomXPos = getRandomPosition();
    randomYPos = getRandomPosition();

    let isValidPos = checkIfValidPosition(randomXPos, randomYPos);
    isValidRandomPos = isValidPos ? true : false;
  }

  compXRef.textContent = `X Position : ${randomXPos}`;
  compYRef.textContent = `Y Position : ${randomYPos}`;

  
  drawSquare(randomXPos, randomYPos, false)
  

  //*Switch to player's turn if game is not over
  if (!isGameOver()) {
    currentTurn = "Player";
    setTimeout(() => {
      toggleSections("player");
    }, 3000)
  }
}

//*Get a random number between 0 and 2
function getRandomPosition() {
  return Math.floor(Math.random() * 3);
}

//*Check if the generated random position is already visited / not
function checkIfValidPosition(xPos, yPos) {
  return !visited[xPos][yPos] ? true : false;
}

//*Core game logic starts here

function checkRowWiseDirections() {
  let result = null;
  let i = 0;

  while (i !== visited.length) {
    if (
      (visited[i][0] === 'X' && visited[i][1] === 'X' && visited[i][2] === 'X') ||
      (visited[i][0] === 'O' && visited[i][1] === 'O' && visited[i][2] === 'O')
    ) {
      result = true;
      break;
    } else {
      result = false;
    }
    i++;
  }
  return result;
}

function checkColumnWiseDirections() {
  let result = null;
  let j = 0;

  while (j !== visited.length) {
    if (
      (visited[0][j] === 'X' && visited[1][j] === 'X' && visited[2][j] === 'X') ||
      (visited[0][j] === 'O' && visited[1][j] === 'O' && visited[2][j] === 'O')
    ) {
      result = true;
      break;
    } else {
      result = false;
    }
    j++;
  }
  return result;
}

function checkDiagonals() {
  let result = null;

  if (
    (visited[0][0] === 'X' && visited[1][1] === 'X' && visited[2][2] === 'X') ||
    (visited[0][0] === 'O' && visited[1][1] === 'O' && visited[2][2] === 'O') ||
    (visited[0][2] === 'X' && visited[1][1] === 'X' && visited[2][0] === 'X') ||
    (visited[0][2] === 'O' && visited[1][1] === 'O' && visited[2][0] === 'O') ) {
    result = true;
  } else {
    result = false;
  }

  return result;
}

function isGameOver() {

  if(checkRowWiseDirections() || checkColumnWiseDirections() || checkDiagonals()) {
    gameOver = true;
  } else {
    gameOver = false;
  }

  return gameOver;
}

function declareResults() {
  gameStatus.style.display = 'flex';

  if(gameOver && !isGameDraw) {
    if (currentTurn === 'Player') {
      statusText.textContent = 'Player has won !';
    } else if (currentTurn = 'Computer') {
      statusText.textContent = 'Computer has won !';
    }
  } else {
    statusText.textContent = 'Game is a draw !';
  }
}

//*Core game logic ends here

//*Capture submit of form
form.addEventListener('submit', handlePlayerInput);

restartButton.addEventListener('click', () => location.reload());

