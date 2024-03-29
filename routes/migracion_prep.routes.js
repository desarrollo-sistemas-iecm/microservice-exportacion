/**
 * API
 * Ruta: '/api/admin'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { Migracion_cain_cat_delegacion, Migracion_cain_cat_dist_dele, Migracion_cain_cat_distrito, Migracion_prep_votos, 
        Migracion_prep_cat_inconsistencias, Migracion_scd_casillas, ConsultaVotos} = require('../controller/migracion_prep.controller');
const { validadorCreateItem } = require('../validators/validador');
const router = Router();

router.get('/cain_cat_delegacion',
    [
    ], Migracion_cain_cat_delegacion 
);
router.get('/cain_cat_dist_dele',
    [
    ], Migracion_cain_cat_dist_dele 
);
router.get('/cain_cat_distrito',
    [
    ], Migracion_cain_cat_distrito 
);
router.get('/prep_cat_inconsistencias',
    [
    ], Migracion_prep_cat_inconsistencias 
);
router.get('/prep_votos',
    [
    ], Migracion_prep_votos 
);
router.get('/scd_casillas',
    [
    ], Migracion_scd_casillas 
);
router.post('/consulta_votos',
    [
        check('id_distrito', 'Se necesita indicar el identificador de la Dirección Distrito "id_distrito".').exists().notEmpty(),
    ], ConsultaVotos 
);

module.exports = router;