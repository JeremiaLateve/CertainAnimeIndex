/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const updateAnime = async (form, id) => {
  try {
    const url = `/api/v1/animes/${id}`;

    const res = await axios({
      method: 'PATCH',
      url,
      data{
        form
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
