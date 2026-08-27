import TiposPiel from '../models/TiposPiel.js';

export const obtenerTiposPiel = async (req, res) => {
    try{
        const tiposPiel = await TiposPiel.find();

        res.status(201).json({
            ok: true,
            tiposPiel
        });
    }
    catch(error){
        console.log("no se pudieron obtener los tiposPiel");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const crearTipoPiel = async (req, res) => {
    try{
        const tipoPiel = new TiposPiel(req.body);
        await tipoPiel.save();

        res.status(201).json({
            ok: true,
            tipoPiel
        });
    }
    catch(error){
        console.log("no se pudo guardar el tipo de Piel");
        console.log(error);
        if(error.code === 11000){
            res.status(500).json({
                ok: false,
                msg: 'El tipo de Piel ya existe'
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const editarTipoPiel = async (req, res) => {
    const id = req.body;
    try {
        const tipoPielActualizado = await TiposPiel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!tiposPielActualizado) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo de Piel no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            tipoPiel: tipoPielActualizado
        });
    } catch (error) {
        console.log(error);
        if(error.code === 11000){
            res.status(500).json({
                ok: false,
                msg: 'El tipo de Piel ya existe'
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

export const obtenerTipoPielPorNombre = async (req, res) => {
    try {
        const nombre = req.body.slug;
        const tipoPiel = await TiposPiel.findOne({nombre});

            res.status(201).json({
                ok: true,
                tipoPiel,
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

export const eliminarTipoPiel = async (req, res) => {
    try {
        const id  = req.body;
        const tipoPiel = await tiposPiel.findByIdAndDelete(id);
        if (!tipoPiel) {
            return res.status(404).json({
                ok: false,
                msg: 'tipo de Piel no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Tipo Piel eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};