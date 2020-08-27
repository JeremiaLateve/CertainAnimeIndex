/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { showAlert } from './alerts';
import { signup } from './signup';
import { animeAdmin } from './animeAdmin';
import { updateAnime } from './updateAnime';
import { reviewAnime} from './review';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const signupForm = document.querySelector('.form--signup');
const animeAdminForm = document.querySelector('.form-anime-data')
const updateAnimeForm = document.querySelector('.form-anime-update-data')
const reviewAnimeForm = document.querySelector('.form-anime-review')
// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (updateAnimeForm) 
  updateAnimeForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('imageCover', document.getElementById('imageCover').files[0]);
    form.append('episodeNumber', document.getElementById('episodeNumber').value);
    form.append('duration', document.getElementById('duration').value);
    form.append('type', document.getElementById('type').value);
    form.append('genre', document.getElementById('genre').value);
    form.append('description', document.getElementById('description').value);
    form.append('startDates', document.getElementById('startDates').value);
    form.append('endDates', document.getElementById('endDates').value);
    form.append('images',  document.getElementById('images').files[0]);
    console.log(form)
    updateAnime(id, form, 'data');
});

if(reviewAnimeForm)
reviewAnimeForm.addEventListener('submit', e => {
  e.preventDefault();
  const review = getElementById('review').value;
  const rating = document.getElementById('rating').value;
  reviewAnime(review, rating);
});

if(signupForm)
 signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('passwordConfirm').value;
  signup(name, email, password, passwordConfirm);
});

// if(animeAdminForm)
//  animeAdminForm.addEventListener('submit', e => {
//   e.preventDefault();
//   const name = document.getElementById('name').value;
//   const imageCover = document.getElementById('imageCover').value;
//   const episodeNumber = document.getElementById('episodeNumber').value;
//   const duration = document.getElementById('duration').value;
//   const type = document.getElementById('type').value;
//   const genre = document.getElementById('genre').value;
//   const description = document.getElementById('description').value;
//   const startDates = document.getElementById('startDates').value;
//   const endDates = document.getElementById('endDates').value;
//   const images = document.getElementById('images').value;
//   animeAdmin(name, imageCover, episodeNumber, duration, type, genre, description, startDates, endDates, images)
// });

if(animeAdminForm)
 animeAdminForm.addEventListener('submit', e => {
  e.preventDefault();
  const form = new FormData();
  form.append('name', document.getElementById('name').value);
  form.append('imageCover', document.getElementById('imageCover').files[0]);
  form.append('episodeNumber', document.getElementById('episodeNumber').value);
  form.append('duration', document.getElementById('duration').value);
  form.append('type', document.getElementById('type').value);
  form.append('genre', document.getElementById('genre').value);
  form.append('description', document.getElementById('description').value);
  form.append('startDates', document.getElementById('startDates').value);
  form.append('endDates', document.getElementById('endDates').value);
  form.append('images',  document.getElementById('images').files[0]);
  form.append('images',  document.getElementById('images').files[1]);
  form.append('images',  document.getElementById('images').files[2]);

  console.log(form)
  animeAdmin(form, 'data');
 });

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);
