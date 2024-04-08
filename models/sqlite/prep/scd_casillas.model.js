const { DataTypes } = require("sequelize");
const { sqliteconnector } = require("../../../database/configLite");

const scd_casillasSQLite = sqliteconnector.define('scd_casillas', {
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
    acta_jg:        { type: DataTypes.INTEGER },
    acta_dmr:       { type: DataTypes.INTEGER },
    acta_rp:        { type: DataTypes.INTEGER },
    acta_alcalde:   { type: DataTypes.INTEGER }
}, 
{
    freezeTableName: true,
    indexes:[
        {
            name: 'idx_sec_del_dto_sec',
            fields:['id_distrito', 'id_delegacion', 'id_seccion', 'tipo_casilla']
        }
    ]
});

module.exports = {
    scd_casillasSQLite
};