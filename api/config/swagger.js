const swagger = {
  openapi: '3.0.0',
  info: {
    title: 'Express API',
    version: '1.0.0',
    description: 'The REST API test service',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  paths: {
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'Get all users in system',
        parameters: {
          in: 'body',
          name: 'user',
          description: 'The user to create.',
          parameters: [
            {
              in: 'body',
              name: 'user',
              description: 'The user to create.',
              schema: {
                type: 'object',
                required: ['userName'],
                properties: {
                  userName: {
                    type: 'string',
                  },
                  firstName: {
                    type: 'string',
                  },
                  lastName: {
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        responses: {
          200: {
            description: 'OK',
            schema: {
              usuarios: '#/components/Users',
            },
          },
        },
      },
    },
  },
  components: {
    User: {
      required: ['name', '_id', 'companies'],
      properties: {
        _id: {
          type: 'integer',
          uniqueItems: true,
        },
        isPublic: {
          type: 'boolean',
        },
        name: {
          type: 'string',
        },
        books: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              amount: {
                type: 'number',
              },
            },
          },
        },
        companies: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
    Users: {
      type: 'array',
      $ref: '#/components/User',
    },
  },
};

export default swagger;
