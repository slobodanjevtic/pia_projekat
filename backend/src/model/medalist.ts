import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Medalist = new Schema({
    id: {
        type: Number
    },
    medal: {
        type: String
    },
    idAthlete: {
        type: Number
    }
}) 

export default mongoose.model('Medalist', Medalist, 'Medalists');