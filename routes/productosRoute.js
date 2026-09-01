/*
    /api/producto

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from '../middlewares/validarCampos.js';


const router = Router();

import { crearProducto, editarProducto, obtenerProductos, obtenerProductoPorSlug, eliminarProducto } from '../controllers/productosController.js';

router.post( 
    '/insertar', 
    [
        check('categoria', 'La categoria es obligatoria').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('slug', 'El slug es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('precio', 'La categoria es obligatorio').not().isEmpty(),
        check('cantidad', 'La categoria es obligatorio').not().isEmpty(),
        check('esDestacado', 'EsDestacado es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    crearProducto );

router.get(
    '/',
    obtenerProductos
);

router.post(
    '/obtenerProductoBySlug',
    [
        check('slug', 'El slug del producto es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    obtenerProductoPorSlug
);

router.put(
    '/editar',
    [
        check('_id', 'El _id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('slug', 'El slug es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('categoria', 'La categoria es obligatoria').not().isEmpty(),
        check('precio', 'La categoria es obligatoria').not().isEmpty(),
        check('cantidad', 'La categoria es obligatoria').not().isEmpty(),
        validarCampos
    ],
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