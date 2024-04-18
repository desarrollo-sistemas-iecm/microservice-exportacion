/**
 * API
 * Ruta: '/api/admin'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { Migracion_scd_votos, ConsultaVotos, CrearCorte, Migracion_scd_cat_delegacion, Migracion_scd_cat_dist_dele, Migracion_scd_cat_distrito, SCDMigracion_scd_casillas, SCDMigracion_scd_candidatos_jdel, SCDMigracion_scd_candidatos_jgob, SCDMigracion_scd_candidatos_mr } = require('../controller/migracion_scd.controller');
const { validadorCreateItem } = require('../validators/validador');
const router = Router();

router.get('/scd_votos',
    [
    ], Migracion_scd_votos 
);

router.get('/corte',
    [
    ], CrearCorte 
);

router.post('/consulta_votos',
    [
        check('id_distrito', 'Se necesita indicar el identificador de la Dirección Distrito "id_distrito".').exists().notEmpty(),
    ], ConsultaVotos 
);


// ! Integración de Daniel Rea
/**
 * Esto es exclusivamente para el SICODID
 */
router.get('/scd_cat_delegacion',
    [
    ], Migracion_scd_cat_delegacion 
);

router.get('/scd_cat_dist_dele',
    [
    ], Migracion_scd_cat_dist_dele
);

router.get('/scd_cat_distrito',
    [
    ], Migracion_scd_cat_distrito 
);

/**
 * Termina exclusividad del SICODID
 */


// Comienzan tablas comunes entre PREP y SICODID
/* 

*/
router.get('/scd_casillas',
[
], SCDMigracion_scd_casillas 
);

router.get('/scd_candidatos_jdel',
    [], SCDMigracion_scd_candidatos_jdel
);

router.get('/scd_candidatos_jgob',
    [], SCDMigracion_scd_candidatos_jgob
);

router.get('/scd_candidatos_mr',
    [], SCDMigracion_scd_candidatos_mr
);

module.exports = router;