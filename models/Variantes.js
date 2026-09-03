import { Schema, model } from 'mongoose';

const VariantesSchema = Schema ({
    producto: {
        type: Schema.ObjectId,
        ref: 'Productos',
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    presentacion: {
        type: Number,
        required: true,
    },
    unidadMedida: {
        type: String,
        required: true,
    },
    ingredientes: [{
        type: Schema.ObjectId,
        ref: "Ingredientes"
    }],
    beneficios: [{
        type: Schema.ObjectId,
        ref: "Beneficios"
    }],
    aromas: [{
        type: Schema.ObjectId,
        ref: "Aromas"
    }],
    tiposPiel: [{
        type: Schema.ObjectId,
        ref: "TiposPiel"
    }]
});

export default model( 'Variantes', VariantesSchema );