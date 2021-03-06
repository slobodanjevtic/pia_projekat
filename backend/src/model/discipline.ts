import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Discipline = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    status: {
        type: Number
    },
    idSport: {
        type: Number
    }
}) 

export default mongoose.model('Discipline', Discipline, 'Disciplines');