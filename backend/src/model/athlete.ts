import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Athlete = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    gender: {
        type: String
    },
    idSport: {
        type: Number
    },
    idNation: {
        type: Number
    },
    gold: {
        type: Number
    },
    silver: {
        type: Number
    },
    bronze: {
        type: Number
    }
}) 

export default mongoose.model('Athlete', Athlete, 'Athletes');