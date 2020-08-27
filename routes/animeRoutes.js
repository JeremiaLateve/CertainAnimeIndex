const express = require('express');
const animeController = require('./../controllers/animeController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

// router.param('id', animeController.checkID);

// POST /anime/234fad4/reviews
// GET /anime/234fad4/reviews

router.use('/:slug/reviews', reviewRouter);

router
  .route('/top-5')
  .get(animeController.aliasTopAnimes, animeController.getAllAnimes);

router.route('/anime-stats').get(animeController.getAnimeStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    animeController.getMonthlyPlan
  );

// router
//   .route('/animes-within/:distance/center/:latlng/unit/:unit')
//   .get(animeController.getAnimesWithin);
// // /animes-within?distance=233&center=-40,45&unit=mi
// // /animes-within/233/center/-40,45/unit/mi

// router.route('/distances/:latlng/unit/:unit').get(animeController.getDistances);

router
  .route('/')
  .get(animeController.getAllAnimes)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    animeController.uploadAnimeImages,
    animeController.resizeAnimeImages,
    animeController.createAnime
  );

router
  .route('/:id')
  .get(animeController.getAnime)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    animeController.uploadAnimeImages,
    animeController.resizeAnimeImages,
    animeController.updateAnime
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    animeController.deleteAnime
  );

module.exports = router;
