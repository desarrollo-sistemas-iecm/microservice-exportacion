const { DataTypes } = require("sequelize");
const { sqlconnector2 } = require("../../../database/config2");

const scd_cat_participantesMSSQL = sqlconnector2.define('scd_cat_participantes', {
    id_participante: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    siglas: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    fecha_alta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_modif: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estatus: {
        type: DataTypes.CHAR(1),
        allowNull: false
    }
}, {
    freezeTableName: true
});

module.exports = {
    scd_cat_participantesMSSQL
};