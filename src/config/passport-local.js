import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { usuariosDao } from "../daos/index.js";

/** Recibe 3 parámetros:
 * 1. nombre de la funcion 'registro'
 * 2. instancia de localStrategy + config
 * 3. funcion de callback
 */
passport.use(
  "registro",
  new LocalStrategy(
    {
      /**Por default espera un username y un password. Definirle esos campos segun mi form */
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, //Para que el callback reciba el req completo
    },
    async (req, email, password, done) => {
      const usuario = await usuariosDao.findByName(email);
      if (usuario) {
        return done(null, false, { message: "El usuario ya existe" });
      }
      const nuevoUsuario = await usuariosDao.create(req.body);
      return done(null, nuevoUsuario);
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "nombre",
      passwordField: "password",
      passReqToCallback: true, //Para que el callback reciba el req completo
    },
    async (req, nombre, password, done) => {
      console.log(nombre, password);
      // done es un callback que se ejecuta cuando termina la funcion
      // const usuario = await Usuario.findOne({ nombre });
      // if (!usuario) {
      //   return done(null, false, { message: "El usuario no existe" });
      // }
      // if (usuario.contrasenia !== password) {
      //   return done(null, false, { message: "El password es incorrecto" });
      // }
      const usuario = null;
      return done(null, usuario);
    }
  )
);

/** hay dos funciones que passport necesita para trabajar con los ids de los usuarios en toda la app:
 * serializeUser: para guardar el id del usuario en la sesion
 * deserializeUser: para obtener el usuario de la base de datos por el id */
passport.serializeUser((usuario, done) => {
  done(null, usuario.id); // _id de mongo
});

passport.deserializeUser(async (id, done) => {
  const usuario = await usuariosDao.getOne(id);
  done(null, usuario);
});
