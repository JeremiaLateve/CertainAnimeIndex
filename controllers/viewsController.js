const Anime = require('../models/animeModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Récupère les données depuis la collection
  const animes = await Anime.find();

  // 2) Créer la templte
  // 3) rend la template avec les données
  res.status(200).render('overview', {
    title: 'Tout les Animes',
    description: 'Bienvue sur A Certain Anime Index',
    animes
  });
});

exports.getAnime = catchAsync(async (req, res, next) => {
  // 1) récupère les données pour l'anime demandé (y compris les avis )
  const anime = await Anime.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!anime) {
    return next(new AppError('There is no anime with that name.', 404));
  }

  // 2) construit la template
  // 3) créer la tempalte avec les donénes du 1)
  res.status(200).render('anime', {
    title: `${anime.name} Anime`,
    description: 'ici vous avec accès au détails',
    anime
  });
});

exports.getAnimeReview = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested anime (including reviews and guides)
  const anime = await Anime.findOne({ slug: req.params.slug });

  if (!anime) {
    return next(new AppError('There is no anime with that name.', 404));
  }
  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('review', {
    title: `${anime.name} avis`,
    anime
  });
});

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create an account',
    description: 'ici vous créer votre compte'
  });
};

exports.getAdminAnimeForm = catchAsync(async (req, res, next) => {
  const animes = await Anime.find();

  res.status(200).render('animesAdmin', {
    title: 'Gestion des animes',
    animes
  });
});

exports.getUpdateAnimeForm = catchAsync(async (req, res, next) => {
  const animes = await Anime.find();
  res.status(200).render('animeUpdate', {
    title: 'Ajouts des animes',
    animes
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getMyAnimes = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find animes with the returned IDs
  const animeIDs = bookings.map(el => el.anime);
  const animes = await Anime.find({ _id: { $in: animeIDs } });

  res.status(200).render('overview', {
    title: 'My Animes',
    animes
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});
