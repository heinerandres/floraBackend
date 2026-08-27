/*
    /api/aroma

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from '../middlewares/validarCampos.js';


const router = Router();

import { crearAroma, editarAroma, obtenerAromas, obtenerAromaPorNombre, eliminarAroma } from '../controllers/aromasController.js';

router.post( 
    '/insertar', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    crearAroma );

router.get(
    '/',
    obtenerAromas
);

router.post(
    '/obtenerAromaPorNombre',
    [
        check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    obtenerAromaPorNombre
);

router.put(
    '/editar',
    [
        check('_id', 'El _id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    editarAroma
);

router.delete(
    '/eliminar',
    [
        check('_id', 'El id es obligatorio').not().isEmpty(),
        validarCampos
    ],
    eliminarAroma
);

export default router;