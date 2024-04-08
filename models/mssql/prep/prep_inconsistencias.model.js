const { DataTypes } = require("sequelize");
const { sqlconnector } = require("../../../database/config");

const prep_inconsistenciasMSSQL = sqlconnector.define('prep_inconsistencias', {
    id_distrito:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    id_delegacion:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    id_seccion:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    tipo_casilla:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    id_tipo_eleccion:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    tipo_acta:{ type: DataTypes.INTEGER },
    id_inconsistencia:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    campo:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    id_usuario:     { type: DataTypes.INTEGER },
    fecha_alta:     { type: DataTypes.DATE },
    fecha_modif:    { type: DataTypes.DATE },
    estatus:        { type: DataTypes.CHAR },
}, 
{
    freezeTableName: true
});

module.exports = {
    prep_inconsistenciasMSSQL
};