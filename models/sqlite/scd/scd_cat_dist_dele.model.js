const { DataTypes } = require("sequelize");
const { sqliteconnector2 } = require("../../../database/configLite2");

const scd_cat_dist_deleSQLite = sqliteconnector2.define('scd_cat_dist_dele', {
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
    scd_cat_dist_deleSQLite
};