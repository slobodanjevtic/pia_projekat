import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let SportEvent = new Schema({
    id: {
        type: Number
    },
    round: {
        type: Number
    },
    series: {
        type: Number
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    idCompetition: {
        type: Number
    },
    idLocation: {
        type: Number
    }
}) 

export default mongoose.model('SportEvent', SportEvent, 'SportEvents');