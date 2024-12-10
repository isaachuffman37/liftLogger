var express = require('express');
const app = express();
const morgan = require('morgan');
const passport = require('passport')
const session = require('express-session');
const MongoStore = require('connect-mongo')
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const routes = require('./routes/index');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
dotenv.config();

app.set('views', 'views')
app.set('view engine', 'ejs')

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

// Passport Config
require('./config/passport')(passport)

// Sessions 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        client: mongoose.connection.getClient() 
    })
  }))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//logging
if (process.env.HOST == 'localhost:8080') {
  app.use(morgan('dev'));
}


app
    .use(bodyParser.urlencoded({ extended: true }))
    .use('/', routes)
    .use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))
