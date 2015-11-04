'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Provider Schema
 */
var ProviderSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  permissions: {
    type: Array
  },
  updated: {
    type: Array
  },
  testField: {
    type: String,
    length: 100
  }
});

/**
 * Validations
 */
ProviderSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

ProviderSchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');

ProviderSchema.path('testField').validate(function(testField) {
  return !!testField;
}, 'testField cannot be blank');

/**
 * Statics
 */
ProviderSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Provider', ProviderSchema);
