import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let EventLocation = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    }
}) 

export default mongoose.model('EventLocation', EventLocation, 'EventLocations');