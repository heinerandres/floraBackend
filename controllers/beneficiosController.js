import Beneficios from '../models/Beneficios.js';

export const obtenerBeneficios = async (req, res) => {
    try{
        const beneficios = await Beneficios.find();

        res.status(201).json({
            ok: true,
            beneficios
        });
    }
    catch(error){
        console.log("no se pudieron obtener los beneficios");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const crearBeneficio = async (req, res) => {
    try{
        const beneficios = new Beneficios(req.body);
        await beneficios.save();

        res.status(201).json({
            ok: true,
            beneficios
        });
    }
    catch(error){
        console.log("no se pudo guardar el beneficios");
        console.log(error);
        if(error.code === 11000){
            res.status(500).json({
                ok: false,
                msg: 'El beneficio ya existe'
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const editarBeneficio = async (req, res) => {
    const id = req.body;
    try {
        const beneficioActualizado = await Beneficios.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!beneficioActualizado) {
            return res.status(404).json({
                ok: false,
                msg: 'Beneficio no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            beneficio: beneficioActualizado
        });
    } catch (error) {
        console.log(error);
        if(error.code === 11000){
            res.status(500).json({
                ok: false,
                msg: 'El beneficios ya existe'
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

export const obtenerBeneficioPorNombre = async (req, res) => {
    try {
        const nombre = req.body.slug;
        const beneficio = await Beneficios.findOne({nombre});

            res.status(201).json({
                ok: true,
                beneficio,
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

export const eliminarBeneficio = async (req, res) => {
    try {
        const id  = req.body;
        const beneficio = await Beneficios.findByIdAndDelete(id);
        if (!beneficio) {
            return res.status(404).json({
                ok: false,
                msg: 'Beneficio no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Beneficio eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};