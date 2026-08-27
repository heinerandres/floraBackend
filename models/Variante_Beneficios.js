import { Schema, model } from 'mongoose';

const VarianteBeneficioSchema = Schema({
    variante: {
        type: Schema.ObjectId,
        ref: 'Variantes',
        required: true
    },
    ingrediente: {
        type: Schema.ObjectId,
        ref: 'Beneficios',
        required: true
    }
});

export default model('VarianteBeneficio', VarianteBeneficioSchema);