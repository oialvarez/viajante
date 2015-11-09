'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = mongoose.model('User'),
    City = mongoose.model('City');

var SearchSchema = new Schema({
    created: Date,
    updated: [Date],
    query: String,
    lat: Number,
    lng: Number,
    users: [User],
    city: [City]
});

mongoose.model('Search', SearchSchema);