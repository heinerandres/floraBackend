import Variantes from '../models/Variantes.js';

export const obtenerVariantes = async (req, res) => {
    try{
        const variantes = await Variantes.find();

        res.status(201).json({
            ok: true,
            variantes
        });
    }
    catch(error){
        console.log("no se pudieron obtener las variantes");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const crearVariante = async (req, res) => {
    try{
        const variante = new Variantes(req.body);
        console.log(variante);
        await variante.save();

        if (req.files) {
            await Imagenes.insertMany(
                Object.values(req.files)
                    .flat()
                    .map(file => ({
                        producto: producto._id,
                        variante: variante._id,
                        url: file.filename
                    }))
            );
        }

        res.status(201).json({
            ok: true,
            variante
        });
    }
    catch(error){
        console.log("no se pudo guardar la variante");
        console.log(error);
        if(error.code === 11000){
            res.status(500).json({
                ok: false,
                msg: 'La variante ya existe'
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const editarVariante = async (req, res) => {
    const id = req.body;
    try {
        const varianteActualizado = await Variantes.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!varianteActualizada) {
            return res.status(404).json({
                ok: false,
                msg: 'Variante no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            variante: varianteActualizada
        });
    } catch (error) {
        console.log(error);
        if(error.code === 11000){
            res.status(500).json({
                ok: false,
                msg: 'La variante ya existe'
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

export const obtenerVariantePorNombre = async (req, res) => {
    try {
        const nombre = req.body.nombre;
        const variante = await Variantes.findOne({nombre});

            res.status(201).json({
                ok: true,
                variante,
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

export const eliminarVariante = async (req, res) => {
    try {
        const id  = req.body;
        const variante = await Variante.findByIdAndDelete(id);
        if (!variante) {
            return res.status(404).json({
                ok: false,
                msg: 'Variante no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Variante eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};