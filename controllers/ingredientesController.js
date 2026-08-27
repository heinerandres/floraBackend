import Ingredientes from '../models/Ingredientes.js';

export const obtenerIngredientes = async (req, res) => {
    try{
        const ingredientes = await Ingredientes.find();

        res.status(201).json({
            ok: true,
            ingredientes
        });
    }
    catch(error){
        console.log("no se pudieron obtener los ingredientes");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const crearIngredientes = async (req, res) => {
    try{
        const ingrediente = new Ingredientes(req.body);
        await ingrediente.save();

        res.status(201).json({
            ok: true,
            ingrediente
        });
    }
    catch(error){
        console.log("no se pudo guardar el ingrediente");
        console.log(error);
        if(error.code === 11000){
            res.status(500).json({
                ok: false,
                msg: 'El ingrediente ya existe'
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const editarIngrediente = async (req, res) => {
    const id = req.body;
    try {
        const ingredienteActualizado = await Ingredientes.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!ingredienteActualizado) {
            return res.status(404).json({
                ok: false,
                msg: 'Ingrediente no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            ingrediente: ingredienteActualizado
        });
    } catch (error) {
        console.log(error);
        if(error.code === 11000){
            res.status(500).json({
                ok: false,
                msg: 'El ingrediente ya existe'
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

export const obtenerIngredientePorNombre = async (req, res) => {
    try {
        const nombre = req.body.slug;
        const ingrediente = await Ingredientes.findOne({nombre});

            res.status(201).json({
                ok: true,
                ingrediente,
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

export const eliminarIngrediente = async (req, res) => {
    try {
        const id  = req.body;
        const ingrediente = await Ingredientes.findByIdAndDelete(id);
        if (!ingrediente) {
            return res.status(404).json({
                ok: false,
                msg: 'Ingrediente no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Ingrediente eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};