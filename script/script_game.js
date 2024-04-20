import {Nave} from "./Objetos/Nave.js";
import {NaveEnum} from "./enums/NaveEnum.js";

// Referencia inicial al canvas y su respectivo contexto 2d
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let naveLeft = new Nave(
    NaveEnum.POSICION_INICIAL_X_NAV_1,
    NaveEnum.POSICION_INICIAL_Y_NAV,
    NaveEnum.COLOR_NAV_1,
    NaveEnum.NOMBRE_NAV_1,
    NaveEnum.LARGO_NAV,
    NaveEnum.ALTO_NAV)

let navRight = new Nave(
    NaveEnum.POSICION_INICIAL_X_NAV_2,
    NaveEnum.POSICION_INICIAL_Y_NAV,
    NaveEnum.COLOR_NAV_2,
    NaveEnum.NOMBRE_NAV_2,
    NaveEnum.LARGO_NAV,
    NaveEnum.ALTO_NAV)


let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

let ballRadius = 10;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;



function drawPlayer(nave){
    console.log(nave.largo, nave.ancho, nave.posicion_Y, nave.posicion_X, nave.color)
    ctx.beginPath()
    ctx.rect(nave.posicion_X,nave.posicion_Y,nave.ancho, nave.alto)
    ctx.fillStyle = nave.color;
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
    
    drawPlayer(naveLeft)
    drawPlayer(navRight)

    //drawBall();
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
