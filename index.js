const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('Shutting Down');
    process.exit(1);
});

const app = require('./app');

let DB = process.env.DATABASE_URL.replace(
    '<USERNAME>',
    process.env.DATABASE_USERNAME
);
DB = DB.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to Database');
    });

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('Shutting Down');
    server.close(() => {
        process.exit(1);
    });
});
