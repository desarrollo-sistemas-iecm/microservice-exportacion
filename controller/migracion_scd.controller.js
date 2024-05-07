const { response } = require("express");
const fs = require('fs');
const ftp = require("basic-ftp");
const moment = require('moment');
const { servers } = require('../helpers/servidores')


let Client = require('ssh2-sftp-client');

/**
 * Modelos de la base de datos de MSSQL de 145.0.40.70
 */
const { scd_votosMSSQL } = require('../models/mssql/sicodid/scd_votos.model');

/** 
 * Modelos de la base de datos SQLite a exportar 
 */
const { scd_votosSQLite } = require('../models/sqlite/scd/scd_votos.model');
const { scd_cat_delegacionMSSQL } = require("../models/mssql/sicodid/scd_cat_delegacion.model");
const { scd_cat_delegacionSQLite } = require("../models/sqlite/scd/scd_cat_delegacion.model");
const { scd_cat_dist_deleMSSQL } = require("../models/mssql/sicodid/scd_cat_dist_dele.model");
const { scd_cat_dist_deleSQLite } = require("../models/sqlite/scd/scd_cat_dist_dele.model");
const { scd_cat_distritoMSSQL } = require("../models/mssql/sicodid/scd_cat_distrito.model");
const { scd_cat_distritoSQLite } = require("../models/sqlite/scd/scd_cat_distrito.model");
const { SCD_casillasMSSQL } = require("../models/mssql/sicodid/scd_casillas_SICODID.model");
const { SCD_casillasSQLite } = require("../models/sqlite/scd/scd_casillas.model");
const { scd_candidatos_jdel_SICODIDMSSQL } = require("../models/mssql/sicodid/scd_candidatos_jdel_SICODID.model");
const { scd_candidatos_jdel_SICODIDSQLite } = require("../models/sqlite/scd/scd_candidatos_jdel.model");
const { scd_candidatos_jgo_SICODIDbMSSQL } = require("../models/mssql/sicodid/scd_candidatos_jgob_SICODID.model");
const { scd_candidatos_jgob_SICODIDSQLite } = require("../models/sqlite/scd/scd_candidatos_jgob.model");
const { scd_candidatos_mr_SICODIDMSSQL } = require("../models/mssql/sicodid/scd_candidatos_mr_SICODID.model");
const { scd_candidatos_mrSICODIDSQLite } = require("../models/sqlite/scd/scd_candidatos_mr.model");
const { corteSQLiteSCD } = require("../models/sqlite/scd/corte.model");
const { scd_cat_participantesMSSQL } = require("../models/mssql/sicodid/scd_cat_participantes.model");
const { scd_cat_participantesSQLite } = require("../models/sqlite/scd/scd_cat_participantes.model");
const { nourbanas } = require("../utils/nourbanas");
const { SCDnourbanasLite } = require("../models/sqlite/scd/nourbanas.model");

/**
 * Migración de información de la tabla prep_votosMSSQL
 * @param {*} req 
 * @param {*} res 
 * @returns Respuesta de éxito o error, booleano de resultado de transacción y un mensaje personalizado 
 */
const Migracion_scd_votos = async (req, res = response) => {
    let datos =[];
    try {
        const datosMSSQL = await scd_votosMSSQL.findAll();
        if (datosMSSQL.length == 0){
            await scd_votosSQLite.destroy({ where : {}});
            return res.send({
                ok: true,
                msg: 'Sin datos en scd_votos'
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
                votos_cand_no_reg: element.votos_cand_no_reg,
                votos_nulos: element.votos_nulos,
                votacion_total: element.votacion_total,
                boletas_sob: element.boletas_sob,
                ciudadanos_votaron: element.ciudadanos_votaron,
                representantes_votaron: element.representantes_votaron,
                total_votaron: element.total_votaron,
                boletas_extraidas: element.boletas_extraidas,
                total_sobres: element.total_sobres,
                recuento: element.recuento,
                grupo_trabajo: element.grupo_trabajo,
                punto_recuento: element.punto_recuento,
                id_usuario: element.id_usuario,
                fecha_alta: moment(element.fecha_alta).format("YYYY-MM-DD HH:mm:ss.SSS"),
                fecha_modif: moment(element.fecha_modif).format("YYYY-MM-DD HH:mm:ss.SSS"),
                estatus: element.estatus
            })
        })
        console.log(datosMSSQL.length,' registros encontrados')
        //Limpiado de infromación
        await scd_votosSQLite.destroy({ where : {}});
        await scd_votosSQLite.bulkCreate(datos);
        //const datosSQLite = await prep_votosSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de scd_votos',
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
        const datosMSSQL = await scd_votosMSSQL.findAll({where: {id_distrito: id_distrito}});
        return res.send({
            ok: true,
            msg: 'Datos encontrados en MSSQL',
            datosMSSQL
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            msg: 'Error con la conexión de la BD',
        }); 
    }
}

const CrearCorte = async(req, res) =>{
    const ruteFile = 'db3/scd/database.db3';
    const tls = {
        rejectUnauthorized: false, // Opcional: si el certificado no está firmado por una autoridad de confianza
        ca: fs.readFileSync('credentials/22/solicitud.csr'), // Ruta al archivo CRT del certificado CA
        cert: fs.readFileSync('credentials/22/certificado.crt'), // Ruta al archivo CRT del certificado del cliente
        key: fs.readFileSync('credentials/22/clave.key'), // Ruta al archivo KEY de la clave privada del cliente
    }
    try {
        fs.copyFile('db3/scd/database.db3', 'db3/scd/bitacora/database.db3', (err) => {
            if (err) throw err;
            console.log('Base de datos SICODID db3 ha sido copiada a la bitacora');
            fs.rename('db3/scd/bitacora/database.db3',  `db3/scd/bitacora/database-${Date.now()}.db3`, (err) => {
                if (err) throw err;
                console.log('Base de datos SICODID db3 ha sido renombrado con fecha y hora de creación');
            });
        });
        console.log('Siguiente paso');
        
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
            'corte_fecha': actualTime,
            'corte_hora': actualTimeHoras,
            'dia': actualTimeDD,
            'mes': actualTimeMM,
            'anio': actualTimeYYYY,
            'hora': actualTimeHora,
            'minuto': actualTimeMinuto,
            'segundo': actualTimeSegundo,
        });
        const datosSQLite = await corteSQLiteSCD.findAll();

        if (datosSQLite.length == 0) {
            await corteSQLiteSCD.create({
                'corte_fecha': actualTime,
                'corte_hora': actualTimeHoras,
                'dia': actualTimeDD,
                'mes': actualTimeMM,
                'anio': actualTimeYYYY,
                'hora': actualTimeHora,
                'minuto': actualTimeMinuto,
                'segundo': actualTimeSegundo,
            });
        } else {
            await corteSQLiteSCD.update({
                'corte_fecha': actualTime,
                'corte_hora': actualTimeHoras,
                'dia': actualTimeDD,
                'mes': actualTimeMM,
                'anio': actualTimeYYYY,
                'hora': actualTimeHora,
                'minuto': actualTimeMinuto,
                'segundo': actualTimeSegundo,
            }, { where: {} });
        }

        // !!
        for (const server of servers) {
            const client = new ftp.Client();
            client.ftp.verbose = true;

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
                    password: server.password
                }).then(() => {
                    console.log(`Conectado a ${server.name}`);
                    const ruta = server.route;
                    // sftp.delete(`${ruta}database.db3`);
                    // console.log(`Archivo eliminado para sustituir de ${name}`);
                    return sftp.exists(`${ruta}sicodid/database.db3`).then(async (exists) => {
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
                                'corte_fecha': actualTime,
                                'corte_hora': actualTimeHoras,
                                'dia': actualTimeDD,
                                'mes': actualTimeMM,
                                'anio': actualTimeYYYY,
                                'hora': actualTimeHora,
                                'minuto': actualTimeMinuto,
                                'segundo': actualTimeSegundo,
                            });
                            const datosSQLite = await corteSQLiteSCD.findAll();

                            if (datosSQLite.length == 0) {
                                await corteSQLiteSCD.create({
                                    'corte_fecha': actualTime,
                                    'corte_hora': actualTimeHoras,
                                    'dia': actualTimeDD,
                                    'mes': actualTimeMM,
                                    'anio': actualTimeYYYY,
                                    'hora': actualTimeHora,
                                    'minuto': actualTimeMinuto,
                                    'segundo': actualTimeSegundo,
                                });
                            } else {
                                await corteSQLiteSCD.update({
                                    'corte_fecha': actualTime,
                                    'corte_hora': actualTimeHoras,
                                    'dia': actualTimeDD,
                                    'mes': actualTimeMM,
                                    'anio': actualTimeYYYY,
                                    'hora': actualTimeHora,
                                    'minuto': actualTimeMinuto,
                                    'segundo': actualTimeSegundo,
                                }, { where: {} });
                            }
                            return sftp.delete(`${ruta}sicodid/database.db3`);
                        } else {
                            console.log('El archivo remoto no existe.');
                            return Promise.resolve(); // Continuar sin eliminar el archivo
                        }
                    }).then(() => {
                        console.log('Subiendo nuevo archivo...');
                        // Subir el nuevo archivo
                        return sftp.put(fs.createReadStream(ruteFile), `${ruta}sicodid/database.db3`);
                    });
                }).then((data) => {
                    console.log(`Archivo cargado al servidor ${server.name}`);
                }).catch((err) => {
                    console.error('Error al indicar archivo:', err);
                    sftp.end();
                }).finally(() => {
                    // Cerrar la conexión SFTP
                    sftp.end();
                });;
    
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
        // !!
        
        return res.send({
            ok: true,
            msg: 'Se ha creado el corte y exportado la Base de Datos del SICODID'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            msg: 'Error con la conexión de la BD',
        }); 
    }
}

const Migracion_scd_cat_delegacion = async (req, res = response) => {
    let datos =[];
    try {
        const datosMSSQL = await scd_cat_delegacionMSSQL.findAll();
        if (datosMSSQL.length == 0){
            await scd_cat_delegacionSQLite.destroy({ where : {}});
            return res.send({
                ok: true,
                msg: 'Sin datos en scd_cat_delegacion'
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
        await scd_cat_delegacionSQLite.destroy({ where : {}});
        await scd_cat_delegacionSQLite.bulkCreate(datos);
        //const datosSQLite = await scd_cat_delegacionSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de scd_cat_delegacion',
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

const Migracion_scd_cat_dist_dele = async (req, res = response) => {
    let datos =[];
    try {
        const datosMSSQL = await scd_cat_dist_deleMSSQL.findAll();
        if (datosMSSQL.length == 0){
            await scd_cat_dist_deleSQLite.destroy({ where : {}});
            return res.send({
                ok: true,
                msg: 'Sin datos en scd_cat_dist_dele'
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
        await scd_cat_dist_deleSQLite.destroy({ where : {}});
        await scd_cat_dist_deleSQLite.bulkCreate(datos);
        //const datosSQLite = await scd_cat_dist_deleSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de scd_cat_dist_dele',
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

const Migracion_scd_cat_distrito = async (req, res = response) => {
    let datos =[];
    try {
        const datosMSSQL = await scd_cat_distritoMSSQL.findAll();
        if (datosMSSQL.length == 0){
            await scd_cat_distritoSQLite.destroy({ where : {}});
            return res.send({
                ok: true,
                msg: 'Sin datos en scd_cat_distrito'
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
        await scd_cat_distritoSQLite.destroy({ where : {}});
        await scd_cat_distritoSQLite.bulkCreate(datos);
        //const datosSQLite = await cain_cat_dist_deleSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de scd_cat_distrito',
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


const SCDMigracion_scd_casillas = async (req, res = response) => {
    let datos =[];
    try {
        const datosMSSQL = await SCD_casillasMSSQL.findAll();
        
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
        await SCD_casillasSQLite.destroy({ where : {}});
        await SCD_casillasSQLite.bulkCreate(datos);
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

const Migracion_scd_cat_participantes = async (req, res = response) => {
    let datos =[];
    try {
        const datosMSSQL = await scd_cat_participantesMSSQL.findAll();
        if (datosMSSQL.length == 0){
            await scd_cat_participantesSQLite.destroy({ where : {}});
            return res.send({
                ok: true,
                msg: 'Sin datos en scd_cat_participantes'
            });
        }
        datosMSSQL.forEach((element)=>{
            datos.push({
                id_participante: element.id_participante,
                descripcion: element.descripcion,
                siglas: element.siglas,
                id_usuario: element.id_usuario,
                fecha_alta: element.fecha_alta,
                fecha_modif: element.fecha_modif,
                estatus: element.estatus
            })
        })
        console.log(datosMSSQL.length,' registros encontrados')
        //Limpiado de infromación
        await scd_cat_participantesSQLite.destroy({ where : {}});
        await scd_cat_participantesSQLite.bulkCreate(datos);
        //const datosSQLite = await scd_cat_participantesSQLite.findAll();

        return res.send({
            ok: true,
            msg: 'Se ha realizado la migracion de scd_cat_participantes',
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
const SCDMigracion_scd_candidatos_jdel = async (req, res = response) => {
    let datos = [];
    try {
        const datosMSSQL = await scd_candidatos_jdel_SICODIDMSSQL.findAll();
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
        await scd_candidatos_jdel_SICODIDSQLite.destroy({ where : {}});
        await scd_candidatos_jdel_SICODIDSQLite.bulkCreate(datos);
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
const SCDMigracion_scd_candidatos_jgob = async (req, res = response) => {
    let datos = [];
    try {
        const datosMSSQL = await scd_candidatos_jgo_SICODIDbMSSQL.findAll();
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
        await scd_candidatos_jgob_SICODIDSQLite.destroy({ where : {}});
        await scd_candidatos_jgob_SICODIDSQLite.bulkCreate(datos);
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
const SCDMigracion_scd_candidatos_mr = async (req, res = response) => {
    let datos = [];
    try {
        const datosMSSQL = await scd_candidatos_mr_SICODIDMSSQL.findAll();
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
        await scd_candidatos_mrSICODIDSQLite.destroy({ where : {}});
        await scd_candidatos_mrSICODIDSQLite.bulkCreate(datos);
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

const SCDMigracion_nourbanas = async (req, res = response) => {
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
        await SCDnourbanasLite.destroy({ where : {}});
        await SCDnourbanasLite.bulkCreate(datos);
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

module.exports = {
    Migracion_scd_votos,
    CrearCorte,
    ConsultaVotos,
    Migracion_scd_cat_delegacion,
    Migracion_scd_cat_dist_dele,
    Migracion_scd_cat_distrito,
    SCDMigracion_scd_casillas,
    SCDMigracion_scd_candidatos_jdel,
    SCDMigracion_scd_candidatos_jgob,
    SCDMigracion_scd_candidatos_mr,
    Migracion_scd_cat_participantes,
    SCDMigracion_nourbanas
}