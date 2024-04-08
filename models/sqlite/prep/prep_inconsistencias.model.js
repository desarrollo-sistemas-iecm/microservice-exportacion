const { DataTypes } = require("sequelize");
const { sqliteconnector } = require("../../../database/configLite");

const prep_inconsistenciasSQLite = sqliteconnector.define('prep_inconsistencias', {
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
    fecha_alta:     { type: DataTypes.STRING },
    fecha_modif:    { type: DataTypes.STRING },
    estatus:        { type: DataTypes.CHAR }
}, 
{
    freezeTableName: true
});

module.exports = {
    prep_inconsistenciasSQLite
};