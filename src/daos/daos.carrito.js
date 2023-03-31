import Contenedor from "../contents/carrito.content.js";
import { Carrito } from "../models/carrito.models.js";

export class productos extends Contenedor {
    constructor() {
        super("productos", Carrito);
    }
}