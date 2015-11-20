'use strict';

exports.load = function(swagger, parms) {

  var searchParms = parms.searchableOptions;

  var list = {
    'spec': {
      description: 'Provider operations',
      path: '/providers',
      method: 'GET',
      summary: 'Get all Providers',
      notes: '',
      type: 'Provider',
      nickname: 'getProviders',
      produces: ['application/json'],
      params: searchParms
    }
  };

  var create = {
    'spec': {
      description: 'Device operations',
      path: '/providers',
      method: 'POST',
      summary: 'Create provider',
      notes: '',
      type: 'Provider',
      nickname: 'createProvider',
      produces: ['application/json'],
      parameters: [{
        name: 'body',
        description: 'Provider to create.  User will be inferred by the authenticated user.',
        required: true,
        type: 'Provider',
        paramType: 'body',
        allowMultiple: false
      }]
    }
  };

  swagger.addGet(list)
    .addPost(create);

};
