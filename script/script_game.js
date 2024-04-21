import {Nave} from "./Objetos/Nave.js";
import {NaveEnum} from "./enums/NaveEnum.js";
import {EscenarioEnum} from "./enums/EscenarioEnum.js";

// Referencia inicial al canvas y su respectivo contexto 2d
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// Controles nave 1 (Izquierda)
let botonIzquierdoNav1 = false;
let botonDerechoNav1 = false;
let botonArribaNav1 = false;
let botonAbajoNav1 = false;

// Controles nave 2 (Derecha)
let botonIzquierdoNav2 = false;
let botonDerechoNav2 = false;
let botonArribaNav2 = false;
let botonAbajoNav2 = false;


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

let naveRight = new Nave(
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

    /*--|Manejo de disparos|---------------------------------------------------------------------------------------*/
    if (e.key === " ") {
        dispararIzquierda = false;
    } else if (e.key === "-") {
        dispararDerecha = false;
    }
    /*--|Jugabilidad izquierda|---------------------------------------------------------------------------------------*/
    if (e.key === "a"){
        botonIzquierdoNav1 = false;
    }else if (e.key === "d"){
        botonDerechoNav1 = false;
    }

    if (e.key === "w"){
        botonArribaNav1 = false;
    }else if (e.key === "s"){
        botonAbajoNav1 = false;
    }

    /*--|Jugabilidad derecha|-----------------------------------------------------------------------------------------*/
    if (e.key === "ArrowLeft"){
        botonIzquierdoNav2 = false;
    }else if (e.key === "ArrowRight"){
        botonDerechoNav2 = false;
    }

    if (e.key === "ArrowUp"){
        botonArribaNav2 = false;
    }else if (e.key === "ArrowDown"){
        botonAbajoNav2 = false;
    }

}

function keyDownHandler(e) {

    /*--|Manejo de disparos|---------------------------------------------------------------------------------------*/
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

    /*--|Jugabilidad izquierda|---------------------------------------------------------------------------------------*/
    if (e.key === "a"){
        botonIzquierdoNav1 = true;
    }else if (e.key === "d"){
        botonDerechoNav1 = true;
    }

    if (e.key === "w"){
        botonArribaNav1 = true;
    }else if (e.key === "s"){
        botonAbajoNav1 = true;
    }

    /*--|Jugabilidad derecha|-----------------------------------------------------------------------------------------*/
    if (e.key === "ArrowLeft"){
        botonIzquierdoNav2 = true;
    }else if (e.key === "ArrowRight"){
        botonDerechoNav2 = true;
    }

    if (e.key === "ArrowUp"){
        botonArribaNav2 = true;
    }else if (e.key === "ArrowDown"){
        botonAbajoNav2 = true;
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

    if (botonIzquierdoNav1 && naveLeft.posicion_X > 0){
        naveLeft.posicion_X -= NaveEnum.MOVIMIENTO_NAV_X;
    }

    if (botonDerechoNav1 && naveLeft.posicion_X < EscenarioEnum.LIMITE_MAPA_MITAD_X - NaveEnum.LARGO_NAV){
        naveLeft.posicion_X += NaveEnum.MOVIMIENTO_NAV_X;
    }

    if (botonArribaNav1 && naveLeft.posicion_Y > 0){
        naveLeft.posicion_Y -= NaveEnum.MOVIMIENTO_NAV_Y;
    }

    if(botonAbajoNav1 && naveLeft.posicion_Y < EscenarioEnum.LIMITE_MAPA_Y - NaveEnum.ALTO_NAV){
        naveLeft.posicion_Y += NaveEnum.MOVIMIENTO_NAV_Y;
    }

    /*--|Jugabilidad derecha|-----------------------------------------------------------------------------------------*/
    drawPlayer(naveRight)
    if (dispararDerecha) {
        let bala = drawBall(naveRight);
        balas.push(bala);
    }

    if (botonIzquierdoNav2 && naveRight.posicion_X > EscenarioEnum.LIMITE_MAPA_MITAD_X){
        naveRight.posicion_X -= NaveEnum.MOVIMIENTO_NAV_X;
    }

    if (botonDerechoNav2 && naveRight.posicion_X < EscenarioEnum.LIMITE_MAPA_X - NaveEnum.LARGO_NAV){
        naveRight.posicion_X += NaveEnum.MOVIMIENTO_NAV_X;
    }

    if (botonArribaNav2 && naveRight.posicion_Y > 0){
        naveRight.posicion_Y -= NaveEnum.MOVIMIENTO_NAV_Y;
    }

    if(botonAbajoNav2 && naveRight.posicion_Y < EscenarioEnum.LIMITE_MAPA_Y - NaveEnum.ALTO_NAV){
        naveRight.posicion_Y += NaveEnum.MOVIMIENTO_NAV_Y;
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