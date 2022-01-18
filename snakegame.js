document.addEventListener("DOMContentLoaded", function () {

pTag = document.querySelector("div");
newVal = document.createElement("p");
newVal.innerHTML = '';
pTag.appendChild(newVal);

/* ---- Constants ---- */
const board_border = 'black';
const board_background = "black";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake = [
    {x: 200, y: 200},
]

let score = 0;
let changingDirection = false;
let food_x;
let food_y;
let dx = 10;
let dy = 0;
let speed = 100;

const snakeboard = document.getElementById("snakeboard");
const snakeboard_ctx = snakeboard.getContext("2d");
init();

gen_food();

document.addEventListener("keydown", changeDirection);
document.querySelector('button').addEventListener('click', restart);

function init() {

    if (gameEnded()) return;
    
    changingDirection = false;
    setTimeout(function onTick() {
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
        init();
  }, 100)
}

function restart() {
    score = 0;
    snake=[{x: 200, y: 200}];
    speed = 100;
    changingDirection = false;
    setTimeout(function onTick() {
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
        init();
  }, speed)
}

function clearBoard() {
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.strokestyle = board_border;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
  }

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function drawFood() {
    snakeboard_ctx.fillStyle = 'lightgreen';
    snakeboard_ctx.strokestyle = 'darkgreen';
    snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}

function drawSnakePart(snakePart) {
    snakeboard_ctx.fillStyle = snake_col;
    snakeboard_ctx.strokestyle = snake_border;
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function gameEnded() {
    for (let i = 4; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        return true
      }
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;
    if (hitLeftWall || hitRightWall || hitToptWall || hitBottomWall){
    }
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
  }

function randomFood(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}


function gen_food() {
    food_x = randomFood(0, snakeboard.width - 10);
    food_y = randomFood(0, snakeboard.height - 10);
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) {
            speed *= 0.1;
            gen_food();
        }
    });
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    
if (changingDirection) return;
    changingDirection = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
      score += 10;
      document.getElementById('score').innerHTML = score;
      gen_food();
    } else {
      snake.pop();
    }
  }
});