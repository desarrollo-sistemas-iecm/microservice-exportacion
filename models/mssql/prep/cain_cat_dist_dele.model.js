const { DataTypes } = require("sequelize");
const { sqlconnector } = require("../../../database/config");

const cain_cat_dist_deleMSSQL = sqlconnector.define('cain_cat_dist_dele', {
    id_distrito:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
    id_delegacion:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
    fecha_alta:         { type: DataTypes.STRING },
    fecha_modifica:     { type: DataTypes.STRING },
    fecha_baja:         { type: DataTypes.STRING },
    estatus:            { type: DataTypes.INTEGER }
}, 
{
    freezeTableName: true
});

module.exports = {
    cain_cat_dist_deleMSSQL
};