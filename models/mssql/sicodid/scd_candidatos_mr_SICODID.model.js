const { DataTypes } = require("sequelize");
const { sqlconnector2 } = require("../../../database/config2");

const scd_candidatos_mr_SICODIDMSSQL = sqlconnector2.define('scd_candidatos_mr', {
    id_distrito:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    id_participante:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    tipo_participante:  { type: DataTypes.INTEGER },
    prelacion:          { type: DataTypes.INTEGER },
    integrantes:        { type: DataTypes.STRING},
    campo_votos:        { type: DataTypes.STRING },
    fecha_alta:         { type: DataTypes.DATE },
}, 
{
    freezeTableName: true,
});

module.exports = {
    scd_candidatos_mr_SICODIDMSSQL
};