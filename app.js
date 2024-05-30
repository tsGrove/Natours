const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./natours/routes/tourRoutes");
const userRouter = require("./natours/routes/userRoutes");

const app = express();

// MIDDELWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);

module.exports = app;
