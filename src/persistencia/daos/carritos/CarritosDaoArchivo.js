import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

export class CarritosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super('../../db/carrito.json');
    }

    async addProductsToCart(products, cartId){
        try {
            let todos = await this.getAll();
            let nuevoContenido = todos.map((item, index)=>{
                if(item.id == cartId){
                    products.forEach(product => {
                        item.productos.push(product)
                    });
                }
                return item;
            })
            await fs.promises.writeFile(__dirname + this.rutaDB, JSON.stringify(nuevoContenido));
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductToCart(cartId, productId){
        try {
            let todos = await this.getAll();
            let nuevoContenido = todos.map((item, index)=>{
                if(item.id == cartId){
                    let nuevosProductos = item.productos.filter(producto=>producto.id != productId)
                    item.productos = nuevosProductos; 
                }
                return item;
            })
            await fs.promises.writeFile(__dirname + this.rutaDB, JSON.stringify(nuevoContenido));
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, timestamp, nombre, descripcion, codigo, foto, precio, stock){
        try {
            let todos = await this.getAll();
            let nuevoContenido = todos.map((product, index)=>{
                if(product.id == id){
                    product.timestamp = timestamp ? timestamp : product.timestamp,
                    product.nombre = nombre ? nombre : product.nombre,
                    product.descripcion = descripcion ? descripcion : product.descripcion,
                    product.codigo = codigo ? codigo : product.codigo,
                    product.foto = foto ? foto : product.foto,
                    product.precio = precio ? precio : product.precio,
                    product.stock = stock ? stock : product.stock
                }
                return product;
            })
            await fs.promises.writeFile(__dirname + this.rutaDB, JSON.stringify(nuevoContenido));
        } catch (error) {
            console.log(error)
        }
    }
}