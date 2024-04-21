import {Nave} from "./Objetos/Nave.js";
import {NaveEnum} from "./enums/NaveEnum.js";
import {EscenarioEnum} from "./enums/EscenarioEnum.js";

// Referencia inicial al canvas y su respectivo contexto 2d
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let dispararIzquierda;
let dispararDerecha;
let refrescoIzquierda = 0;
let refrescoDerecha = 0;
const tiempoEspera = EscenarioEnum.TIEMPO_ESPERA;

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


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


// keyUpHandler se activa cuando generas click y keyDownHandler cuando lo sueltas,
// por lo que está para limpiar cualquier activación
function keyUpHandler(e) {
    if (e.key === " ") {
        dispararIzquierda = false;
    } else if (e.key === "-") {
        dispararDerecha = false;
    }
}

function keyDownHandler(e) {
    const currentTime = new Date().getTime(); // Obtener el tiempo actual en milisegundos
    if (e.key === " ") {
        if (currentTime - refrescoIzquierda >= tiempoEspera) {
            dispararIzquierda = true;
            refrescoIzquierda = currentTime;
        }
    } else if (e.key === "-") {
        if (currentTime - refrescoDerecha >= tiempoEspera) {
            dispararDerecha = true;
            refrescoDerecha = currentTime;
        }
    }
}


function drawPlayer(nave) {
    ctx.beginPath()
    ctx.rect(nave.posicion_X, nave.posicion_Y, nave.ancho, nave.alto)
    ctx.fillStyle = nave.color;
    ctx.fill();
    ctx.closePath();
}

function drawBall(nave) {
    ctx.beginPath();
    if (nave.nombre === "Nave izquierda") {
        return {
            eje_x: nave.posicion_X + 30,
            eje_y: nave.posicion_Y + 10,
            speed: EscenarioEnum.VELOCIDAD,
            radius: EscenarioEnum.RADIO,
            color: nave.color
        }

    } else if (nave.nombre === "Nave derecha") {
        return {
            eje_x: nave.posicion_X,
            eje_y: nave.posicion_Y + 10,
            speed: EscenarioEnum.VELOCIDAD,
            radius: EscenarioEnum.RADIO,
            color: nave.color
        }
    }

    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


let balas = [];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /*--|Jugabilidad izquierda|---------------------------------------------------------------------------------------*/
    drawPlayer(naveLeft)
    if (dispararIzquierda) {
        let bala = drawBall(naveLeft);
        balas.push(bala);
    }

    /*--|Jugabilidad derecha|-----------------------------------------------------------------------------------------*/
    drawPlayer(navRight)
    if (dispararDerecha) {
        let bala = drawBall(navRight);
        balas.push(bala);
    }

    // Update and draw balas
    for (let i = 0; i < balas.length; i++) {
        let bala = balas[i];
        if (bala.color === "blue") {
            bala.eje_x += bala.speed;
        } else {
            bala.eje_x -= bala.speed;
        }

        ctx.beginPath();
        ctx.arc(bala.eje_x, bala.eje_y, bala.radius, 0, Math.PI * 2);
        ctx.fillStyle = bala.color;
        ctx.fill();
        ctx.closePath();
    }
}

setInterval(draw, 10);