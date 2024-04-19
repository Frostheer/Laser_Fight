import {Nave} from "./Objetos/Nave.js";

// Referencia inicial al canvas y su respectivo contexto 2d
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var nave = new Nave(0,0,'green', "nave 1",10,10)



var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;



function drawPlayer(){

    ctx.beginPath()
    ctx.rect(nave.posicion_X,nave.posicion_Y,nave.ancho,nave.largo)
    ctx.fillStyle = nave.color;
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer()
    drawBall();
    x += dx;
    y += dy;

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

}

setInterval(draw, 10);
