import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Sport = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    }
}) 

export default mongoose.model('Sport', Sport, 'Sports');