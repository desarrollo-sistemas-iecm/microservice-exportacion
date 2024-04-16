const { response } = require("express");
const moment = require('moment');
const fs = require('fs');
const ftp = require("basic-ftp");
const { servers } = require('../helpers/servidores')

let Client = require('ssh2-sftp-client');

/**
 * Modelos de la base de datos de MSSQL del servidor 145.0.40.23
 */
const { scd_casillasMSSQL } = require('../models/mssql/prep/scd_casillas.model');
const { prep_votosMSSQL } = require('../models/mssql/prep/prep_votos.model');
const { cain_cat_delegacionMSSQL } = require('../models/mssql/prep/cain_cat_delegacion.model');
const { cain_cat_dist_deleMSSQL } = require('../models/mssql/prep/cain_cat_dist_dele.model');
const { cain_cat_distritoMSSQL } = require('../models/mssql/prep/cain_cat_distrito.model');
const { prep_inconsistenciasMSSQL } = require('../models/mssql/prep/prep_inconsistencias.model');
const { prep_cat_inconsistenciasMSSQL } = require('../models/mssql/prep/prep_cat_inconsistencias.model');
const { dig_actas_prepMSSQL } = require('../models/mssql/prep/dig_actas_prep.model');
const { scd_candidatos_jdelMSSQL } = require('../models/mssql/prep/scd_candidatos_jdel.model');
const { scd_candidatos_jgobMSSQL } = require('../models/mssql/prep/scd_candidatos_jgob.model');
const { scd_candidatos_mrMSSQL } = require('../models/mssql/prep/scd_candidatos_mr.model');

/**
 * Modelos de la base de datos de MSSQL del servidor 145.0.40.72
 */
const { sedimde_enc_seguimientoMSSQL } = require('../models/mssql/prep/sedimde_enc_seguimiento.model');


/** 
 * Modelos de la base de datos SQLite que se exportan
*/
const { prep_votosSQLite } = require('../models/sqlite/prep/prep_votos.model');
const { scd_casillasSQLite } = require('../models/sqlite/prep/scd_casillas.model');
const { cain_cat_delegacionSQLite } = require('../models/sqlite/prep/cain_cat_delegacion.model');
const { cain_cat_dist_deleSQLite } = require('../models/sqlite/prep/cain_cat_dist_dele.model');
const { cain_cat_distritoSQLite } = require('../models/sqlite/prep/cain_cat_distrito.model');
const { prep_inconsistenciasSQLite } = require('../models/sqlite/prep/prep_inconsistencias.model');
const { prep_cat_inconsistenciasSQLite } = require('../models/sqlite/prep/prep_cat_inconsistencias.model');
const { dig_actas_prepSQLite } = require('../models/sqlite/prep/dig_actas_prep.model');
const { sedimde_enc_seguimientoSQLite } = require('../models/sqlite/prep/sedimde_enc_seguimiento.model');
const { scd_candidatos_jdelSQLite } = require('../models/sqlite/prep/scd_candidatos_jdel.model');
const { scd_candidatos_jgobSQLite } = require('../models/sqlite/prep/scd_candidatos_jgob.model');
const { scd_candidatos_mrSQLite } = require('../models/sqlite/prep/scd_candidatos_mr.model');

/**
 * Modelos de la base de datos SQLite propias
 */
const { corteSQLite } = require('../models/sqlite/prep/corte.model');
const { nourbanasLite } = require('../models/sqlite/prep/nourbanas.model');

/**
 * JSON temporal para tabla nourbanas. Por confirmar origen de datos final
 */
const { nourbanas } = require('../utils/nourbanas');



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
            await cain_cat_delegacionSQLite.destroy({ where : {}});
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
                // fecha_alta: moment(element.fecha_alta).format("YYYY-MM-DD HH:mm:ss.SSS"),
                // fecha_modifica: moment(element.fecha_modifica).format("YYYY-MM-DD HH:mm:ss.SSS"),
                // fecha_baja: moment(element.fecha_baja).format("YYYY-MM-DD HH:mm:ss.SSS"),
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
            await cain_cat_dist_deleSQLite.destroy({ where : {}});
            return res.send({
                ok: true,
                msg: 'Sin datos en cain_cat_dist_dele'
            });
        }
        datosMSSQL.forEach((element)=>{
            datos.push({
                id_distrito: element.id_distrito,   
                id_delegacion: element.id_delegacion,  
                // fecha_alta: moment(element.fecha_alta).format("YYYY-MM-DD HH:mm:ss.SSS"),
                // fecha_modifica: moment(element.fecha_modifica).format("YYYY-MM-DD HH:mm:ss.SSS"),
                // fecha_baja: element.fecha_baja != '' ? moment(element.fecha_baja).format("YYYY-MM-DD HH:mm:ss.SSS") : '',
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
            msg: 'Se ha realizado la migracion de cain_cat_dist_dele',
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
            await cain_cat_distritoSQLite.destroy({ where : {}});
            return res.send({
                ok: true,
                msg: 'Sin datos en cain_cat_distrito'
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
                // num_envio: element.num_envio,
                // fecha_alta: moment(element.fecha_alta).format("YYYY-MM-DD HH:mm:ss.SSS"),
                // fecha_modifica: moment(element.fecha_modifica).format("YYYY-MM-DD HH:mm:ss.SSS"),
                // fecha_baja: element.fecha_baja != '' ? moment(element.fecha_baja).format("YYYY-MM-DD HH:mm:ss.SSS") : '',
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
            msg: 'Se ha realizado la migracion de cain_cat_distrito',
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
 * Migración de información de la tabla dig_actas_prepMSSQL
 * @param {*} req 
 * @param {*} res 
 * @returns Respuesta de éxito o error, booleano de resultado de transacción y un mensaje personalizado 
 */
const Migracion_dig_actas_prep = async (req, res = response) => {
    let datos = [];
    try{
        const datosMSSQL = await dig_actas_prepMSSQL.findAll();
        if(datosMSSQL.length == 0){
            await dig_actas_prepSQLite.destroy({ where : {}});
            return res.send({
                ok: true,
                msg: 'Sin datos en dig_actas_prep'
            });
        }
        datosMSSQL.forEach((element)=>{
            datos.push({
                id_acta:            element.id_acta,
                id_distrito:        element.id_distrito,
                acta:               element.acta,
                img_nombre_jgob:    element.img_nombre_jgob,
                img_nombre_alc:     element.img_nombre_alc,
                img_nombre_dmr:     element.img_nombre_dmr,
                img_nombre_rp:      element.img_nombre_rp,
                id_usuario:         element.id_usuario,
                estatus:            element.estatus,
                md5_img_jgob:       element.md5_img_jgob,
                md5_img_alc:        element.md5_img_alc,
                md5_img_dmr:        element.md5_img_dmr,
                md5_img_rp:         element.md5_img_rp,
                especial:           element.especial,
                fecha_jgob:         element.fecha_jgob != null && element.fecha_jgob != '' && element.fecha_jgob != 'Invalid date' ? moment(element.fecha_jgob).format("YYYY-MM-DD HH:mm:ss") : '',
                fecha_alc:          element.fecha_alc != null && element.fecha_alc != '' && element.fecha_alc != 'Invalid date' ? moment(element.fecha_alc).format("YYYY-MM-DD HH:mm:ss") : '',
                fecha_dmr:          element.fecha_dmr != null && element.fecha_dmr != '' && element.fecha_dmr != 'Invalid date' ? moment(element.fecha_dmr).format("YYYY-MM-DD HH:mm:ss") : '',
                fecha_rp:           element.fecha_rp != null && element.fecha_rp != '' && element.fecha_rp != 'Invalid date' ? moment(element.fecha_rp).format("YYYY-MM-DD HH:mm:ss") : '',
                fechaRecepcion:     element.fechaRecepcion != null && element.fechaRecepcion != '' && element.fechaRecepcion != 'Invalid date' ? moment(element.fechaRecepcion).format("YYYY-MM-DD HH:mm:ss") : '',
                // fecha_jgob:         element.fecha_jgob,
                // fecha_alc:          element.fecha_alc,
                // fecha_dmr:          element.fecha_dmr,
                // fecha_rp:           element.fecha_rp,
                // fechaRecepcion:     element.fechaRecepcion,
                usrRecepcion:       element.usrRecepcion,
                id_delegacion:      element.id_delegacion,
                id_sesion:          element.id_sesion,
            })
        });
        console.log(datosMSSQL.length,' registros encontrados')
        //Limpiado de infromación
        await dig_actas_prepSQLite.destroy({ where : {}});
        await dig_actas_prepSQLite.bulkCreate(datos);
        //const datosSQLite = await cain_cat_dist_deleSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de dig_actas_prep',
            //datosSQLite,
            //datosSQLite
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({
            ok: false,
            msg: 'Error crítico en la migracion',
        }); 
    }
}

/**
 * Migración de información de la tabla nourbanas
 * @param {*} req 
 * @param {*} res 
 * @returns Respuesta de éxito o error, booleano de resultado de transacción y un mensaje personalizado 
 */
const Migracion_nourbanas = async (req, res = response) => {
    let datos = [];
    try{
        // const datosMSSQL = await .findAll();
        const datosMSSQL = nourbanas;
        if(datosMSSQL.length == 0){
            // await .destroy({ where : {}});
            return res.send({
                ok: true,
                msg: 'Sin datos en nourbanas'
            });
        }
        datosMSSQL.forEach((element)=>{
            datos.push({
                iddistrito:    element.iddistrito,
                idseccion:     element.idseccion,
                idcasilla:     element.idcasilla,
                tiposeccion:   element.tiposeccion,
                clave_mdc:     element.clave_mdc
            })
        });
        console.log(datosMSSQL.length,' registros encontrados')
        //Limpiado de infromación
        await nourbanasLite.destroy({ where : {}});
        await nourbanasLite.bulkCreate(datos);
        //const datosSQLite = await cain_cat_dist_deleSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de nourbanas',
            //datosSQLite,
            //datosSQLite
        });
    }catch(error){
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
        const datosMSSQL = await prep_cat_inconsistenciasMSSQL.findAll();
        if (datosMSSQL.length == 0){
            await prep_cat_inconsistenciasSQLite.destroy({ where : {}});
            return res.send({
                ok: true,
                msg: 'Sin datos en prep_cat_inconsistencias'
            });
        }
        datosMSSQL.forEach((element)=>{
            datos.push({
                id_inconsistencia: element.id_inconsistencia,   
                tipo_inconsistencia: element.tipo_inconsistencia,
                descripcion: element.descripcion,
                descripcion_abrev: element.descripcion_abrev,
                id_usuario: element.id_usuario,
                // fecha_alta: moment(element.fecha_alta).format("YYYY-MM-DD HH:mm:ss.SSS"),
                // fecha_modifica: moment(element.fecha_modifica).format("YYYY-MM-DD HH:mm:ss.SSS"),
                fecha_alta: element.fecha_alta,
                fecha_modifica: element.fecha_modifica,
                estatus: element.estatus,
            })
        })
        console.log(datosMSSQL.length,' registros encontrados')
        //Limpiado de infromación
        await prep_cat_inconsistenciasSQLite.destroy({ where : {}});
        await prep_cat_inconsistenciasSQLite.bulkCreate(datos);
        //const datosSQLite = await cain_cat_dist_deleSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de prep_cat_inconsistencias',
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
 * Migración de información de la tabla prep_inconsistencias
 * @param {*} req 
 * @param {*} res 
 * @returns Respuesta de éxito o error, booleano de resultado de transacción y un mensaje personalizado 
 */
const Migracion_prep_inconsistencias = async (req, res = response) => {
    let datos =[];
    try {
        const datosMSSQL = await prep_inconsistenciasMSSQL.findAll();
        if (datosMSSQL.length == 0){
            await prep_inconsistenciasSQLite.destroy({ where : {}});
            return res.send({
                ok: true,
                msg: 'Sin datos en prep_inconsistencias'
            });
        }
        datosMSSQL.forEach((element)=>{
            datos.push({
                id_distrito: element.id_distrito,   
                id_delegacion: element.id_delegacion,
                id_seccion: element.id_seccion,
                tipo_casilla: element.tipo_casilla,
                id_tipo_eleccion: element.id_tipo_eleccion,
                tipo_acta: element.tipo_acta,
                id_inconsistencia: element.id_inconsistencia,
                campo: element.campo,
                id_usuario: element.id_usuario,
                fecha_alta: moment(element.fecha_alta).format("YYYY-MM-DD HH:mm:ss.SSS"),
                fecha_modifica: moment(element.fecha_modifica).format("YYYY-MM-DD HH:mm:ss.SSS"),
                estatus: element.estatus,
            })
        })
        console.log(datosMSSQL.length,' registros encontrados')
        //Limpiado de infromación
        await prep_inconsistenciasSQLite.destroy({ where : {}});
        await prep_inconsistenciasSQLite.bulkCreate(datos);
        //const datosSQLite = await cain_cat_dist_deleSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de prep_inconsistencias',
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
            await scd_casillasSQLite.destroy({ where : {}});
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
                fecha_alta: moment(element.fecha_alta).format("YYYY-MM-DD HH:mm:ss.SSS"),
                fecha_modif: moment(element.fecha_modif).format("YYYY-MM-DD HH:mm:ss.SSS"),
                // fecha_alta: element.fecha_alta,
                // fecha_modif: element.fecha_modif,
                estatus:element.estatus,
                // acta_jg:element.acta_jg,
                // acta_dmr:element.acta_dmr,
                // acta_rp:element.acta_rp,
                // acta_alcalde:  element.acta_alcalde
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
 * Migración de información de la tabla scd_candidatos_jdel
 * @param {*} req 
 * @param {*} res 
 * @returns Respuesta de éxito o error, booleano de resultado de transacción y un mensaje personalizado 
 */
const Migracion_scd_candidatos_jdel = async (req, res = response) => {
    let datos = [];
    try {
        const datosMSSQL = await scd_candidatos_jdelMSSQL.findAll();
        if (datosMSSQL.length == 0){
            await scd_candidatos_jdelSQLite.destroy({ where : {}});
            return res.send({
                ok: true,
                msg: 'Sin datos en scd_candidatos_jdel'
            });
        }
        datosMSSQL.forEach((element)=>{
            datos.push({
                id_delegacion: element.id_delegacion,  
                id_participante: element.id_participante,
                tipo_participante: element.tipo_participante,
                prelacion: element.prelacion,
                integrantes: element.integrantes,
                campo_votos: element.campo_votos,
                fecha_alta: moment(element.fecha_alta).format("YYYY-MM-DD HH:mm:ss.SSS"),
            })
        })
        console.log(datosMSSQL.length,' registros encontrados')
        //Limpiado de infromación
        await scd_candidatos_jdelSQLite.destroy({ where : {}});
        await scd_candidatos_jdelSQLite.bulkCreate(datos);
        //const datosSQLite = await scd_casillasSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de scd_candidatos_jdel',
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
 * Migración de información de la tabla scd_candidatos_jgob
 * @param {*} req 
 * @param {*} res 
 * @returns Respuesta de éxito o error, booleano de resultado de transacción y un mensaje personalizado 
 */
const Migracion_scd_candidatos_jgob = async (req, res = response) => {
    let datos = [];
    try {
        const datosMSSQL = await scd_candidatos_jgobMSSQL.findAll();
        if (datosMSSQL.length == 0){
            await scd_candidatos_jgobSQLite.destroy({ where : {}});
            return res.send({
                ok: true,
                msg: 'Sin datos en scd_candidatos_jgob'
            });
        }
        datosMSSQL.forEach((element)=>{
            datos.push({
                id_participante: element.id_participante,
                tipo_participante: element.tipo_participante,
                prelacion: element.prelacion,
                integrantes: element.integrantes,
                campo_votos: element.campo_votos,
                fecha_alta: moment(element.fecha_alta).format("YYYY-MM-DD HH:mm:ss.SSS"),
            })
        })
        console.log(datosMSSQL.length,' registros encontrados')
        //Limpiado de infromación
        await scd_candidatos_jgobSQLite.destroy({ where : {}});
        await scd_candidatos_jgobSQLite.bulkCreate(datos);
        //const datosSQLite = await scd_casillasSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de scd_candidatos_jgob',
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
 * Migración de información de la tabla scd_candidatos_mr
 * @param {*} req 
 * @param {*} res 
 * @returns Respuesta de éxito o error, booleano de resultado de transacción y un mensaje personalizado 
 */
const Migracion_scd_candidatos_mr = async (req, res = response) => {
    let datos = [];
    try {
        const datosMSSQL = await scd_candidatos_mrMSSQL.findAll();
        if (datosMSSQL.length == 0){
            await scd_candidatos_mrSQLite.destroy({ where : {}});
            return res.send({
                ok: true,
                msg: 'Sin datos en scd_candidatos_mr'
            });
        }
        datosMSSQL.forEach((element)=>{
            datos.push({
                id_distrito: element.id_distrito,
                id_participante: element.id_participante,
                tipo_participante: element.tipo_participante,
                prelacion: element.prelacion,
                integrantes: element.integrantes,
                campo_votos: element.campo_votos,
                fecha_alta: moment(element.fecha_alta).format("YYYY-MM-DD HH:mm:ss.SSS"),
            })
        })
        console.log(datosMSSQL.length,' registros encontrados')
        //Limpiado de infromación
        await scd_candidatos_mrSQLite.destroy({ where : {}});
        await scd_candidatos_mrSQLite.bulkCreate(datos);
        //const datosSQLite = await scd_casillasSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de scd_candidatos_mr',
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
            await prep_votosSQLite.destroy({ where : {}});
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
                votacion_total: element.votacion_total,
                boletas_sob: element.boletas_sob,
                ciudadanos_votaron: element.ciudadanos_votaron,
                representantes_votaron:element.representantes_votaron,
                total_votaron: element.total_votaron,
                boletas_extraidas: element.boletas_extraidas,
                total_sobres: element.total_sobres,
                id_usuario: element.id_usuario,
                fecha_alta: moment(element.fecha_alta).format("YYYY-MM-DD HH:mm:ss.SSS"),
                fecha_modif: moment(element.fecha_modif).format("YYYY-MM-DD HH:mm:ss.SSS"),
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

/**
 * Migración de información de la tabla sedimde_enc_seguimientoMSSQL
 * @param {*} req 
 * @param {*} res 
 * @returns Respuesta de éxito o error, booleano de resultado de transacción y un mensaje personalizado 
 */
const Migracion_sedimde_enc_seguimiento = async (req, res = response) => {
    let datos = [];
    try{
        const datosMSSQL = await sedimde_enc_seguimientoMSSQL.findAll();
        if(datosMSSQL.length == 0){
            await sedimde_enc_seguimientoSQLite.destroy({ where : {}});
            return res.send({
                ok: true,
                msg: 'Sin datos en sedimde_enc_seguimiento'
            });
        }
        datosMSSQL.forEach((element)=>{
            datos.push({
                id_delegacion:          element.id_delegacion,
                id_distrito:            element.id_distrito,
                id_seccion:             element.id_seccion,
                id_casilla:             element.id_casilla,
                id_distrito_asistente:  element.id_distrito_asistente,
                id_asistente:           element.id_asistente,
                nombre_funcionario:     element.nombre_funcionario,
                cant_bol:               element.cant_bol,
                delfolio_bol:           element.delfolio_bol,
                alfolio_bol:            element.alfolio_bol,
                deletra_ln:             element.deletra_ln,
                aletra_ln:              element.aletra_ln,
                canthojas_ln:           element.canthojas_ln,
                fecha_prog:             element.fecha_prog,
                lugar_prog:             element.lugar_prog,
                dm_entregado:           element.dm_entregado,
                dm_fecha_entregado:     element.dm_fecha_entregado,
                dm_lugar_entregado:     element.dm_lugar_entregado,
                dm_nombre_funcionario:  element.dm_nombre_funcionario,
                id_personalentrega:     element.id_personalentrega,
                cm_llegada:             element.cm_llegada,
                cm_fecha_llegada:       element.cm_fecha_llegada,
                pe_llegada:             element.pe_llegada,
                pe_fecha_llegada:       element.pe_fecha_llegada,
                pe_recibido:            element.pe_recibido,
                pe_fecha_recibido:      element.pe_fecha_recibido,
                pe_alterado:            element.pe_alterado,
                pe_causa:               element.pe_causa,
                pe_acta_jg:             element.pe_acta_jg,
                pe_acta_damr:           element.pe_acta_damr,
                pe_acta_darp:           element.pe_acta_darp,
                pe_acta_jd:             element.pe_acta_jd,
                pe_nombre_funcionario:  element.pe_nombre_funcionario,
                pe_cargo_funcionario:   element.pe_cargo_funcionario,
                id_personalrecibe:      element.id_personalrecibe,
                id_estado_seg:          element.id_estado_seg,
                seg_obs:                element.seg_obs,
                id_usuario:             element.id_usuario,
                fecha_alta:             moment(element.fecha_alta).format("YYYY-MM-DD HH:mm"),
                fecha_modif:            moment(element.fecha_modif).format("YYYY-MM-DD HH:mm"),
                status:                 element.status,
                delfoliojd_bol:         element.delfoliojd_bol,
                alfoliojd_bol:          element.alfoliojd_bol,
                delfoliodip_bol:        element.delfoliodip_bol,
                alfoliodip_bol:         element.alfoliodip_bol,
                id_casilla1:            element.id_casilla1,
                tipo_casilla:           element.tipo_casilla,
                ext_contigua:           element.ext_contigua,
                cant_bol2:              element.cant_bol2,
                delfolio_bol2:          element.delfolio_bol2,
                alfolio_bol2:           element.alfolio_bol2,
                cant_act_matele:        element.cant_act_matele,
                delfolio_bol3:          element.delfolio_bol3,
                alfolio_bol3:           element.alfolio_bol3
            })
        });
        console.log(datosMSSQL.length,' registros encontrados')
        //Limpiado de infromación
        await sedimde_enc_seguimientoSQLite.destroy({ where : {}});
        await sedimde_enc_seguimientoSQLite.bulkCreate(datos);
        //const datosSQLite = await cain_cat_dist_deleSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de sedimde_enc_seguimiento',
            //datosSQLite,
            //datosSQLite
        });
    }catch(error){
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

const CrearCorte = async(req, res) =>{
    const ruteFile = 'db3/prep/database.db3';
    const tls = {
        rejectUnauthorized: false, // Opcional: si el certificado no está firmado por una autoridad de confianza
        ca: fs.readFileSync('credentials/22/solicitud.csr'), // Ruta al archivo CRT del certificado CA
        cert: fs.readFileSync('credentials/22/certificado.crt'), // Ruta al archivo CRT del certificado del cliente
        key: fs.readFileSync('credentials/22/clave.key'), // Ruta al archivo KEY de la clave privada del cliente
    }
    try {
        fs.copyFile('db3/prep/database.db3', 'db3/prep/bitacora/database.db3', (err) => {
            if (err) throw err;
            console.log('Base de datos PREP db3 ha sido copiada a la bitacora');
            fs.rename('db3/prep/bitacora/database.db3',  `db3/prep/bitacora/database-${Date.now()}.db3`, (err) => {
                if (err) throw err;
                console.log('Base de datos PREP db3 ha sido renombrado con fecha y hora de creación');
            });
        });
        console.log('Siguiente paso');
        for (const server of servers) {
            // const client = new ftp.Client();
            // client.ftp.verbose = true;

            let sftp = new Client();
            try {
                // await client.access({
                //     host: server.host,
                //     port: server.port,
                //     user: server.user,
                //     password: server.password,
                //     secure: server.secure,
                //     tls: tls
                // });

                await sftp.connect({
                    host: server.host,
                    port: server.port,
                    username: server.user,
                    password:  server.password
                }).then(() => {
                    console.log(`Conectado a ${server.name}`);
                    const ruta = server.route;
                    // sftp.delete(`${ruta}database.db3`);
                    // console.log(`Archivo eliminado para sustituir de ${name}`);
                    return sftp.exists(`${ruta}prep/database.db3`).then(async (exists) => {
                        if (exists) {
                            console.log('El archivo remoto existe. Eliminándolo...');
                            // Eliminar el archivo remoto
                            moment.locale('es');
                            const actualTime = moment().format("LL");
                            const actualTimeDD = moment().format("DD");
                            const actualTimeMM = moment().format("MM");
                            const actualTimeYYYY = moment().format("YYYY");
                            const actualTimeHoras = moment().format("HH:mm");
                            const actualTimeHora = moment().format("HH");
                            const actualTimeMinuto = moment().format("mm");
                            const actualTimeSegundo = moment().format("ss");

                            console.log({ 
                                'corte_fecha':actualTime, 
                                'corte_hora':  actualTimeHoras, 
                                'dia': actualTimeDD, 
                                'mes': actualTimeMM, 
                                'anio': actualTimeYYYY, 
                                'hora': actualTimeHora,
                                'minuto': actualTimeMinuto,
                                'segundo': actualTimeSegundo,
                            });
                            const datosSQLite = await corteSQLite.findAll();

                            if (datosSQLite.length == 0){
                                await corteSQLite.create({ 
                                    'corte_fecha':actualTime, 
                                    'corte_hora':  actualTimeHoras, 
                                    'dia': actualTimeDD, 
                                    'mes': actualTimeMM, 
                                    'anio': actualTimeYYYY, 
                                    'hora': actualTimeHora,
                                    'minuto': actualTimeMinuto,
                                    'segundo': actualTimeSegundo,
                                });
                            } else {
                                await corteSQLite.update({ 
                                    'corte_fecha':actualTime, 
                                    'corte_hora':  actualTimeHoras, 
                                    'dia': actualTimeDD, 
                                    'mes': actualTimeMM, 
                                    'anio': actualTimeYYYY, 
                                    'hora': actualTimeHora,
                                    'minuto': actualTimeMinuto,
                                    'segundo': actualTimeSegundo,
                                }, { where: {} });
                            }
                            return sftp.delete(`${ruta}prep/database.db3`);
                        } else {
                            console.log('El archivo remoto no existe.');
                            return Promise.resolve(); // Continuar sin eliminar el archivo
                        }
                    }).then(() => {
                        console.log('Subiendo nuevo archivo...');
                        // Subir el nuevo archivo
                        return sftp.put(fs.createReadStream(ruteFile), `${ruta}prep/database.db3`);
                    });
                }).then((data) => {
                    console.log(`Archivo cargado al servidor ${server.name}`);
                }).catch((err) => {
                    console.error('Error al indicar archivo:', err);
                    sftp.end();
                }).finally(() => {
                    // Cerrar la conexión SFTP
                    sftp.end();
                });
                // console.log(`Conectado a ${server.name}`);
                // const ruta = server.route;
    
                // await client.uploadFrom(fs.createReadStream(ruteFile), `${ruta}database.db3`);

    
                // console.log(`Archivo subido a ${server.name}`);
    
                // client.close();
                // console.log(`Desconectado de ${server.name}`);
            } catch (err) {
                console.error(`Error en la transferencia a ${server.name}:`, err);
            }
        }
        
        
        return res.send({
            ok: true,
            msg: 'Se ha creado el corte y exportado la Base de Datos PREP'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            msg: 'Error con la conexión de la BD',
        }); 
    }
}

module.exports = {
    Migracion_cain_cat_delegacion,
    Migracion_cain_cat_dist_dele,
    Migracion_cain_cat_distrito,
    Migracion_dig_actas_prep,
    Migracion_nourbanas,
    Migracion_prep_cat_inconsistencias,
    Migracion_prep_inconsistencias,
    Migracion_scd_casillas,
    Migracion_prep_votos,
    Migracion_scd_candidatos_jdel,
    Migracion_scd_candidatos_jgob,
    Migracion_scd_candidatos_mr,
    Migracion_sedimde_enc_seguimiento,
    ConsultaVotos,
    CrearCorte
}