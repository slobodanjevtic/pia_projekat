import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Delegating = new Schema({
    id: {
        type: Number
    },
    idDelegate: {
        type: Number
    },
    idCompetition: {
        type: Number
    }
}) 

export default mongoose.model('Delegating', Delegating, 'Delegating');