require('dotenv').config();

const sequelize = require('./db');
const express = require('express');
const app = express();
const User = require('./Controller/userController');


//!{force.true} clears the table for restructure if needed.
sequelize.sync();
app.use(express.json());

// in order to use the app, it seeks out the headers to validate the response that it is seeking.
app.use(require('./Middleware/headers'));

app.use('/user', User);
// app.use('/', infohere);



// verifying the app process is running on the proper port.
app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}.`));