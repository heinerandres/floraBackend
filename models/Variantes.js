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
    slug: {
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

VariantesSchema.virtual('imagenes', {
    ref: 'Imagenes',      // Nombre del modelo de las variantes
    localField: '_id',            // Campo del Producto
    foreignField: 'variante'      // Campo de ProductoVariante que apunta al producto
});

VariantesSchema.set('toJSON', { virtuals: true });
VariantesSchema.set('toObject', { virtuals: true });

export default model( 'Variantes', VariantesSchema );