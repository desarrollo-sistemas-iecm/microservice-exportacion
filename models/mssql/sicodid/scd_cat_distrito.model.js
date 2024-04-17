const { DataTypes } = require("sequelize");
const { sqlconnector2 } = require("../../../database/config2");

const scd_cat_distritoMSSQL = sqlconnector2.define('scd_cat_distrito', {
    id_distrito:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    id_delegacion:  { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },  
    romano:                         { type: DataTypes.STRING },
    direccion:                      { type: DataTypes.STRING },
    colonia:                        { type: DataTypes.STRING },
    cp:                             { type: DataTypes.INTEGER},
    telefono1:                      { type: DataTypes.STRING },
    telefono2:                      { type: DataTypes.STRING },
    telefono3:                      { type: DataTypes.STRING },
    coordinador:                    { type: DataTypes.STRING },
    secretario:                     { type: DataTypes.STRING },
    //              AGREGADOS POR BD Productiva
    fin_registro_integrantes_gt:    { type: DataTypes.INTEGER },
    recuento_total_jg:              { type: DataTypes.INTEGER },
    recuento_total_mr:              { type: DataTypes.INTEGER },
    recuento_total_rp:              { type: DataTypes.INTEGER },
    recuento_total_alc:             { type: DataTypes.INTEGER },
    //
    // num_envio:                   { type: DataTypes.STRING },
    fecha_alta:                     { type: DataTypes.STRING },
    fecha_modifica:                 { type: DataTypes.STRING },
    fecha_baja:                     { type: DataTypes.STRING },
    estatus:                        { type: DataTypes.INTEGER },
}, 
{
    freezeTableName: true
});

module.exports = {
    scd_cat_distritoMSSQL
};