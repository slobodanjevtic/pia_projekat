import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
    id: {
        type: Number
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: String
    },
    status: {
        type: String
    },
    idNation: {
        type: Number
    }
}) 

export default mongoose.model('User', User, 'Users');