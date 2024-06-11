const express = require("express");
const morgan = require("morgan");

const AppError = require("./natours/utils/appError");
const globalErrorHandler = require("./natours/controllers/errorController");
const tourRouter = require("./natours/routes/tourRoutes");
const userRouter = require("./natours/routes/userRoutes");

const app = express();

// MIDDELWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log(req.headers);
  next();
});

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server!`), 404);
});

app.use(globalErrorHandler);

module.exports = app;
