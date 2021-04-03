const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err,
    });
};

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path} : ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.keyValue.name;
    const message = `Duplicate field value: "${value}". Please use another value.`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const sendErrorProduction = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // 1) Log error
        console.error('[ERROR] ', err);

        // 2) send generic error
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        if (err.name === 'CastError') error = handleCastErrorDB(error);
        if (err.code === 11000) error = handleDuplicateFieldsDB(error);
        if (err.name === 'ValidationError')
            error = handleValidationErrorDB(err);
        sendErrorProduction(error, res);
    }
};
