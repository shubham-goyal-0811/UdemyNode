const express = require('express');
const morgan = require('morgan');
const TourRouter = require('./routers/tourRoutes');
const userRouter = require('./routers/userRoutes');

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve static files from the 'public' directory
app.use(express.static(`${__dirname}/public`));

// Routes
app.use('/api/v1/tours', TourRouter);
app.use('/api/v1/users', userRouter);

app.all('*',(req,res)=>{
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server`,
    });
});

app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    }) 
    next();
});
module.exports = app;
