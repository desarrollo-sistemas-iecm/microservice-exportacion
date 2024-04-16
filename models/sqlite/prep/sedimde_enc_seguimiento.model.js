const { DataTypes } = require("sequelize");
const { sqliteconnector } = require("../../../database/configLite");

const sedimde_enc_seguimientoSQLite = sqliteconnector.define('sedimde_enc_seguimiento', {
    id_delegacion:          { 
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_distrito:            { 
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_seccion:             { 
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_casilla:             { 
        type: DataTypes.TEXT,
        primaryKey: true
    },
    id_distrito_asistente:  { type: DataTypes.INTEGER },
    id_asistente:           { type: DataTypes.INTEGER },
    nombre_funcionario:     { type: DataTypes.TEXT },
    cant_bol:               { type: DataTypes.INTEGER },
    delfolio_bol:           { type: DataTypes.INTEGER },
    alfolio_bol:            { type: DataTypes.INTEGER },
    deletra_ln:             { type: DataTypes.TEXT },
    aletra_ln:              { type: DataTypes.TEXT },
    canthojas_ln:           { type: DataTypes.INTEGER },
    fecha_prog:             { type: DataTypes.TEXT },
    lugar_prog:             { type: DataTypes.TEXT },
    dm_entregado:           { type: DataTypes.TEXT },
    dm_fecha_entregado:     { type: DataTypes.TEXT },
    dm_lugar_entregado:     { type: DataTypes.TEXT },
    dm_nombre_funcionario:  { type: DataTypes.TEXT },
    id_personalentrega:     { type: DataTypes.INTEGER },
    cm_llegada:             { type: DataTypes.INTEGER },
    cm_fecha_llegada:       { type: DataTypes.TEXT },
    pe_llegada:             { type: DataTypes.INTEGER },
    pe_fecha_llegada:       { type: DataTypes.TEXT },
    pe_recibido:            { type: DataTypes.INTEGER },
    pe_fecha_recibido:      { type: DataTypes.TEXT },
    pe_alterado:            { type: DataTypes.INTEGER },
    pe_causa:               { type: DataTypes.TEXT },
    pe_acta_jg:             { type: DataTypes.INTEGER },
    pe_acta_damr:           { type: DataTypes.INTEGER },
    pe_acta_darp:           { type: DataTypes.INTEGER },
    pe_acta_jd:             { type: DataTypes.INTEGER },
    pe_nombre_funcionario:  { type: DataTypes.TEXT },
    pe_cargo_funcionario:   { type: DataTypes.TEXT },
    id_personalrecibe:      { type: DataTypes.INTEGER },
    id_estado_seg:          { type: DataTypes.INTEGER },
    seg_obs:                { type: DataTypes.TEXT },
    id_usuario:             { type: DataTypes.INTEGER },
    fecha_alta:             { type: DataTypes.TEXT },
    fecha_modif:            { type: DataTypes.TEXT },
    status:                 { type: DataTypes.INTEGER },
    delfoliojd_bol:         { type: DataTypes.INTEGER },
    alfoliojd_bol:          { type: DataTypes.INTEGER },
    delfoliodip_bol:        { type: DataTypes.INTEGER },
    alfoliodip_bol:         { type: DataTypes.INTEGER },
    id_casilla1:            { type: DataTypes.TEXT },
    tipo_casilla:           { type: DataTypes.TEXT },
    ext_contigua:           { type: DataTypes.INTEGER },
    cant_bol2:              { type: DataTypes.INTEGER },
    delfolio_bol2:          { type: DataTypes.INTEGER },
    alfolio_bol2:           { type: DataTypes.INTEGER },
    cant_act_matele:        { type: DataTypes.TEXT },
    delfolio_bol3:          { type: DataTypes.INTEGER },
    alfolio_bol3:           { type: DataTypes.INTEGER },
}, 
{
    freezeTableName: true,
    indexes:[
        {
            name: 'idx_sedimde_casilla_del_distrito_seccion',
            fields:['id_casilla', 'id_delegacion', 'id_seccion']
        }
    ]
});

module.exports = {
    sedimde_enc_seguimientoSQLite
};