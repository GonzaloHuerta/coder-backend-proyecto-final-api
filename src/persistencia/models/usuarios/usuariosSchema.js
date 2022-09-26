import mongoose from "mongoose";

export const usuariosSchema = new mongoose.Schema({
    email: String,
    password: String,
    nombre: String,
    apellido: String,
    direccion: String,
    edad: String,
    telefono: String,
    cartId: String
});
