import {logInfo} from '../loggers/logger.js';

export const logoutController = (req, res)=>{
  logInfo.info(`Ruta: ${req.path} | Método ${req.method}`);
  
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: "Error al cerrar sesión" });
    }
    res.status(200).send({ message: "Sesión cerrada" });
  });
}