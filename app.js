const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const placesRoutes = require('./routes/placesRoutes');
const usersRoutes = require('./routes//usersRoutes');
const HttpError = require('./common/HttpError');

const app = express();
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);
app.use((req,res, next) => {
    const error = new HttpError('Not Found', 404);
    next(error);
} )

app.use((err,req,res,next) => {
    res.status(err.status || 500).json({message: err.message || 'Something went wrong'})
})

app.listen(5000);