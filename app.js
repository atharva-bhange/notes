const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorhandler = require('./controllers/errorController');
const noteRouter = require('./routes/noteRoutes');

const app = express();

// Global MIDDLEWARES

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Development logging
}

app.use(express.json({ limit: '10kb' })); // body parser

app.use('/resourses', express.static(`${__dirname}/public`)); // serving static files

// Mounting Routers

app.use('/api/v1/notes', noteRouter);

// For queries that don't have handlers
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorhandler);

module.exports = app;
