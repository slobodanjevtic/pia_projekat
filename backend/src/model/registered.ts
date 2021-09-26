import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Registered = new Schema({
    idAthlete: {
        type: Number
    },
    idDiscipline: {
        type: Number
    }
}) 

export default mongoose.model('Registered', Registered, 'Registered');