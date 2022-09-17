import dotenv from 'dotenv';
import { MensajesDaoFirebase } from './mensajes/MensajesDaoFirebase.js';
import { MensajesDaoMongoDb } from './mensajes/MensajesDaoMongoDb.js';
import { UsuariosDaoMongoDb } from './usuarios/UsuariosDaoMongoDb.js';
import {ProductosDaoMongoDb} from './productos/ProductosDaoMongoDb.js';

dotenv.config();

let mensajesDao;
let usuariosDao;
let productosDao;

switch (process.env.DB_NAME) {
  case 'mongoDB':
    console.log('Entra Mongo')
    mensajesDao = new MensajesDaoMongoDb();
    usuariosDao = new UsuariosDaoMongoDb();
    productosDao = new ProductosDaoMongoDb();
    break;
  
  case 'firebase':
    console.log('Entra firebase')
    mensajesDao = new MensajesDaoFirebase();
    break;

  default:
    console.log('default')
    break;
}

export {mensajesDao, usuariosDao, productosDao}

