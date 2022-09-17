import ContenedorMongoDb from "../../containers/ContenedorMongoDb.js";
import { productosSchema } from "../../models/ProductosSchema.js";

export class ProductosDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super('productos', productosSchema);
    }
}