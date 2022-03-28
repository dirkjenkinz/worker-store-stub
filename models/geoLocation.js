const mongoose = require('mongoose');

const geoLocationSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('GeoLocation', geoLocationSchema);