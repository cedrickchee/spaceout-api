const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const errorHandler = require('errorhandler');

// Configure Mongoose database connection
require('./shared/db/mongoose');

const userRouter = require('./routers/user');
const facilityRouter = require('./routers/facility');
const crowdLevelRouter = require('./routers/crowdlevel');
const jobs = require('./jobs');

// Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

// Initiate our app
const app = express();

// Configure our app
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(cors());
app.use(helmet());
app.use(compression());

if (!isProduction) {
  app.use(errorHandler());
}

// Routes
app.use(userRouter);
app.use(facilityRouter);
app.use(crowdLevelRouter);

// Handling unhandled routes
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

// Error handlers and middlewares
if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// Start Cron jobs
jobs.startJobs();

module.exports = app;
