/*
    /api/beneficios

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from '../middlewares/validarCampos.js';


const router = Router();

import { crearBeneficio, editarBeneficio, obtenerBeneficios, obtenerBeneficioPorNombre, eliminarBeneficio } from '../controllers/beneficiosController.js';

router.post( 
    '/insertar', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    crearBeneficio );

router.get(
    '/',
    obtenerBeneficios
);

router.post(
    '/obtenerAromaPorNombre',
    [
        check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    obtenerBeneficioPorNombre
);

router.put(
    '/editar',
    [
        check('_id', 'El _id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    editarBeneficio
);

router.delete(
    '/eliminar',
    [
        check('_id', 'El id es obligatorio').not().isEmpty(),
        validarCampos
    ],
    eliminarBeneficio
);

export default router;