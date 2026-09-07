import Producto from '../models/Productos.js';
import Variantes from '../models/Variantes.js';
import Imagenes from '../models/Imagenes.js';
import fs from "fs";
import path from "path";

export const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find()
            .populate("categoria")
            .populate("imagenes");

        const productosConVariantes = await Promise.all(
            productos.map(async (producto) => {
                const cantidadVariantes = await Variantes.countDocuments({
                    producto: producto._id
                });

                return {
                    ...producto.toObject(),
                    cantidadVariantes
                };
            })
        );

        res.status(200).json({
            ok: true,
            productos: productosConVariantes
        });

    } catch (error) {
        console.log("No se pudieron obtener los productos");
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        });
    }
};

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

    const { _id, ...datos } = req.body;

    try {

        const producto = await Producto.findById(_id);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: "Producto no encontrado"
            });
        }

        // ==========================================
        // ACTUALIZAR IMAGEN
        // ==========================================

        const img1 = req.files?.img1?.[0];

        if (img1) {

            // Buscar la imagen actual del producto
            const imagenActual = await Imagenes.findOne({
                producto: producto._id
            });

            if (imagenActual) {

                // Eliminar archivo físico anterior
                // Aquí debes usar la ruta donde Multer guarda las imágenes
                const rutaImagen = path.join(
                    process.cwd(),
                    "public",
                    "uploads",
                    imagenActual.url
                );

                if (fs.existsSync(rutaImagen)) {
                    fs.unlinkSync(rutaImagen);
                }

                // Actualizar el documento de imagen
                imagenActual.url = img1.filename;

                await imagenActual.save();

            } else {

                // Si por alguna razón el producto no tenía
                // registro de imagen, creamos uno
                await Imagenes.create({
                    producto: producto._id,
                    url: img1.filename
                });
            }
        }

        // ==========================================
        // ACTUALIZAR PRODUCTO
        // ==========================================

        const productoActualizado = await Producto.findByIdAndUpdate(
            _id,
            datos,
            {
                new: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            ok: true,
            producto: productoActualizado
        });

    } catch (error) {

        console.log(error);

        if (error.code === 11000) {
            return res.status(400).json({
                ok: false,
                msg: "El producto ya existe"
            });
        }

        return res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
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

export const obtenerProductoPorVarianteSlug = async (req, res) => {
    try {
        const { slug } = req.body;

        const variante = await Variantes.findOne({ slug })
        .populate({
            path: "producto",
            populate: [
                { path: "imagenes" },
                { path: "categoria" }
            ]
        });

        if (!variante) {
            return res.status(404).json({
                ok: false,
                msg: "Variante no encontrada"
            });
        }

        return res.status(200).json({
            ok: true,
            producto: variante.producto
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        });
    }
};