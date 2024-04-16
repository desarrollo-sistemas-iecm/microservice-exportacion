const { DataTypes } = require("sequelize");
const { sqliteconnector } = require("../../../database/configLite");

const nourbanasLite = sqliteconnector.define('nourbanas', {
    iddistrito:    { 
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    idseccion:     { 
        type: DataTypes.INTEGER,  
        primaryKey: true,
    },
    idcasilla:     { 
        type: DataTypes.STRING,
        primaryKey: true,
    },
    tiposeccion:   { 
        type: DataTypes.STRING,
        primaryKey: true,
    },
    clave_mdc:     { 
        type: DataTypes.STRING,
        primaryKey: true,
    },
}, 
{
    freezeTableName: true,
    indexes:[
        {
            name: 'idx_nourb_distrito_seccion_casilla',
            fields:['iddistrito', 'idseccion', 'idcasilla']
        }
    ]
});

module.exports = {
    nourbanasLite
};