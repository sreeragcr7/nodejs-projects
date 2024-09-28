const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');   
const errorHandler = require('./middleware/errorHandler');
const validateToken = require('./middleware/validateToken');

const contacts = require('./routes/contacts');
const users = require('./routes/users');

const app = express();
const port = process.env.PORT || 5000;   

connectDb();

app.use(express.json());

app.use('/api/contacts', contacts );
app.use('/api/users', users);

app.use(validateToken)
app.use(errorHandler);
 






app.listen(port, () => console.log(`Server started at http://localhost:${port}`));        