const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition ={
    openapi: '3.0.0',
    info: {
    title: 'DIGI-KALA API Documentation',
        version: '1.0.0',
        description: 'The data extractor and handler for DK.',
        license: {
        name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
        name: 'mmRoshani-Github',
            url: 'https://github.com/MohammadMojtabaRoshani-TOMaaR/',
    },
},
servers: [
    {
        url: 'http://localhost:4000',
        description: 'Development server',
    }
],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: [
        // "./index.js",
        // "./Controllers/index.Controller.js",
        './Controllers/Category.Controller/*.js'
    ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec