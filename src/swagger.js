const swagger = require('swagger-jsdoc');

const options = {
    definition : {
        info : {},
        server: [
            {
                url : "http://localhost:8888"
            }
        ],
    },
    apis :[__dirname + "/routes/*.js"]
};

const swaggerDoc = swagger(options);

module.exports = swaggerDoc;