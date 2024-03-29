const { DataTypes } = require("sequelize");
const { sqlconnector } = require("../../../database/config");

const cain_cat_dist_deleMSSQL = sqlconnector.define('cain_cat_dist_dele', {
    id_distrito:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        unique: true
    },
    id_delegacion:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        unique: true
    },
    fecha_alta:         { type: DataTypes.DATE },
    fecha_modifica:     { type: DataTypes.DATE},
    fecha_baja:         { type: DataTypes.DATE },
    estatus:            { type: DataTypes.INTEGER }
}, 
{
    freezeTableName: true
});

module.exports = {
    cain_cat_dist_deleMSSQL
};