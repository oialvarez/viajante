exports.models = {

  Provider: {
    id: 'Provider',
    required: ['content', 'title'],
    properties: {
   
      title: {
        type: 'string',
        description: 'Title of the provider'
      },
      content: {
        type: 'string',
        description: 'content of the provider'
      },
      permissions: {
        type: 'Array',
        description: 'Permissions for viewing the provider'
      }
    }
  }
};
