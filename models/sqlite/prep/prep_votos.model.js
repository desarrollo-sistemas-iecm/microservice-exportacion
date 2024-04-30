const { DataTypes } = require("sequelize");
const { sqliteconnector } = require("../../../database/configLite");

const prep_votosSQLite = sqliteconnector.define('prep_votos', {
    id_distrito:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    id_delegacion:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
    },  
    id_seccion:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    id_tipo_eleccion:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    tipo_casilla:{ 
        type: DataTypes.STRING,
        primaryKey: true,
    },
    clave_mdc:          { type: DataTypes.STRING },
    tipo_acta:          { type: DataTypes.INTEGER },
    votos_part_1:       { type: DataTypes.INTEGER },
    votos_part_2:       { type: DataTypes.INTEGER },
    votos_part_3:       { type: DataTypes.INTEGER },
    votos_part_4:       { type: DataTypes.INTEGER },
    votos_part_5:       { type: DataTypes.INTEGER },
    votos_part_6:       { type: DataTypes.INTEGER },
    votos_part_7:       { type: DataTypes.INTEGER },
    votos_part_8:       { type: DataTypes.INTEGER },
    votos_part_9:       { type: DataTypes.INTEGER },
    votos_part_10:      { type: DataTypes.INTEGER },
    votos_part_11:      { type: DataTypes.INTEGER },
    votos_part_12:      { type: DataTypes.INTEGER },
    votos_part_13:      { type: DataTypes.INTEGER },
    votos_part_14:      { type: DataTypes.INTEGER },
    votos_part_15:      { type: DataTypes.INTEGER },
    votos_part_16:      { type: DataTypes.INTEGER },
    votos_part_17:      { type: DataTypes.INTEGER },
    votos_part_18:      { type: DataTypes.INTEGER },
    votos_part_19:      { type: DataTypes.INTEGER },
    votos_part_20:      { type: DataTypes.INTEGER },
    votos_part_21:      { type: DataTypes.INTEGER },
    votos_part_22:      { type: DataTypes.INTEGER },
    votos_part_23:      { type: DataTypes.INTEGER },
    votos_part_24:      { type: DataTypes.INTEGER },
    votos_part_25:      { type: DataTypes.INTEGER },
    votos_part_26:      { type: DataTypes.INTEGER },
    votos_part_27:      { type: DataTypes.INTEGER },
    votos_part_28:      { type: DataTypes.INTEGER },
    votos_part_29:      { type: DataTypes.INTEGER },
    votos_part_30:      { type: DataTypes.INTEGER },
    votos_part_31:      { type: DataTypes.INTEGER },
    votos_part_32:      { type: DataTypes.INTEGER },
    votos_part_33:      { type: DataTypes.INTEGER },
    votos_part_34:      { type: DataTypes.INTEGER },
    votos_part_35:      { type: DataTypes.INTEGER },
    total_votos_cc1:    { type: DataTypes.INTEGER },
    total_votos_cc2:    { type: DataTypes.INTEGER },
    total_votos_cc3:    { type: DataTypes.INTEGER },
    total_votos_cc4:    { type: DataTypes.INTEGER },
    total_votos_cc5:    { type: DataTypes.INTEGER },
    total_votos_cc6:    { type: DataTypes.INTEGER },
    total_votos_cc7:    { type: DataTypes.INTEGER },
    total_votos_cc8:    { type: DataTypes.INTEGER },
    total_votos_cc9:    { type: DataTypes.INTEGER },
    votos_cand_no_reg:  { type: DataTypes.INTEGER },
    votos_nulos:        { type: DataTypes.INTEGER },
    boletas_sob:        { type: DataTypes.INTEGER },
    votacion_total:     { type: DataTypes.INTEGER },
    ciudadanos_votaron: { type: DataTypes.INTEGER },
    representantes_votaron:{ type: DataTypes.INTEGER },
    total_votaron:      { type: DataTypes.INTEGER },
    boletas_extraidas:  { type: DataTypes.INTEGER },
    total_sobres:       { type: DataTypes.INTEGER },
    id_usuario:         { type: DataTypes.INTEGER },
    fecha_alta:         { type: DataTypes.STRING},
    fecha_modif:        { type: DataTypes.STRING},
    estatus:            { type: DataTypes.CHAR},
    validado:           { type: DataTypes.CHAR},
    editado:            { type: DataTypes.CHAR},
    inconsistencia:     { type: DataTypes.INTEGER },
    contabilizar:       { type: DataTypes.CHAR},
    capturado_por:      { type: DataTypes.INTEGER },
    en_verificacion:    { type: DataTypes.INTEGER },
    ue_identificador_comprobante:   { type: DataTypes.CHAR },
    ue_circunscripcion_federal:     { type: DataTypes.STRING },
    ue_id_casilla:                  { type: DataTypes.STRING },
    ue_tipo_casilla:                { type: DataTypes.CHAR },
    ue_id_ext_contigua:             { type: DataTypes.STRING },
    ue_tipo_documento:              { type: DataTypes.STRING },
    ue_personas_votaron:            { type: DataTypes.STRING },
    ue_identificacion:              { type: DataTypes.STRING },
    ue_votos_partidos:              { type: DataTypes.STRING },
    ue_version_software:            { type: DataTypes.STRING },
    ue_fecha_impresion:             { type: DataTypes.STRING },
    ue_codigo_integridad:           { type: DataTypes.STRING },
    ue_qr:                          { type: DataTypes.STRING }
}, 
{
    freezeTableName: true,
    indexes:[
        {
            name: 'idx_del_dto_sec',
            fields:['id_distrito', 'id_delegacion', 'id_seccion']
        },
        {
            name: 'idx_del_dto_sec_cas',
            fields:['id_distrito', 'id_delegacion', 'id_seccion', 'tipo_casilla']
        },
        {
            name: 'idx_delgacion',
            fields:['id_delegacion']
        },
        {
            name: 'idx_dto',
            fields:['id_distrito']
        },
        {
            name: 'idx_tipelec_sec',
            fields:['id_tipo_eleccion', 'id_seccion']
        },
        {
            name: 'idx_tipo_elec',
            fields:['id_tipo_eleccion']
        }
    ]
});

module.exports = {
    prep_votosSQLite
};