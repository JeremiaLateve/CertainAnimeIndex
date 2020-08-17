const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(viewsController.alerts);

router.get('/', authController.isLoggedIn, viewsController.getOverview);

router.get('/anime/:slug', authController.isLoggedIn, viewsController.getAnime);
router.get(
  '/anime/:slug/review',
  authController.isLoggedIn,
  viewsController.getAnimeReview
);

router.get('/signup', viewsController.getSignupForm);
router.get(
  '/animesAdmin',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminAnimeForm
);

router.get(
  '/animeUpdate',
  authController.isLoggedIn,
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getUpdateAnimeForm
);

router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);

router.get('/my-animes', authController.protect, viewsController.getMyAnimes);
router.get('/my-reviews', authController.protect, viewsController.getMyAnimes);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
