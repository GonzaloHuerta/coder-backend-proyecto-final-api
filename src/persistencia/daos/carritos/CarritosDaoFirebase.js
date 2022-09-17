import { ContenedorFirebase } from "../../contenedores/ContenedorFirebase.js";

export class CarritosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super("carritos");
    }

    async addProductsToCart(productos, id_cart) {
        let cart = await this.getById(id_cart);
        productos.forEach(producto => {
            cart.productos.push(producto);
            console.log(producto)
        });
        const carritoActualizado = await this.collection.doc(id_cart).update({productos: cart.productos});
        return carritoActualizado;
    }

    async deleteProductsToCart(id_cart, idProducto) {
        let cart = await this.getById(id_cart);
        cart.productos = cart.productos.filter(p => p.id != idProducto);
        
        const carritoActualizado = await this.collection.doc(id_cart).update({productos: cart.productos});
        return carritoActualizado;
    }
}