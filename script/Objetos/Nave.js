export class Nave {
    color;
    ancho;
    nombre;
    largo;
    posicion_X;
    posicion_Y;


    constructor(posicion_X, posicion_Y, color, nombre, ancho, largo) {
        this._posicion_X = posicion_X;
        this._posicion_Y = posicion_Y;
        this._color = color;
        this._nombre = nombre;
        this._ancho = ancho;
        this._largo = largo;
    }


    get posicion_X() {
        return this._posicion_X;
    }

    get posicion_Y() {
        return this._posicion_Y;
    }

    get color() {
        return this._color;
    }

    get nombre() {
        return this._nombre;
    }

    get ancho() {
        return this._ancho;
    }

    get largo() {
        return this._largo;
    }
}
