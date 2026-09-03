import { Schema, model } from 'mongoose';

const ProductosSchema = Schema ({
    categoria: {
        type: Schema.ObjectId,
        ref: 'Categorias',
        required: true
    },
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number
    },
    cantidad: {
        type: Number
    },
    esDestacado: {
        type: Boolean
    },
});

ProductosSchema.virtual('imagenes', {
    ref: 'Imagenes',      // Nombre del modelo de las variantes
    localField: '_id',            // Campo del Producto
    foreignField: 'producto'      // Campo de ProductoVariante que apunta al producto
});

ProductosSchema.virtual('variantes', {
    ref: 'Variantes',      // Nombre del modelo de las variantes
    localField: '_id',            // Campo del Producto
    foreignField: 'producto'      // Campo de ProductoVariante que apunta al producto
});

ProductosSchema.set('toJSON', { virtuals: true });
ProductosSchema.set('toObject', { virtuals: true });

export default model( 'Productos', ProductosSchema );