import Producto from '../models/Productos.js';
import Imagenes from '../models/Imagenes.js';

export const obtenerProductos = async (req, res) => {
    try{
        const productos = await Producto.find()
        .populate("categoria")
        .populate("imagenes");

        res.status(201).json({
            ok: true,
            productos
        });
    }
    catch(error){
        console.log("no se pudieron obtener los producto");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const crearProducto = async (req, res) => {
    try{
        const producto = new Producto(req.body);
        console.log(producto);
        await producto.save();

        if (req.files) {
            await Imagenes.insertMany(
                Object.values(req.files)
                    .flat()
                    .map(file => ({
                        producto: producto._id,
                        url: file.filename
                    }))
            );
        }

        res.status(201).json({
            ok: true,
            producto
        });
    }
    catch(error){
        console.log("no se pudo guardar el producto");
        console.log(error);
        if(error.code === 11000){
            res.status(500).json({
                ok: false,
                msg: 'El producto ya existe'
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const editarProducto = async (req, res) => {
    const id = req.body;
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!productoActualizado) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            producto: productoActualizado
        });
    } catch (error) {
        console.log(error);
        if(error.code === 11000){
            res.status(500).json({
                ok: false,
                msg: 'El producto ya existe'
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

export const obtenerProductoPorSlug = async (req, res) => {
    try {
        const slug = req.body.slug;
        const producto = await Producto.findOne({slug})
        .populate("categoria")
        .populate("imagenes")
        .populate("variantes");

            res.status(201).json({
                ok: true,
                producto,
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

export const eliminarProducto = async (req, res) => {
    try {
        const id  = req.body;
        const producto = await Producto.findByIdAndDelete(id);
        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Producto eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};