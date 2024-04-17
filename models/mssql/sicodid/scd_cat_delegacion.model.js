const { DataTypes } = require("sequelize");
const { sqlconnector2 } = require("../../../database/config2");
// const { sqlconnector2 } = require("../../../database/config");

const scd_cat_delegacionMSSQL = sqlconnector2.define('scd_cat_delegacion', {
    id_delegacion:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    distrito_cab:       { type: DataTypes.INTEGER },  
    nombre_delegacion:  { type: DataTypes.STRING },
    fecha_alta:         { type: DataTypes.STRING },
    fecha_modifica:     { type: DataTypes.STRING},
    fecha_baja:         { type: DataTypes.STRING },
    estatus:            { type: DataTypes.INTEGER }
}, 
{
    freezeTableName: true
});

module.exports = {
    scd_cat_delegacionMSSQL
};