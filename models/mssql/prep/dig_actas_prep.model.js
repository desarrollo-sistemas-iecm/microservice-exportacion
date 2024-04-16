const { DataTypes } = require("sequelize");
const { sqlconnector } = require("../../../database/config");

const dig_actas_prepMSSQL = sqlconnector.define('dig_actas_prep', {
    id_acta:            { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        unique: true
    },
    id_distrito:        { type: DataTypes.INTEGER },
    acta:               { type: DataTypes.STRING },
    img_nombre_jgob:    { type: DataTypes.STRING },
    img_nombre_alc:     { type: DataTypes.STRING },
    img_nombre_dmr:     { type: DataTypes.STRING },
    img_nombre_rp:      { type: DataTypes.STRING },
    id_usuario:         { type: DataTypes.INTEGER },
    estatus:            { type: DataTypes.INTEGER },
    md5_img_jgob:       { type: DataTypes.STRING },
    md5_img_alc:        { type: DataTypes.STRING },
    md5_img_dmr:        { type: DataTypes.STRING },
    md5_img_rp:         { type: DataTypes.STRING },
    especial:           { type: DataTypes.INTEGER },
    //YYYY-MM-DD
    fecha_jgob:         { type: DataTypes.STRING },
    fecha_alc:          { type: DataTypes.STRING },
    fecha_dmr:          { type: DataTypes.STRING },
    fecha_rp:           { type: DataTypes.STRING },
    fechaRecepcion:     { type: DataTypes.STRING },
    usrRecepcion:       { type: DataTypes.INTEGER },
    id_delegacion:      { type: DataTypes.INTEGER },
    id_sesion:          { type: DataTypes.INTEGER },
}, 
{
    freezeTableName: true
});

module.exports = {
    dig_actas_prepMSSQL
};