import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Competing = new Schema({
    idAthlete: {
        type: Number
    },
    idCompetition: {
        type: Number
    },
    seed: {
        type: Number
    }
}) 

export default mongoose.model('Competing', Competing, 'Competing');