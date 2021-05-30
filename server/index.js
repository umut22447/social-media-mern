const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const PORT = process.env.PORT || 9000;

//Import routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');

//Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter)

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

app.listen(PORT, err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Listening on port ${PORT}`);
    }
})