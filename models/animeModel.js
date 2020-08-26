const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');
// const validator = require('validator');

const animeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A anime must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A anime name must have less or equal then 40 characters'],
      minlength: [3, 'A anime name must have more or equal then 3 characters']
      // validate: [validator.isAlpha, 'Anime name must only contain characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A anime must have a duration']
    },
    // maxGroupSize
    episodeNumber: {
      type: Number,
      required: [true, 'A anime must have a number of episode']
    },
    // difficulty
    type: {
      type: String,
      required: [true, 'A anime must have a type'],
      enum: {
        values: ['anime', 'film', 'autre'],
        message: 'le type est soit anime, film ou autre'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    // price: {
    //   type: Number,
    //   required: [true, 'A anime must have a price']
    // },
    // priceDiscount: {
    //   type: Number,
    //   validate: {
    //     validator: function(val) {
    //       // this only points to current doc on NEW document creation
    //       return val < this.price;
    //     },
    //     message: 'Discount price ({VALUE}) should be below regular price'
    //   }
    // },

    // summary
    genre: {
      type: String,
      trim: true,
      required: [true, 'A anime must have a genre']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required:[true, 'A anime must have a duration']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretAnime: {
      type: Boolean,
      default: false
    },
    endDates: [Date]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// animeSchema.index({ price: 1 });
animeSchema.index({ price: 1, ratingsAverage: -1 });
animeSchema.index({ slug: 1 });
animeSchema.index({ startLocation: '2dsphere' });

animeSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// Virtual populate
animeSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'anime',
  localField: '_id'
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
animeSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// animeSchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// animeSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// animeSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// animeSchema.pre('find', function(next) {
animeSchema.pre(/^find/, function(next) {
  this.find({ secretAnime: { $ne: true } });

  this.start = Date.now();
  next();
});

// animeSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'guides',
//     select: '-__v -passwordChangedAt'
//   });

//   next();
// });

// animeSchema.post(/^find/, function(docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//   next();
// });

// AGGREGATION MIDDLEWARE
// animeSchema.pre('aggregate', function(next) {
//   this.pipeline().unshift({ $match: { secretAnime: { $ne: true } } });

//   console.log(this.pipeline());
//   next();
// });

const Anime = mongoose.model('Anime', animeSchema);

module.exports = Anime;
