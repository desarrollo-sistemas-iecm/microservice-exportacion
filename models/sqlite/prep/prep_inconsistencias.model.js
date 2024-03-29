const { DataTypes } = require("sequelize");
const { sqliteconnector } = require("../../../database/configLite");

const prep_inconsistenciasSQLite = sqliteconnector.define('prep_inconsistencias', {
    id_distrito:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        unique: true
    },
    id_delegacion:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        unique: true
    },
    id_seccion:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        unique: true
    },
    tipo_casilla:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        unique: true
    },
    id_tipo_eleccion:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        unique: true
    },
    tipo_acta:{ type: DataTypes.INTEGER },
    id_inconsistencia:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        unique: true
    },
    campo:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        unique: true
    },
    id_usuario:     { type: DataTypes.INTEGER },
    fecha_alta:     { type: DataTypes.DATE },
    fecha_modif:    { type: DataTypes.DATE },
    estatus:        { type: DataTypes.CHAR }
}, 
{
    freezeTableName: true
});

module.exports = {
    prep_inconsistenciasSQLite
};