import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the desafio-backend-nodejs project',
    },
  },
  apis: ['./src/routes/*/*.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;