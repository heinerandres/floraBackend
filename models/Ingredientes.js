import { Schema, model } from 'mongoose';

const IngredientesSchema = Schema ({
    nombre:{
        type: String,
        required: true,
        unique: true
    }
});

export default model( 'Ingredientes', IngredientesSchema );