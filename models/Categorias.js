import { Schema, model } from 'mongoose';

const CategoriasSchema = Schema ({
    nombre:{
        type: String,
        required: true,
        unique: true
    },
});

export default model( 'Categorias', CategoriasSchema );