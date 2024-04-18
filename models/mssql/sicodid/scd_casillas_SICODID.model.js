const { DataTypes } = require("sequelize");
const { sqlconnector2 } = require("../../../database/config2");

const SCD_casillasMSSQL = sqlconnector2.define('scd_casillas', {
    id_delegacion:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
    },  
    id_distrito:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    id_seccion:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    tipo_casilla:{ 
        type: DataTypes.STRING,
        primaryKey: true,
    },
    clave_mdc:      { type: DataTypes.STRING },
    empadronados:   { type: DataTypes.INTEGER },
    lista_nominal:  { type: DataTypes.INTEGER},
    id_usuario:     { type: DataTypes.INTEGER },
    fecha_alta:     { type: DataTypes.STRING },
    fecha_modif:    { type: DataTypes.STRING },
    estatus:        { type: DataTypes.STRING },
    // acta_jg:        { type: DataTypes.INTEGER },
    // acta_dmr:       { type: DataTypes.INTEGER },
    // acta_rp:        { type: DataTypes.INTEGER },
    // acta_alcalde:   { type: DataTypes.INTEGER },
}, 
{
    freezeTableName: true,
});

module.exports = {
    SCD_casillasMSSQL
};