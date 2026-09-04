/*
    /api/variantes

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from '../middlewares/validarCampos.js';
import upload from '../storage/imagenes.js';


const router = Router();

import { crearVariante, editarVariante, obtenerVariantes, obtenerVariantePorNombre,obtenerVariantesPorSlug, eliminarVariante } from '../controllers/variantesController.js';

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
    '/obtenerVariantePorNombre',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    obtenerVariantePorNombre
);

router.post(
    '/obtenerVariantesPorSlug',
    [
        check('slug', 'El slug del producto es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    obtenerVariantesPorSlug
);

router.put(
    '/editar',
    [
        check('_id', 'El _id es obligatorio').not().isEmpty(),
        check('producto', 'El producto es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('precio', 'El precio es obligatoria').not().isEmpty(),
        check('stock', 'El stock es obligatoria').not().isEmpty(),
        check('precentacion', 'La precentacion es obligatoria').not().isEmpty(),
        check('unidadMedida', 'La unidadMedida es obligatoria').not().isEmpty(),
        validarCampos
    ],
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