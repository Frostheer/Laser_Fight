export class Nave {
    color;
    ancho;
    nombre;
    largo;
    posicion_X;
    posicion_Y;


    constructor(posicion_X, posicion_Y, color, nombre, ancho, largo) {
        this.color = color;
        this.nombre = nombre;
        this.ancho = ancho;
        this.largo = largo;
        this.posicion_X = posicion_X;
        this.posicion_Y = posicion_Y;
    }

}
