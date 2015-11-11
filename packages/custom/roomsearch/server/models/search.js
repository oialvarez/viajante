'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SearchSchema = new Schema({
    created: Date,
    updated: [Date],
    query: String,
    lat: Number,
    lng: Number,
    user: String,
    city: String
});

mongoose.model('Search', SearchSchema);