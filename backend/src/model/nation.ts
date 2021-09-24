import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Nation = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    flag: {
        type: String
    }
}) 

export default mongoose.model('Nation', Nation, 'Nations');