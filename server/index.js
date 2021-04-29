const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

//Import routes
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');

//Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

//Routes
app.get('/', (req, res) => {
    res.send('Server is listening...');
})

//Database connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to the Database');
    }
});

app.listen(process.env.PORT);