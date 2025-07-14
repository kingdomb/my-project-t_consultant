const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const { errorHandler } = require('./middleWare/errorsMiddleWare');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/goals', require('./routes/goalsRoute'));
app.use('/api/users', require('./routes/usersRoute'));


app.use(errorHandler);

app.listen(port, () =>
    console.log(`Server has started on port ${port}`.cyan)
);
