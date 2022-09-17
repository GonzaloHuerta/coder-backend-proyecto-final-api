import { ContenedorFirebase } from "../../contenedores/ContenedorFirebase.js";

export class ProductosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super("productos");
    }
}