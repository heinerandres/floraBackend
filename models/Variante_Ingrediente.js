import { Schema, model } from 'mongoose';

const VarianteIngredienteSchema = Schema({
    variante: {
        type: Schema.ObjectId,
        ref: 'Variantes',
        required: true
    },
    ingrediente: {
        type: Schema.ObjectId,
        ref: 'Ingredientes',
        required: true
    }
});

export default model('VarianteIngrediente', VarianteIngredienteSchema);