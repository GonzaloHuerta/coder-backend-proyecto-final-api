import ContenedorMongoDb from "../../containers/ContenedorMongoDb.js";
import { carritosSchema } from "../../models/CarritosSchema.js";

export class CarritosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("carritos", carritosSchema);
  }

  // sobreescribe el metodo getAll de la clase padre
  async getAll() {
    // traer el carrito con los productos usando populate
    const carritos = await this.collection
      .find({})
      .populate({
        path: "productos",
        populate: { path: "_id", model: "productos" },
      });
    return carritos;
  }

  async getOne(id) {
    try {
      const one = await this.collection.findById(id).populate({
        path: "productos",
        populate: { path: "_id", model: "productos" },
      });
      return one;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUserCart(idUser){
    try {
      const userCart = await this.collection.findOne({userId:idUser});
      return userCart;
    } catch (error) {
      console.log("No posee cart");
    }
  }

  async addProductos(carrito, productos) {
    if(!productos){
        console.log("La lista de productos está vacía");
        return;
    }
    productos.forEach((producto) => {
      // chequear si el producto ya esta en el carrito
      const productoEnCarrito = carrito.productos.find(
        p => p._id._id == producto._id
      );
      if (productoEnCarrito) {
        console.log("Entra acá?")
        productoEnCarrito.cantidad++;
      } else {
        console.log("No, acá")
        carrito.productos.push(producto);
      }
    });
    const carritoUpdated = await this.collection.findByIdAndUpdate(
      carrito._id,
      { productos: carrito.productos }
    );
    return carritoUpdated;
  }

  async deleteProducto(carrito, productoId) {
    const productoEnCarrito = carrito.productos.find(
      (p) => p._id == productoId
    );
    if (productoEnCarrito) {
      productoEnCarrito.cantidad > 1
        ? productoEnCarrito.cantidad--
        : (carrito.productos = carrito.productos.filter(
            (p) => p._id != productoId
          ));
    } else {
      throw new Error("El producto no esta en el carrito");
    }
    const carritoUpdated = await this.collection.findByIdAndUpdate(
      carrito._id,
      { productos: carrito.productos }
    );
    return carritoUpdated;
  }
}
