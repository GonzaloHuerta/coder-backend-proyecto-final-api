import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import {carritosSchema} from "../../models/carritosSchema.js";

export class CarritosDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super('carrito', carritosSchema);
    }

    async addProductsToCart(productos, id_cart) {
        productos.forEach(producto => {
            cart.productos.push(producto);
            console.log(producto)
        });
        const carritoActualizado = await this.collection.findByIdAndUpdate(id_cart, {productos: cart.productos});
        return carritoActualizado;
    }

    async deleteProductsToCart(id_cart, idProducto) {
        let cart = await this.getById(id_cart);
        cart.productos = cart.productos.filter(p => p.id != idProducto);
        await this.collection.findByIdAndUpdate(id_cart, {productos: cart.productos});
        const carritoActualizado = await this.collection.doc(id_cart).update({productos: cart.productos});
        return carritoActualizado;
    }
}