/**
 * API
 * Ruta: '/api/admin'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { Migracion_cain_cat_delegacion, Migracion_cain_cat_dist_dele, Migracion_cain_cat_distrito, Migracion_dig_actas_prep, Migracion_nourbanas, Migracion_prep_votos, 
        Migracion_scd_candidatos_jdel, Migracion_scd_candidatos_jgob, Migracion_scd_candidatos_mr,
        Migracion_prep_cat_inconsistencias, Migracion_prep_inconsistencias, Migracion_scd_casillas, Migracion_sedimde_enc_seguimiento, ConsultaVotos, CrearCorte} = require('../controller/migracion_prep.controller');
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
router.get('/prep_inconsistencias',
    [
    ], Migracion_prep_inconsistencias 
);
router.get('/dig_actas_prep',
    [
    ], Migracion_dig_actas_prep 
);
router.get('/nourbanas',
    [
    ], Migracion_nourbanas 
);
router.get('/prep_votos',
    [
    ], Migracion_prep_votos 
);
router.get('/scd_candidatos_jdel',
    [
    ], Migracion_scd_candidatos_jdel 
);
router.get('/scd_candidatos_jgob',
    [
    ], Migracion_scd_candidatos_jgob
);
router.get('/scd_candidatos_mr',
    [
    ], Migracion_scd_candidatos_mr
);
router.get('/scd_casillas',
    [
    ], Migracion_scd_casillas 
);
router.get('/sedimde_enc_seguimiento',
    [
    ], Migracion_sedimde_enc_seguimiento 
);
router.post('/consulta_votos',
    [
        check('id_distrito', 'Se necesita indicar el identificador de la Dirección Distrito "id_distrito".').exists().notEmpty(),
    ], ConsultaVotos 
);
router.get('/corte',
    [
    ], CrearCorte 
);

module.exports = router;