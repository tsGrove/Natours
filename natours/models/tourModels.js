const mongoose = require("mongoose");
const validator = require("validator");

const tourSchmema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name."],
      unique: true,
      trim: true,
      maxLength: [
        40,
        "A tour name must have less or equal than 40 characters.",
      ],
      minLength: [10, "A tour name must have 10 or more characters."],
      validate: validator.isAlpha,
    },
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a max group size."],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Diffuclty is either easy, medium, or difficult.",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be equal to or above 1.0"],
      max: [5, "Rating must be equal to or below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price."],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price.",
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have a description."],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image."],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Tour = mongoose.model("Tour", tourSchmema);

module.exports = Tour;
