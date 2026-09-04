import Variantes from '../models/Variantes.js';
import Productos from '../models/Productos.js';
import Imagenes from '../models/Imagenes.js';

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
        const variante = new Variantes({
            ...req.body,
            precio: Number(req.body.precio),
            stock: Number(req.body.stock),
            presentacion: Number(req.body.presentacion),

            ingredientes: JSON.parse(req.body.ingredientes),
            beneficios: JSON.parse(req.body.beneficios),
            tiposPiel: JSON.parse(req.body.tiposPiel),
            aromas: JSON.parse(req.body.aromas),
        });

        await variante.save();

        if (req.files) {
            await Imagenes.insertMany(
                Object.values(req.files)
                    .flat()
                    .map(file => ({
                        producto: variante.producto,
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

export const obtenerVariantesPorSlug = async (req, res) => {
    try {
        const { slug } = req.body;

        const producto = await Productos.findOne({slug});

        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: "Producto no encontrado"
            });
        }

        const variantes = await Variantes.find({
            producto: producto._id
        }).populate("imagenes");

        return res.status(200).json({
            ok: true,
            variantes
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        });
    }
};

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