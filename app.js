const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app =express();
const cors = require('cors')
const jwt = require('jsonwebtoken');

// const PORT = 4000;

app.use(express.json());

app.use(cors())
app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.post('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});

require("./routes/auth")(app);
