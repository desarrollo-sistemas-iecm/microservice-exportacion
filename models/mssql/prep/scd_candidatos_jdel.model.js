const { DataTypes } = require("sequelize");
const { sqlconnector } = require("../../../database/config");

const scd_candidatos_jdelMSSQL = sqlconnector.define('scd_candidatos_jdel', {
    id_delegacion:{ 
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
    scd_candidatos_jdelMSSQL
};