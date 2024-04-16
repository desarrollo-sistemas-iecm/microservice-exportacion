const { DataTypes } = require("sequelize");
const { sqlconnector2 } = require("../../../database/config2");

const sedimde_enc_seguimientoMSSQL = sqlconnector2.define('sedimde_enc_seguimiento', {
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
    nombre_funcionario:     { type: DataTypes.STRING },
    cant_bol:               { type: DataTypes.INTEGER },
    delfolio_bol:           { type: DataTypes.INTEGER },
    alfolio_bol:            { type: DataTypes.INTEGER },
    deletra_ln:             { type: DataTypes.STRING },
    aletra_ln:              { type: DataTypes.STRING },
    canthojas_ln:           { type: DataTypes.INTEGER },
    fecha_prog:             { type: DataTypes.STRING },
    lugar_prog:             { type: DataTypes.STRING },
    dm_entregado:           { type: DataTypes.INTEGER },
    dm_fecha_entregado:     { type: DataTypes.STRING },
    dm_lugar_entregado:     { type: DataTypes.STRING },
    dm_nombre_funcionario:  { type: DataTypes.STRING },
    id_personalentrega:     { type: DataTypes.INTEGER },
    cm_llegada:             { type: DataTypes.INTEGER },
    cm_fecha_llegada:       { type: DataTypes.STRING },
    pe_llegada:             { type: DataTypes.INTEGER },
    pe_fecha_llegada:       { type: DataTypes.STRING },
    pe_recibido:            { type: DataTypes.INTEGER },
    pe_fecha_recibido:      { type: DataTypes.STRING },
    pe_alterado:            { type: DataTypes.INTEGER },
    pe_causa:               { type: DataTypes.STRING },
    pe_acta_jg:             { type: DataTypes.INTEGER },
    pe_acta_damr:           { type: DataTypes.INTEGER },
    pe_acta_darp:           { type: DataTypes.INTEGER },
    pe_acta_jd:             { type: DataTypes.INTEGER },
    pe_nombre_funcionario:  { type: DataTypes.STRING },
    pe_cargo_funcionario:   { type: DataTypes.STRING },
    id_personalrecibe:      { type: DataTypes.INTEGER },
    id_estado_seg:          { type: DataTypes.INTEGER },
    seg_obs:                { type: DataTypes.STRING },
    id_usuario:             { type: DataTypes.INTEGER },
    fecha_alta:             { type: DataTypes.STRING },
    fecha_modif:            { type: DataTypes.STRING },
    status:                 { type: DataTypes.INTEGER },
    delfoliojd_bol:         { type: DataTypes.INTEGER },
    alfoliojd_bol:          { type: DataTypes.INTEGER },
    delfoliodip_bol:        { type: DataTypes.INTEGER },
    alfoliodip_bol:         { type: DataTypes.INTEGER },
    id_casilla1:            { type: DataTypes.STRING },
    tipo_casilla:           { type: DataTypes.STRING },
    ext_contigua:           { type: DataTypes.INTEGER },
    cant_bol2:              { type: DataTypes.INTEGER },
    delfolio_bol2:          { type: DataTypes.INTEGER },
    alfolio_bol2:           { type: DataTypes.INTEGER },
    cant_act_matele:        { type: DataTypes.TEXT },
    delfolio_bol3:          { type: DataTypes.INTEGER },
    alfolio_bol3:           { type: DataTypes.INTEGER },
}, 
{
    freezeTableName: true
});

module.exports = {
    sedimde_enc_seguimientoMSSQL
};