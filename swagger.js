const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');
dotenv.config();

const doc = {
  info: {
    title: 'LiftLogger API',
    description: 'An API that returns user workout data'
  },
  host: process.env.HOST,
  schemes: [process.env.SCHEME]
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
