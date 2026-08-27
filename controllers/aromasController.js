import Aromas from '../models/Aromas.js';

export const obtenerAromas = async (req, res) => {
    try{
        const aromas = await Aromas.find();

        res.status(201).json({
            ok: true,
            aromas
        });
    }
    catch(error){
        console.log("no se pudieron obtener los aromas");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const crearAroma = async (req, res) => {
    try{
        const aroma = new Aromas(req.body);
        await aroma.save();

        res.status(201).json({
            ok: true,
            aroma
        });
    }
    catch(error){
        console.log("no se pudo guardar el aroma");
        console.log(error);
        if(error.code === 11000){
            res.status(500).json({
                ok: false,
                msg: 'El aroma ya existe'
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const editarAroma = async (req, res) => {
    const id = req.body;
    try {
        const aromaActualizado = await Aromas.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!aromaActualizado) {
            return res.status(404).json({
                ok: false,
                msg: 'Aroma no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            aroma: aromaActualizado
        });
    } catch (error) {
        console.log(error);
        if(error.code === 11000){
            res.status(500).json({
                ok: false,
                msg: 'El aroma ya existe'
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

export const obtenerAromaPorNombre = async (req, res) => {
    try {
        const nombre = req.body.slug;
        const aroma = await Aromas.findOne({slug});

            res.status(201).json({
                ok: true,
                aroma,
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

export const eliminarAroma = async (req, res) => {
    try {
        const id  = req.body;
        const aroma = await Aromas.findByIdAndDelete(id);
        if (!aroma) {
            return res.status(404).json({
                ok: false,
                msg: 'Aroma no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Aroma eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};