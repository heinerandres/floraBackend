import { Schema, model } from 'mongoose';

const VarianteBeneficioSchema = Schema({
    variante: {
        type: Schema.ObjectId,
        ref: 'Variantes',
        required: true
    },
    aroma: {
        type: Schema.ObjectId,
        ref: 'Aromas',
        required: true
    }
});

export default model('VarianteAroma', VarianteAromaSchema);