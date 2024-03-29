const { response } = require("express");
/**
 * Modelos de la base de datos de MSSQL
 */
const { scd_votosMSSQL } = require('../models/mssql/sicodid/scd_votos.model');
/** */
const { scd_votosSQLite } = require('../models/sqlite/scd/scd_votos.model');

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
                fecha_alta: element.fecha_alta,
                fecha_modif: element.fecha_modif,
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

module.exports = {
    Migracion_scd_votos,
    ConsultaVotos
}