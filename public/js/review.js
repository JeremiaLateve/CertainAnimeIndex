/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// export const reviewAnime = async (data) => {
//     try {
//       const res = await axios({
//         method: 'POST',
//         url: '/api/v1/reviews',
//         data
//       });
export const reviewAnime = async (review, rating) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/reviews',
      data: {
        review,
        rating
      }
    });
    console.log(data);
      if (res.data.status === 'success') {
        showAlert('success', 'évaluation réussi!');
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  };
