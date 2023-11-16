const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX , foodY;
let snakeX = 5 , snakeY = 10;
let snakeBody = [];
let velocityX = 0 , velocityY = 0;
let setIntervalId;
let score= 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High score: ${highScore}`;


const changeFoodPosition = () => {
    foodX = Math.floor(Math.random()*50)+1;
    foodY = Math.floor(Math.random()*50)+1;
    
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over!");
    location.reload();
}

const changeDirection = (e) => {
    if (e.key === "w" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    if (e.key === "s" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    if (e.key === "a"&& velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    if (e.key === "d"&& velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }

    
}

const initGame = () => {
    if(gameOver){
        return handleGameOver() ;
    } 

    let htmlMarkup = `<div class="food" style= "grid-area: ${foodY} / ${foodX} "></div>`;
    
    if(snakeX===foodX && snakeY===foodY){
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);
        score+=10;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        highScoreElement.innerHTML = `High score: ${highScore}`;
        scoreElement.innerHTML = `Score: ${score}`;
    }

    for(let i = snakeBody.length -1; i > 0;i--){
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX,snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 50 || snakeY <= 0 || snakeY > 50){
        gameOver = true;
    }

    for(let i = 0; i< snakeBody.length;i++){
        htmlMarkup += `<div class="head" style= "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
        if (i !==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0] ){
            gameOver= true;
        }
    }
    
    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
setIntervalId = setInterval(initGame,125);
document.addEventListener("keydown", changeDirection);