import {productosDao as api} from '../persistencia/daos/index.js';

let isAdmin = true;
const checkIfIsAdmin = (req, res, next)=>{
    if(!isAdmin){
        res.json({error: "Acceso denegado. No tiene permisos para acceder a esta ruta"});
    }else{
        next();
    }
}

const getAllProducts = async(req, res)=>{
    try{
        const productos = await api.getAll();
        productos? res.status(200).json(productos) : res.status(404).json({message: 'No hay productos disponibles'});
    }catch (err){
        res.status(500).json({message: err.message});
    } 
}

const getProductById = async(req, res)=>{
    const {id} = req.params;
    const product = await api.getById(id);
    res.json(product);
}

const addProduct = async(req, res)=>{
    const obj = req.body;
    
    if(obj.nombre==undefined || obj.descripcion==undefined || obj.codigo==undefined || 
        obj.thumbnail==undefined || obj.precio==undefined || obj.stock ==undefined)
    {
        res.json({error: "No se puede agregar un objeto vacío"})
        return;
    }
    
    for(let key in obj){
        if(obj[key] == ''){
            res.json({error: "Debe completar todos los campos para la creacion del producto"})
            return;
        }
    }
    const product = await api.create(obj);
    res.json(product);
}

const editProductById = async(req, res)=>{
    const {id} = req.params;
    const {timestamp, nombre, descripcion, codigo, foto, precio, stock} = req.body;
    res.json(await api.editById(id, timestamp, nombre, descripcion, codigo, foto, precio, stock));
}

const deleteProduct = async(req, res)=>{
    const {id} = req.params;
    res.json(await api.deleteById(id));
}

export {checkIfIsAdmin, getAllProducts, getProductById, addProduct, editProductById, deleteProduct}