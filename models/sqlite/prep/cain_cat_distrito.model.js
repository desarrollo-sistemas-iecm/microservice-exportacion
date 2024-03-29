const { DataTypes } = require("sequelize");
const { sqliteconnector } = require("../../../database/configLite");

const cain_cat_distritoSQLite = sqliteconnector.define('cain_cat_distrito', {
    id_distrito:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        unique: true
    },
    id_delegacion:  { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        unique: true
    },  
    romano:         { type: DataTypes.STRING },
    direccion:      { type: DataTypes.STRING },
    colonia:        { type: DataTypes.STRING },
    cp:             { type: DataTypes.INTEGER},
    telefono1:      { type: DataTypes.STRING },
    telefono2:      { type: DataTypes.STRING },
    telefono3:      { type: DataTypes.STRING },
    coordinador:    { type: DataTypes.STRING },
    secretario:     { type: DataTypes.STRING },
    num_envio:      { type: DataTypes.STRING },
    fecha_alta:     { type: DataTypes.DATE },
    fecha_modifica: { type: DataTypes.DATE },
    fecha_baja:     { type: DataTypes.DATE },
    estatus:        { type: DataTypes.INTEGER },
}, 
{
    freezeTableName: true
});

module.exports = {
    cain_cat_distritoSQLite
};