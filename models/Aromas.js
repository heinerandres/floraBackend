import { Schema, model } from 'mongoose';

const AromasSchema = Schema ({
    nombre:{
        type: String,
        required: true,
        unique: true
    }
});

export default model( 'Aromas', AromasSchema );