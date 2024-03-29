const { response } = require('express');
const jwt = require('jsonwebtoken');

const validaJWT = (req, res = response, next) =>{
    const tk = req.header('x-token-admin');

    if( !tk ){
        return res.status(401).json({
            ok: false,
            login: false,
            msg: 'Sin token'
        });
    }

    try{
        const { idCuenta, nombreUsuario, idDistrito } = jwt.verify(tk, process.env.JWT_SECRET_ADMIN);

        req.idCuenta = idCuenta;
        req.nombreUsuario = nombreUsuario;
        req.idDistrito = idDistrito;

        next();
    } catch ( error ){
        console.log('Este es el error:', error);
        return res.status(401).json({
            ok: false,
            login: false,
            msg: 'Tk invalid'
        });
    }
}

module.exports = {
    validaJWT
}