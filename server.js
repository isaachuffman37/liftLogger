var express = require('express');
const app = express();
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const routes = require('./routes/index');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
dotenv.config();

app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(express.static('public'));

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(port);
    console.log(`Connected to MongoDB and listening on port ${port}`);
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

//logging
if (process.env.HOST == 'localhost:8080') {
  app.use(morgan('dev'));
}


app
    .use(express.json())
    .use('/', routes)
    .use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))
