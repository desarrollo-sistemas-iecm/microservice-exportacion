const { DataTypes } = require("sequelize");
const { sqliteconnector } = require("../../../database/configLite");

const scd_candidatos_jgobSQLite = sqliteconnector.define('scd_candidatos_jgob', {
    id_participante:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    tipo_participante:  { type: DataTypes.INTEGER },
    prelacion:          { type: DataTypes.INTEGER },
    integrantes:        { type: DataTypes.STRING},
    campo_votos:        { type: DataTypes.STRING },
    fecha_alta:         { type: DataTypes.STRING },
}, 
{
    freezeTableName: true,
});

module.exports = {
    scd_candidatos_jgobSQLite
};