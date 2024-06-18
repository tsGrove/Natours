// review / rating / createdAt / ref to tour / ref to user
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "A review cannot be empty."],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "A review must have a rating for the associated tour."],
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: { type: mongoose.Schema.ObjectId, ref: "Tour", required: true },
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: "tour",
  //   select: "name",
  // }).populate({
  //   path: "user",
  //   select: "name photo",
  // });
  this.populate({
    path: "user",
    select: "name",
  });

  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
