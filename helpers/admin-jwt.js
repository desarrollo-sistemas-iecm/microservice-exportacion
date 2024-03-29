const jwt = require('jsonwebtoken');

const genAdminJWT = ( idCuenta, nombreUsuario, idDistrito ) => {
    return new Promise ( (resolve, reject)=>{
        const payload = {idCuenta, nombreUsuario, idDistrito};
        jwt.sign( payload, process.env.JWT_SECRET_ADMIN,  
            {
                expiresIn: '8h'
            }, ( err, token ) =>{
                if(err){
                    console.log(err);
                    reject('Sin JWT');
                } else {
                    resolve(token);
                }
            }
        )

    } );
}

module.exports = {
    genAdminJWT
};