import { Schema, model } from 'mongoose';

const TiposPielSchema = Schema ({
    nombre:{
        type: String,
        required: true,
        unique: true
    }
});

export default model( 'TiposPiel', TiposPielSchema );