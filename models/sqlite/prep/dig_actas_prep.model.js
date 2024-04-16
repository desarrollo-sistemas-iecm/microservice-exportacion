const { DataTypes } = require("sequelize");
const { sqliteconnector } = require("../../../database/configLite");

const dig_actas_prepSQLite = sqliteconnector.define('dig_actas_prep', {
    id_acta:            { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        unique: true
    },
    id_distrito:        { type: DataTypes.INTEGER },
    acta:               { type: DataTypes.TEXT },
    img_nombre_jgob:    { type: DataTypes.TEXT },
    img_nombre_alc:     { type: DataTypes.TEXT },
    img_nombre_dmr:     { type: DataTypes.TEXT },
    img_nombre_rp:      { type: DataTypes.TEXT },
    id_usuario:         { type: DataTypes.INTEGER },
    estatus:            { type: DataTypes.INTEGER },
    md5_img_jgob:       { type: DataTypes.TEXT },
    md5_img_alc:        { type: DataTypes.TEXT },
    md5_img_dmr:        { type: DataTypes.TEXT },
    md5_img_rp:         { type: DataTypes.TEXT },
    especial:           { type: DataTypes.INTEGER },
    //YYYY-MM-DD
    fecha_jgob:         { type: DataTypes.TEXT },
    fecha_alc:          { type: DataTypes.TEXT },
    fecha_dmr:          { type: DataTypes.TEXT },
    fecha_rp:           { type: DataTypes.TEXT },
    fechaRecepcion:     { type: DataTypes.TEXT },
    usrRecepcion:       { type: DataTypes.INTEGER },
    id_delegacion:      { type: DataTypes.INTEGER },
    id_sesion:          { type: DataTypes.INTEGER },
}, 
{
    freezeTableName: true
});

module.exports = {
    dig_actas_prepSQLite
};