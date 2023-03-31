import Contenedor from "../contents/carrito.content.js";
import { products } from "../models/productos.models.js";

export class prod extends Contenedor {
    constructor() {
        super("prod", products);
    }
}