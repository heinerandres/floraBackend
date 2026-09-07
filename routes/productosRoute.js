/*
    /api/producto

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from '../middlewares/validarCampos.js';
import upload from '../storage/imagenes.js';


const router = Router();

import { crearProducto, editarProducto, obtenerProductos, obtenerProductoPorSlug, obtenerProductoPorVarianteSlug, eliminarProducto } from '../controllers/productosController.js';

router.post( 
    '/insertar', 
    upload.fields([
        { name: 'img1', maxCount: 1 },
    ]),
    crearProducto );

router.get(
    '/',
    obtenerProductos
);

router.post(
    '/obtenerProductoPorSlug',
    [
        check('slug', 'El slug del producto es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    obtenerProductoPorSlug
);

router.post(
    '/obtenerProductoPorVarianteSlug',
    [
        check('slug', 'El slug del producto es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    obtenerProductoPorVarianteSlug
);

router.put(
    '/editar',
    upload.fields([
        { name: 'img1', maxCount: 1 },
    ]),
    editarProducto
);

router.delete(
    '/eliminar',
    [
        check('_id', 'El id es obligatorio').not().isEmpty(),
        validarCampos
    ],
    eliminarProducto
);

export default router;