import { Schema, model } from 'mongoose';

const ImagenesSchema = Schema ({
    producto: {
        type: Schema.ObjectId,
        ref: 'Productos',
    },
    variante: {
        type: Schema.ObjectId,
        ref: 'Variantes'
    },
    url: {
        type: String,
        require: true
    },
    orden: {
        type: Number,
    },
    esPrincipal: {
        type: Boolean,
        required: true,
    }
});

export default model( 'Imagenes', ImagenesSchema );