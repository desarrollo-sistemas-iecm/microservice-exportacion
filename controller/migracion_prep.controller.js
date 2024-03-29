const { response } = require("express");
/**
 * Modelos de la base de datos de MSSQL
 */
const { scd_casillasMSSQL } = require('../models/mssql/prep/scd_casillas.model');
const { prep_votosMSSQL } = require('../models/mssql/prep/prep_votos.model');
const { cain_cat_delegacionMSSQL } = require('../models/mssql/prep/cain_cat_delegacion.model');
const { cain_cat_dist_deleMSSQL } = require('../models/mssql/prep/cain_cat_dist_dele.model');
const { cain_cat_distritoMSSQL } = require('../models/mssql/prep/cain_cat_distrito.model');
const { prep_inconsistenciasMSSQL } = require('../models/mssql/prep/prep_inconsistencias.model');
/** */
const { prep_votosSQLite } = require('../models/sqlite/prep/prep_votos.model');
const { scd_casillasSQLite } = require('../models/sqlite/prep/scd_casillas.model');
const { cain_cat_delegacionSQLite } = require('../models/sqlite/prep/cain_cat_delegacion.model');
const { cain_cat_dist_deleSQLite } = require('../models/sqlite/prep/cain_cat_dist_dele.model');
const { cain_cat_distritoSQLite } = require('../models/sqlite/prep/prep_inconsistencias.model');
const { prep_inconsistenciasSQLite } = require('../models/sqlite/prep/prep_inconsistencias.model');

/**
 * Migración de información de la tabla cain_cat_delegacion
 * @param {*} req 
 * @param {*} res 
 * @returns Respuesta de éxito o error, booleano de resultado de transacción y un mensaje personalizado
 */
const Migracion_cain_cat_delegacion = async (req, res = response) => {
    let datos =[];
    try {
        const datosMSSQL = await cain_cat_delegacionMSSQL.findAll();
        if (datosMSSQL.length == 0){
            return res.send({
                ok: true,
                msg: 'Sin datos en cain_cat_delegacion'
            });
        }
        datosMSSQL.forEach((element)=>{
            datos.push({
                id_delegacion: element.id_delegacion,  
                distrito_cab: element.distrito_cab,   
                nombre_delegacion: element.nombre_delegacion,
                fecha_alta: element.fecha_alta,
                fecha_modifica: element.fecha_modifica,
                fecha_baja: element.fecha_baja,
                estatus: element.estatus,
            })
        })
        console.log(datosMSSQL.length,' registros encontrados')
        //Limpiado de infromación
        await cain_cat_delegacionSQLite.destroy({ where : {}});
        await cain_cat_delegacionSQLite.bulkCreate(datos);
        //const datosSQLite = await cain_cat_delegacionSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de cain_cat_delegacion',
            //datosSQLite,
            //datosSQLite
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            msg: 'Error crítico en la migracion',
        }); 
    }
}

/**
 * Migración de información de la tabla cain_cat_dist_dele
 * @param {*} req 
 * @param {*} res 
 * @returns Respuesta de éxito o error, booleano de resultado de transacción y un mensaje personalizado 
 */
const Migracion_cain_cat_dist_dele = async (req, res = response) => {
    let datos =[];
    try {
        const datosMSSQL = await cain_cat_dist_deleMSSQL.findAll();
        if (datosMSSQL.length == 0){
            return res.send({
                ok: true,
                msg: 'Sin datos en cain_cat_delegacion'
            });
        }
        datosMSSQL.forEach((element)=>{
            datos.push({
                id_distrito: element.id_distrito,   
                id_delegacion: element.id_delegacion,  
                fecha_alta: element.fecha_alta,
                fecha_modifica: element.fecha_modifica,
                fecha_baja: element.fecha_baja,
                estatus: element.estatus,
            })
        })
        console.log(datosMSSQL.length,' registros encontrados')
        //Limpiado de infromación
        await cain_cat_dist_deleSQLite.destroy({ where : {}});
        await cain_cat_dist_deleSQLite.bulkCreate(datos);
        //const datosSQLite = await cain_cat_dist_deleSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de cain_cat_delegacion',
            //datosSQLite,
            //datosSQLite
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            msg: 'Error crítico en la migracion',
        }); 
    }
}

/**
 * Migración de información de la tabla cain_cat_distrito
 * @param {*} req 
 * @param {*} res 
 * @returns Respuesta de éxito o error, booleano de resultado de transacción y un mensaje personalizado 
 */
const Migracion_cain_cat_distrito = async (req, res = response) => {
    let datos =[];
    try {
        const datosMSSQL = await cain_cat_distritoMSSQL.findAll();
        if (datosMSSQL.length == 0){
            return res.send({
                ok: true,
                msg: 'Sin datos en cain_cat_delegacion'
            });
        }
        datosMSSQL.forEach((element)=>{
            datos.push({
                id_distrito: element.id_distrito,   
                id_delegacion: element.id_delegacion,
                romano: element.romano,
                direccion: element.direccion,
                colonia: element.colonia,
                cp: element.cp,
                telefono1: element.telefono1,
                telefono2: element.telefono2,
                telefono3: element.telefono3,
                coordinador: element.coordinador,
                secretario: element.secretario,
                num_envio: element.num_envio,
                fecha_alta: element.fecha_alta,
                fecha_modifica: element.fecha_modifica,
                fecha_baja: element.fecha_baja,
                estatus: element.estatus,
            })
        })
        console.log(datosMSSQL.length,' registros encontrados')
        //Limpiado de infromación
        await cain_cat_distritoSQLite.destroy({ where : {}});
        await cain_cat_distritoSQLite.bulkCreate(datos);
        //const datosSQLite = await cain_cat_dist_deleSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de cain_cat_delegacion',
            //datosSQLite,
            //datosSQLite
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            msg: 'Error crítico en la migracion',
        }); 
    }
}

/**
 * Migración de información de la tabla cain_cat_distrito
 * @param {*} req 
 * @param {*} res 
 * @returns Respuesta de éxito o error, booleano de resultado de transacción y un mensaje personalizado 
 */
const Migracion_prep_cat_inconsistencias = async (req, res = response) => {
    let datos =[];
    try {
        const datosMSSQL = await cain_cat_distritoMSSQL.findAll();
        if (datosMSSQL.length == 0){
            return res.send({
                ok: true,
                msg: 'Sin datos en cain_cat_delegacion'
            });
        }
        datosMSSQL.forEach((element)=>{
            datos.push({
                id_distrito: element.id_distrito,   
                id_delegacion: element.id_delegacion,
                romano: element.romano,
                direccion: element.direccion,
                colonia: element.colonia,
                cp: element.cp,
                telefono1: element.telefono1,
                telefono2: element.telefono2,
                telefono3: element.telefono3,
                coordinador: element.coordinador,
                secretario: element.secretario,
                num_envio: element.num_envio,
                fecha_alta: element.fecha_alta,
                fecha_modifica: element.fecha_modifica,
                fecha_baja: element.fecha_baja,
                estatus: element.estatus,
            })
        })
        console.log(datosMSSQL.length,' registros encontrados')
        //Limpiado de infromación
        await cain_cat_distritoSQLite.destroy({ where : {}});
        await cain_cat_distritoSQLite.bulkCreate(datos);
        //const datosSQLite = await cain_cat_dist_deleSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de cain_cat_delegacion',
            //datosSQLite,
            //datosSQLite
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            msg: 'Error crítico en la migracion',
        }); 
    }
}

/**
 * Migración de información de la tabla scd_casillasMSSQL
 * @param {*} req 
 * @param {*} res 
 * @returns Respuesta de éxito o error, booleano de resultado de transacción y un mensaje personalizado 
 */
const Migracion_scd_casillas = async (req, res = response) => {
    let datos =[];
    try {
        const datosMSSQL = await scd_casillasMSSQL.findAll();
        
        if (datosMSSQL.length == 0){
            return res.send({
                ok: true,
                msg: 'Sin datos en scd_casillas'
            });
        }
        datosMSSQL.forEach((element)=>{
            datos.push({
                id_delegacion:element.id_delegacion,  
                id_distrito:element.id_distrito,
                id_seccion:element.id_seccion,
                tipo_casilla:element.tipo_casilla,
                clave_mdc:element.clave_mdc,
                empadronados:element.empadronados,
                lista_nominal:element.lista_nominal,
                id_usuario:element.id_usuario,
                fecha_alta:element.fecha_alta,
                fecha_modif:element.fecha_modif,
                estatus:element.estatus,
                acta_jg:element.acta_jg,
                acta_dmr:element.acta_dmr,
                acta_rp:element.acta_rp,
                acta_alcalde:  element.acta_alcalde
            })
        })
        console.log(datosMSSQL.length,' registros encontrados')
        //Limpiado de infromación
        await scd_casillasSQLite.destroy({ where : {}});
        await scd_casillasSQLite.bulkCreate(datos);
        //const datosSQLite = await scd_casillasSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de scd_casillas',
            //datosSQLite,
            //datosSQLite
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            msg: 'Error crítico en la migracion',
        }); 
    }
    
}

/**
 * Migración de información de la tabla prep_votosMSSQL
 * @param {*} req 
 * @param {*} res 
 * @returns Respuesta de éxito o error, booleano de resultado de transacción y un mensaje personalizado 
 */
const Migracion_prep_votos = async (req, res = response) => {
    let datos =[];
    try {
        const datosMSSQL = await prep_votosMSSQL.findAll();
        if (datosMSSQL.length == 0){
            return res.send({
                ok: true,
                msg: 'Sin datos en prep_votos'
            });
        }
        datosMSSQL.forEach((element)=>{
            datos.push({
                id_delegacion: element.id_delegacion,  
                id_distrito: element.id_distrito,
                id_seccion: element.id_seccion,
                tipo_casilla: element.tipo_casilla,
                id_tipo_eleccion: element.id_tipo_eleccion,
                clave_mdc: element.clave_mdc,
                tipo_acta: element.tipo_acta,
                votos_part_1: element.votos_part_1,
                votos_part_2: element.votos_part_2,
                votos_part_3: element.votos_part_3,
                votos_part_4: element.votos_part_4,
                votos_part_5: element.votos_part_5,
                votos_part_6: element.votos_part_6,
                votos_part_7: element.votos_part_7,
                votos_part_8: element.votos_part_8,
                votos_part_9: element.votos_part_9,
                votos_part_10: element.votos_part_10,
                votos_part_11: element.votos_part_11,
                votos_part_12: element.votos_part_12,
                votos_part_13: element.votos_part_13,
                votos_part_14: element.votos_part_14,
                votos_part_15: element.votos_part_15,
                votos_part_16: element.votos_part_16,
                votos_part_17: element.votos_part_17,
                votos_part_18: element.votos_part_18,
                votos_part_19: element.votos_part_19,
                votos_part_20: element.votos_part_20,
                votos_part_21: element.votos_part_21,
                votos_part_22: element.votos_part_22,
                votos_part_23: element.votos_part_23,
                votos_part_24: element.votos_part_24,
                votos_part_25: element.votos_part_25,
                votos_part_26: element.votos_part_26,
                votos_part_27: element.votos_part_27,
                votos_part_28: element.votos_part_28,
                votos_part_29: element.votos_part_29,
                votos_part_30: element.votos_part_30,
                votos_part_31: element.votos_part_31,
                votos_part_32: element.votos_part_32,
                votos_part_33: element.votos_part_33,
                votos_part_34: element.votos_part_34,
                votos_part_35: element.votos_part_35,
                total_votos_cc1: element.total_votos_cc1,
                total_votos_cc2: element.total_votos_cc2,
                total_votos_cc3: element.total_votos_cc3,
                total_votos_cc4: element.total_votos_cc4,
                total_votos_cc5: element.total_votos_cc5,
                total_votos_cc6: element.total_votos_cc6,
                total_votos_cc7: element.total_votos_cc7,
                total_votos_cc8: element.total_votos_cc8,
                total_votos_cc9: element.total_votos_cc9,
                votos_cand_no_reg:element.votos_cand_no_reg,
                votos_nulos: element.votos_nulos,
                boletas_sob: element.boletas_sob,
                ciudadanos_votaron: element.ciudadanos_votaron,
                representantes_votaron:element.representantes_votaron,
                total_votaron: element.total_votaron,
                boletas_extraidas: element.boletas_extraidas,
                id_usuario: element.id_usuario,
                fecha_alta: element.fecha_alta,
                fecha_modif: element.fecha_modif,
                estatus: element.estatus,
                validado: element.validado,
                editado: element.editado,
                inconsistencia: element.inconsistencia,
                contabilizar: element.contabilizar,
                capturado_por: element.capturado_por,
                en_verificacion: element.en_verificacion
            })
        })
        console.log(datosMSSQL.length,' registros encontrados')
        //Limpiado de infromación
        await prep_votosSQLite.destroy({ where : {}});
        await prep_votosSQLite.bulkCreate(datos);
        //const datosSQLite = await prep_votosSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de prep_votos',
            //datosSQLite,
            //datosSQLite
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            msg: 'Error crítico en la migracion',
        }); 
    }
}

const ConsultaVotos = async(req, res) =>{
    const { id_distrito } = req.body;
    console.log(req.body);
    try {
        const datosMSSQL = await prep_votosMSSQL.findAll({where: {id_distrito: id_distrito}});
        return res.send({
            ok: true,
            msg: 'Datos encontrados en MSSQL',
            datosMSSQL
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            msg: 'Error con la conexión d ela BD',
        }); 
    }
}

module.exports = {
    Migracion_cain_cat_delegacion,
    Migracion_cain_cat_dist_dele,
    Migracion_cain_cat_distrito,
    Migracion_prep_cat_inconsistencias,
    Migracion_scd_casillas,
    Migracion_prep_votos,
    ConsultaVotos
}