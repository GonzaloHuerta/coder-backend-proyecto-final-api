import {usuariosDao as api} from '../persistencia/daos/index.js';

const getUserSessionId = async(req, res)=>{
    res.status(200).json(req.session.passport.user);
}

const getUserById = async(req, res)=>{
    const {id} = req.params;
    const user = await api.getById(id);
    res.status(200).json(user);
}

export {getUserSessionId, getUserById};