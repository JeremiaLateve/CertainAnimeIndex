/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// async (name, imageCover, episodeNumber, duration, type, genre, description, startDates, endDates, images)

// export const animeAdmin = async (data,form) => {
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: '/api/v1/animes/',
//       data: {
//         name,
//         imageCover,
//         episodeNumber,
//         duration,
//         type,
//         genre,
//         description,
//         startDates,
//         endDates,
//         images,
//         form
//       }
//     });
//     console.log(res);
//     if (res.data.status === 'success') {
//       showAlert('success', 'Anime ajouté avec succès!');
//       window.setTimeout(() => {
//         location.assign('/');
//       }, 1500);
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };

export const animeAdmin = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/animes/',
      data

    });
    console.log(res);
    console.log(req.body);
    if (res.data.status === 'success') {
      showAlert('success', 'Anime ajouté avec succès!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
