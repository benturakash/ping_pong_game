//grabbing all the elements from the html doc
const gameBoard = document.querySelector("#game-board");
const Stop=document.querySelector("#stop-btn");
const play=document.querySelector("#play-btn");
const ctx=gameBoard.getContext("2d");
const Winner=document.querySelector("#winner");

const score = document.querySelector("#score");
const reset = document.querySelector("#reset-btn");


//decraling some constants 
const gameWidth = gameBoard.width;// actually taking the width attribute frm html tag
const gameHeight=gameBoard.height;
//console.log(gameHeight);
const boardBackground="green";
const player1Color="lightblue";
const player2Color="red";
const playerBorder="black";
const ballColor="yellow";
const borderBallColor="black";
const ballRadius=15;
const playerSpeed=50;

//declaring the variables
let intervalID;
let ballSpeed;
let ballX=gameWidth/2;
let ballY=gameHeight/2;
let ballXDirection=0;
let ballYDirection=0;
let player1Score=0;
let player2Score=0;

//creating  object for player
let player1={
Width:25,
height:100,
x:0,
y:0
};

let player2={
Width:25,
height:100,
x:gameWidth-25,
y:gameHeight-100
};

// creating the window obj for event listners

window.addEventListener("keydown",changeDirection);
reset.addEventListener("click",resetGame);
Stop.addEventListener("click",stopGame);
play.addEventListener("click",playGame);

//funcitons

function stopGame(){
    ballSpeed=0;
};

function stopStop(){
    ballSpeed=0;
};

function playGame(){
    ballSpeed=0.25;
    gameStart();
};

function gameStart(){
    createBall();
    nextTick();
};

function nextTick(){
    intervalID= setInterval(()=>{
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX,ballY);
        checkCollision();
        nextTick();
    },10)
};

function clearBoard(){
    ctx.fillStyle=boardBackground;
    ctx.fillRect(0,0,gameWidth,gameHeight);
};

function drawPaddles(){
    ctx.strokeStyle = playerBorder;

    ctx.fillStyle= player1Color;
    ctx.fillRect(player1.x, player1.y, player1.Width, player1.height);
    ctx.strokeRect(player1.x, player1.y, player1.Width, player1.height);

    ctx.fillStyle= player2Color;
    ctx.fillRect(player2.x, player2.y, player2.Width, player2.height);
    ctx.strokeRect(player2.x, player2.y, player2.Width, player2.height);
};

function createBall(){
    ballSpeed=0.25;
    if(Math.round(Math.random())==ballSpeed){
        ballXDirection=1;
    }else {
        ballXDirection=-1;
    }
    if(Math.round(Math.random())==ballSpeed){
        ballYDirection=1;
    }else {
        ballYDirection=-1;
    }
    ballX=gameWidth/2;
    ballY=gameHeight/2;
    drawBall(ballX,ballY);
};

function moveBall(){
    ballX+=(ballSpeed * ballXDirection);
    ballY+=(ballSpeed * ballYDirection);
};

function drawBall(ballX,ballY){
    ctx.fillStyle=ballColor;
    ctx.strokeStyle=borderBallColor;
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
};

function checkCollision(){
    if(ballY<=0+ballRadius){
        ballYDirection*=-1;
    }
    if(ballY>=gameHeight-ballRadius){
        ballYDirection*=-1;
    }
    if(ballX<=0){
        player2Score+=1;
        if(player2Score<=25)
        {
            updateScore();
            stopStop();
            createBall();
        }
        else {
            drawBall(250,250);
            Winner.textContent="player2 is Winner";
            }
        return;
    }
    if(ballX>=gameWidth){
        player1Score+=1;
        if(player1Score<=25)
        {
        updateScore();
        stopStop();
        createBall();
        
        }else {
        drawBall(250,250);
        Winner.textContent="player1 is Winner";
        }
        return;
    }
    if(ballX<=(player1.x+player1.Width+ballRadius)){
        if(ballY>player1.y && ballY < player1.y + player1.height){
            ballX=(player1.x+player1.Width)+ballRadius;
            ballXDirection*=-1;
            ballSpeed+=0.002;
        }
    }
    if(ballX>=(player2.x-ballRadius)){
        if(ballY>player2.y && ballY < player2.y + player2.height){
            ballX=player2.x-ballRadius;
            ballXDirection*=-1;
            ballSpeed+=0.002;
        }
    }
};

function changeDirection(event){
    const keyPressed=event.keyCode;
    const player1Up=87;
    const player1Down=83;
    const player2Up=38;
    const player2Down=40;

    switch(keyPressed)
    {
        case(player1Up):
        if(player1.y>0)
        player1.y-=playerSpeed;
        break;
        case (player1Down):
            if(player1.y < gameHeight-player1.height)
            player1.y+=playerSpeed;
            break;
        case (player2Up):
            if(player2.y>0)
            player2.y-=playerSpeed;
            break;
        case player2Down:
            if(player2.y<gameHeight-player2.height)
            player2.y+=playerSpeed;
            break;
        default:
            break;
    }

};

function updateScore(){
    score.textContent=`${player1Score} : ${player2Score}`;
};

function resetGame(){
    player1Score=0;
    player2Score=0;
    player1={
    Width:25,
    height:100,
    x:0,
    y:0
    };
       
    player2={
    Width:25,
    height:100,
    x:gameWidth-25,
    y:gameHeight-100
    };
    ballSpeed=0;
    ballX=0;
    ballY=0;
    ballXDirection=0;
    ballYDirection=0;
    updateScore();
    clearInterval(intervalID);
};
