const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

//Bodyparser Middleware
app.use(express.json());

//DB config
const db = config.get('mongoURI');

//Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/players', require('./routes/api/players'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/authPlayer', require('./routes/api/authPlayer'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port ${port}'));