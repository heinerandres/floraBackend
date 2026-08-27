/*
    /api/tipoPiel

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from '../middlewares/validarCampos.js';


const router = Router();

import { crearTipoPiel, editarTipoPiel, obtenerTiposPiel, obtenerTipoPielPorNombre, eliminarTipoPiel } from '../controllers/tiposPielController.js';

router.post( 
    '/insertar', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    crearTipoPiel );

router.get(
    '/',
    obtenerTiposPiel
);

router.post(
    '/obtenerAromaPorNombre',
    [
        check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    obtenerTipoPielPorNombre
);

router.put(
    '/editar',
    [
        check('_id', 'El _id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    editarTipoPiel
);

router.delete(
    '/eliminar',
    [
        check('_id', 'El id es obligatorio').not().isEmpty(),
        validarCampos
    ],
    eliminarTipoPiel
);

export default router;