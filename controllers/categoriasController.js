import Categorias from '../models/Categorias.js';

export const obtenerCategorias = async (req, res) => {
    try{
        const categorias = await Categorias.find();

        res.status(201).json({
            ok: true,
            categorias
        });
    }
    catch(error){
        console.log("no se pudieron obtener las categorias");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const crearCategoria = async (req, res) => {
    try{
        const categoria = new Categorias(req.body);
        await categoria.save();

        res.status(201).json({
            ok: true,
            categoria
        });
    }
    catch(error){
        console.log("no se pudo guardar la categoria");
        console.log(error);
        if(error.code === 11000){
            res.status(500).json({
                ok: false,
                msg: 'El categoria ya existe'
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const editarCategoria = async (req, res) => {
    const id = req.body;
    try {
        const categoriaActualizada = await Categoria.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!categoriaActualizada) {
            return res.status(404).json({
                ok: false,
                msg: 'Categoria no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            categoria: categoriaActualizada
        });
    } catch (error) {
        console.log(error);
        if(error.code === 11000){
            res.status(500).json({
                ok: false,
                msg: 'La categoria ya existe'
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

export const obtenerCategoriaPorNombre = async (req, res) => {
    try {
        const nombre = req.body.slug;
        const categoria = await Categoria.findOne({slug});

            res.status(201).json({
                ok: true,
                categoria,
            });
        }
    catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const eliminarCategoria = async (req, res) => {
    try {
        const id  = req.body;
        const categoria = await Categoria.findByIdAndDelete(id);
        if (!categoria) {
            return res.status(404).json({
                ok: false,
                msg: 'Categoria no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Categoria eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};