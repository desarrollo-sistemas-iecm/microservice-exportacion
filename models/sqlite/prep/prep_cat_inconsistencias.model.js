const { DataTypes } = require("sequelize");
const { sqliteconnector } = require("../../../database/configLite");

const prep_cat_inconsistenciasSQLite = sqliteconnector.define('prep_cat_inconsistencias', {
    id_inconsistencia:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        unique: true
    },
    tipo_inconsistencia:{ type: DataTypes.INTEGER },
    descripcion:        { type: DataTypes.STRING },
    descripcion_abrev:  { type: DataTypes.STRING },
    id_usuario:         { type: DataTypes.INTEGER},
    fecha_alta:         { type: DataTypes.DATE },
    fecha_modif:        { type: DataTypes.DATE },
    estatus:            { type: DataTypes.STRING },
}, 
{
    freezeTableName: true
});

module.exports = {
    prep_cat_inconsistenciasSQLite
};