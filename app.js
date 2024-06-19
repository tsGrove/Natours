const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const appError = require("./main/utils/appError");
const globalErrorHandler = require("./main/controllers/errorController");
const tourRouter = require("./main/routes/tourRoutes");
const userRouter = require("./main/routes/userRoutes");
const reviewRouter = require("./main/routes/reviewRoutes");
const app = express();

// GLOBAL MIDDELWARES
// Set security HTTP headers
app.use(helmet());

// Dev logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Request Limiter
const limiter = rateLimit({
  max: 50,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again later.",
});

app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: "10kb",
  })
);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter polution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

// Serving Static Files
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log(req.headers);
//   next();
// });

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/reviews", reviewRouter);

app.all("*", (req, res, next) => {
  next(new appError(`Cant find ${req.originalUrl} on this server!`), 404);
});

app.use(globalErrorHandler);

module.exports = app;
