const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

dotenv.config();


mongoose.set('strictQuery', false);

const port = process.env.PORT || 3000;
const db = process.env.DB;

async function connectToDatabase(db) {
    try {
      await mongoose.connect(db, {});
      console.log('Connected to MongoDB');
    }
    catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1);
    }
  }
  
  connectToDatabase(db);
  
  const dataBase = mongoose.connection;
  
  dataBase.on('error', console.error.bind(console, 'MongoDB connection error'));
  
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  
  app.use(session({
    secret: 'mysecret',
    cookie: { maxAge: 3600000 },
    saveUninitialized: false,
    resave: false
  }));
  app.use(cors());
  app.use(morgan('dev'));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});