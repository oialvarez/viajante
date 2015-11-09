'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CitySchema = new Schema({
    created: Date,
    updated: Date,
    name: String,
    lat: Number,
    lng: Number
});

mongoose.model('City', CitySchema);