import MongoClass from "../../containers/MongoClass.js";
import { productosSchema } from "../../models/ProductosSchema.js";

export class MongoDBProductos extends MongoClass {
    constructor() {
        super("productos", productosSchema);
    }
}