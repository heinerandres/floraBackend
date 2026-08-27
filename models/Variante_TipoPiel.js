import { Schema, model } from 'mongoose';

const VarianteTipoPielSchema = Schema({
    variante: {
        type: Schema.ObjectId,
        ref: 'Variantes',
        required: true
    },
    tipo_piel: {
        type: Schema.ObjectId,
        ref: 'TiposPiel',
        required: true
    }
});

export default model('VarianteTipoPiel', VarianteTipoPielSchema);