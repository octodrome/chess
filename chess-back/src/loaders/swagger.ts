import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: '♚ Chess API',
    version: '1.0.0',
    description: 'This is a REST API application made with Express.',
  },
  license: {
    name: 'Licensed under MIT',
    url: 'https://jsonplaceholder.typicode.com',
  },
  contact: {
    name: 'Colin Faivre',
    url: 'https://lelaboratoiredespossibles.com',
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Path to files containing OpenAPI definitions
  apis: ['**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
