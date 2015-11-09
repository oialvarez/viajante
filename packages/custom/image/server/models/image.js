'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Image Schema
 */
var ImageSchema = new Schema({
    created: Date,
    updated: Date,
    status: String,
    url: {
        type: String,
        required: true
    }
});

mongoose.model('Image', ImageSchema);