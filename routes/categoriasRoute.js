/*
    /api/categorias

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from '../middlewares/validarCampos.js';


const router = Router();

import { crearCategoria, editarCategoria, obtenerCategorias, obtenerCategoriaPorNombre, eliminarCategoria } from '../controllers/categoriasController.js';

router.post( 
    '/insertar', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    crearCategoria );

router.get(
    '/',
    obtenerCategorias
);

router.post(
    '/obtenerCategoriaPorNombre',
    [
        check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    obtenerCategoriaPorNombre
);

router.put(
    '/editar',
    [
        check('_id', 'El _id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    editarCategoria
);

router.delete(
    '/eliminar',
    [
        check('_id', 'El id es obligatorio').not().isEmpty(),
        validarCampos
    ],
    eliminarCategoria
);

export default router;