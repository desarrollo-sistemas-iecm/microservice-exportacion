const { DataTypes } = require("sequelize");
const { sqliteconnector } = require("../../../database/configLite");

const cain_cat_delegacionSQLite = sqliteconnector.define('cain_cat_delegacion', {
    id_delegacion:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    distrito_cab:       { type: DataTypes.INTEGER },  
    nombre_delegacion:  { type: DataTypes.STRING },
    fecha_alta:         { type: DataTypes.DATE },
    fecha_modifica:     { type: DataTypes.DATE},
    fecha_baja:         { type: DataTypes.DATE },
    estatus:            { type: DataTypes.INTEGER }
}, 
{
    freezeTableName: true
});

module.exports = {
    cain_cat_delegacionSQLite
};