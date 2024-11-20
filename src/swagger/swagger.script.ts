import swaggereJsdoc from 'swagger-jsdoc';

const options = {
    explorer: true,
    swaggerOptions: {
        validatorUrl: null
    },
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'DBMleverage API',
            version: '1.0.0',
            description: '인테리어 DB Backend API',
        },
        basePath: '/',
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'apiKey',
                    scheme: 'bearer',
                    name: 'access',
                    in: 'header',
                }
            },
        },
        security: [
            {
                bearerAuth: []
            }
        ],
        servers: [
            {
                url: `http://3.35.169.16:20221`,
                description: `local`,
            }
        ],
    },
    apis: ['./src/routes/**/**/**.ts'],
    schemes: ['http', 'https'],
};

export const specs = swaggereJsdoc(options);