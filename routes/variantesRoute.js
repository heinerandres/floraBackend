/*
    /api/variantes

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from '../middlewares/validarCampos.js';
import upload from '../storage/imagenes.js';


const router = Router();

import { crearVariante, editarVariante, obtenerVariantes, obtenerVariantePorSlug, obtenerVariantesPorProductoSlug, eliminarVariante } from '../controllers/variantesController.js';

router.post( 
    '/insertar', 
    upload.fields([
        { name: 'img1', maxCount: 1 },
    ]),
    crearVariante );

router.get(
    '/',
    obtenerVariantes
);

router.post(
    '/obtenerVariantePorSlug',
    [
        check('slug', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    obtenerVariantePorSlug
);

router.post(
    '/obtenerVariantesPorProductoSlug',
    [
        check('slug', 'El slug del producto es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    obtenerVariantesPorProductoSlug
);

router.put(
    '/editar',
    upload.fields([
        { name: 'img1', maxCount: 1 },
    ]),
    editarVariante
);

router.delete(
    '/eliminar',
    [
        check('_id', 'El id es obligatorio').not().isEmpty(),
        validarCampos
    ],
    eliminarVariante
);

export default router;