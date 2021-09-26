import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Participating = new Schema({
    idEvent: {
        type: Number
    },
    idAthlete: {
        type: Number
    },
    result: {
        type: Number
    }
}) 

export default mongoose.model('Participating', Participating, 'Participating');