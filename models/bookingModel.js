const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  anime: {
    type: mongoose.Schema.ObjectId,
    ref: 'Anime',
    required: [true, 'Booking must belong to a Anime!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

bookingSchema.pre(/^find/, function(next) {
  this.populate('user').populate({
    path: 'anime',
    select: 'name'
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
