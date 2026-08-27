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
});

export default model( 'Productos', ProductosSchema );