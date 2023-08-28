let gameBody = document.querySelector(".game-body");
let dScore = document.querySelector(".score");
let dHighScore = document.querySelector(".high-score");
let controls = document.querySelectorAll(".controls i");

let gameOver = false;
let snakeBody = [];
let foodx , foody ,
 headx=10 , heady=15 ,
 velocityx=0  ,velocityy=0 ;
let intervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
dHighScore.innerText = `Score : ${highScore}`;
const handleGameOver = () =>{
    // clear timer
    clearInterval(intervalId);
    alert("Game Over");
    // reload the game
    location.reload();
}
const changeFoodPosition = () =>{
    foodx = Math.floor(Math.random()*30 +1);
    foody = Math.floor(Math.random()*30 +1);
}
const changeDirection = (e) =>{
    if(e.key === 'ArrowUp' && velocityy !== 1){
       velocityx=0;
       velocityy= -1;
    }
    else if(e.key === 'ArrowDown' && velocityy !== -1){
        velocityx=0;
        velocityy= 1;
     }
    else if(e.key === 'ArrowLeft' && velocityx !== 1){
        velocityx=-1;
        velocityy= 0;
     }
    else if(e.key === 'ArrowRight' && velocityx !== -1){
        velocityx=1;
        velocityy= 0;
     }
     initGame();
}

controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({key: key.dataset.key}))
});

const initGame = ()=>{

    if(gameOver) return handleGameOver();
    let markupHtml = `<div class="food" style="grid-area:${foody}/${foodx};" ></div>`;
    
     // check if the head take the food
     if (headx === foodx && heady === foody) {
        changeFoodPosition();
        snakeBody.push([foodx , foody])
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        dScore.innerText = `Score : ${score}`
        dHighScore.innerText = `High Score : ${highScore}`
    }
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    snakeBody[0] = [headx , heady];
    
    headx += velocityx;
    heady += velocityy; 

    // snake hit the wall or not 
    if (headx <= 0 || headx > 30 || heady <= 0 || heady > 30 ) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        markupHtml += `<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]};" ></div>`;    
        // if snake hit itself
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver= true;
        }
    }
    gameBody.innerHTML = markupHtml;
}
changeFoodPosition();
intervalId = setInterval(initGame,125);
document.addEventListener('keydown',changeDirection);