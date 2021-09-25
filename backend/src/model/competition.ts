import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Competition = new Schema({
    id: {
        type: Number
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    gender: {
        type: String
    },
    idDiscipline: {
        type: Number
    },
    idLocation: {
        type: Number
    },
    format: {
        type: Number
    }
}) 

export default mongoose.model('Competition', Competition, 'Competitions');