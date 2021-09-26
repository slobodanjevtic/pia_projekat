import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Delegating = new Schema({
    idDelegate: {
        type: Number
    },
    idCompetition: {
        type: Number
    }
}) 

export default mongoose.model('Delegating', Delegating, 'Delegating');