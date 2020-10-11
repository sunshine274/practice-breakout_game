const cvs = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// draw bricks

// // draw ball
// const circle = {
//     x:200,
//     y:200,
//     size:30,
//     dx:5,
//     dy:4
// }

// function drawCircle(){
//     ctx.beginPath();
//     ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
//     ctx.fillStyle = 'purple';
//     ctx.fill();
// }

// function update(){
//     ctx.clearRect(0,0, canvas.width, canvas.height);
//     drawCircle();

//     // change position
//     circle.x += circle.dx;
//     circle.y += circle.dy;

//     // detect side walls
//     if(circle.x + circle.size > canvas.width || circle.x - circle.size < 0){
//         circle.dx *= -1 // circle.dx = circle.dx * -1
//     }

//     // detect top and bottom walls
//     if(circle.y + circle.size > canvas.height || circle.x - circle.size < 0) {
//         circle.dy *= -1
//     }

//     requestAnimationFrame(update);
// }

// update();

// add border to canvas
cvs.style.border = "1px solid black";

const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
let leftArrow = false;
let rightArrow = false;
let LIFE = 3;
const BALL_RADIUS = 8;

const paddle = {
    x: cvs.width/2 - PADDLE_WIDTH/2,
    y: cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dx:5
}

// draw paddle
function drawPaddle(){
    ctx.fillStyle = "gold";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    ctx.strokeStyle = "#ffcd05";	
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// control the paddle with keyboard
document.addEventListener("keydown", function(e){
    if(e.keyCode == 37){
        leftArrow = true;
    }else if(e.keyCode == 39){
        rightArrow = true;
    }
});
document.addEventListener("keyup", function(e){
    if(e.keyCode == 37){
        leftArrow = false;
    }else if(e.keyCode == 39){
        rightArrow = false;
    }
});

// move the paddle
function movePaddle(){
    if(rightArrow && paddle.x + paddle.width < cvs.width){
        paddle.x += paddle.dx;
    }else if(leftArrow && paddle.x > 0 ){
        paddle.x -= paddle.dx;
    }
}

// draw ball
const ball = {
    x : cvs.width/2,
    y : paddle.y - BALL_RADIUS,
    radius : BALL_RADIUS,
    speed : 6,
    dx : 3 * (Math.random() * 2 - 1),
    dy : -3
}

function drawBall(){
     ctx.beginPath();
    
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#ffcd05";
    ctx.fill();
    
    ctx.strokeStyle = "#2e3548";
    ctx.stroke();
    
    ctx.closePath();
}

// move the bal
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}

// ball and wall collision detection
function ballWallCollision(){
 if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
        ball.dx = - ball.dx;
    }
    
    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
    }
    
    if(ball.y + ball.radius > cvs.height){
        LIFE--; // LOSE LIFE
        resetBall();
    }
}

// reset the ball
function resetBall(){
  ball.x = cvs.width/2,
    ball.y = paddle.y - BALL_RADIUS,
    ball.radius = BALL_RADIUS,
    ball.dx= 3 * (Math.random()*2-1),
    ball.dy = -3
}

// ball and paddle collision
function ballPaddleCollision(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){

        // check where the ball hit the paddle
        let collidePoint = ball.x - (paddle.x + paddle.width/2);

        // normallise the values ??
        collidePoint = collidePoint/(paddle.width/2);

        // calculate the angle of the ball
        let angle = collidePoint * Math.PI/3;

        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
    }
}

// create the bricks
const brick = {
    row : 1,
    column : 5,
    width : 55,
    height : 20,
    offSetLeft : 20,
    offSetTop : 20,
    marginTop : 40,
    fillColor : "#2e3548",
    strokeColor : "#FFF"
}

// draw everything
function draw(){
drawPaddle()
drawBall()
}

// update game function
function update(){
movePaddle();
moveBall();
ballWallCollision();
ballPaddleCollision();
}

// game loop
function loop(){
ctx.drawImage(bg_img,0,0)
    draw()

    update()
    if(!GAME_OVER){
requestAnimationFrame(loop)
    }
    
}

loop()