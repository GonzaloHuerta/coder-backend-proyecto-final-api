import passport from 'passport';
import { Strategy } from 'passport-local';
import { usuariosDao } from '../persistencia/daos/index.js';
import bcrypt, { compare } from 'bcrypt';

function encriptar(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5));
}

function comparar(password, hashDb){
    return bcrypt.compareSync(password, hashDb);
}

const localStrategy = Strategy;

passport.use('register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
async(req, email, password, done)=>{
    const usuarioDb = await usuariosDao.getByEmail(email);
    if(usuarioDb){
        return done(null, false, {message: 'El usuario ya está registrado'});
    }
    req.body.password = await encriptar(password);
    const nuevoUsuario = await usuariosDao.create(req.body);
    return done(null, nuevoUsuario);
}))


passport.serializeUser((usuario, done) => {
    /* console.log("Usuario.id serialize: ", usuario.id) */
    done(null, usuario.id); // _id de mongo
});
  
passport.deserializeUser(async (id, done) => {
    /* console.log("Entra deserialize") */
    const usuario = await usuariosDao.getById(id);
    /* console.log("Usuario deserialize: ", usuario) */
    done(null, usuario);
});


passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async(req, email, password, done)=>{
    const usuarioDb = await usuariosDao.getByEmail(email);
    console.log(usuarioDb);
    if(!usuarioDb){
        console.log("No existe el usuario")
        return done(null, false);
    }
    if(!comparar(password, usuarioDb.password)){
        console.log("Contraseña incorrecta");
        return done(null, false)
    }
    done(null, usuarioDb);
}))


