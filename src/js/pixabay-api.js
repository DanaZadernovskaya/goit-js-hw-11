import axios from 'axios';
import { showErrorMessage } from './ux';
export async function getGallery(searchQuery, page) {
  const API_KEY = '37880971-8327b7952709a692256c7c31f';
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    searchQuery
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

  return axios.get(URL).catch(error => showErrorMessage());
}
