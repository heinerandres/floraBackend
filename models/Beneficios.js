import { Schema, model } from 'mongoose';

const BeneficiosSchema = Schema ({
    nombre:{
        type: String,
        required: true,
        unique: true
    }
});

export default model( 'Beneficios', BeneficiosSchema );