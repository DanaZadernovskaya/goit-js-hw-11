import axios from 'axios';
import notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
let page = 1;
let currentSearchQuery = '';

const searchForm = document.getElementById('search-form');
const gallery = document.getElementById('gallery');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const searchQuery = searchForm.elements.searchQuery.value;
  gallery.innerHTML = '';
  if (searchQuery.trim() === '') {
    return;
  }
  page = 1;
  currentSearchQuery = searchQuery;
  searchImages(searchQuery);
});

function searchImages(searchQuery) {
  const API_KEY = '37880971-8327b7952709a692256c7c31f';
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    searchQuery
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

  axios
    .get(URL)
    .then(function (response) {
      const images = response.data.hits;
      if (images.length > 0) {
        showImages(images);
        if (page === 1) {
          gallery.scrollTo(0, 0);
        }
        gallery.addEventListener('scroll', loadMoreOnScroll); // Додано прослуховування події scroll
      } else {
        if (page === 1) {
          gallery.innerHTML = '';
        }
        showNoImagesMessage();
      }

      const totalHits = response.data.totalHits || 0;
    
      if (images.length === totalHits || images.length === 0) {
        gallery.removeEventListener('scroll', loadMoreOnScroll);
     // Видаляємо прослуховування події scroll
        showEndOfResultsMessage();
      }
    })
    .catch(function (error) {
      console.log(error);
      showErrorMessage();
    });
}

function showImages(images) {
  images.forEach(function (image) {
    const card = document.createElement('a'); // Змінено елемент на <a> для використання SimpleLightbox
    card.href = image.largeImageURL; // Додано посилання на велику версію зображення
    card.className = 'card';

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;

    const description = document.createElement('div');
    description.classList.add('description');
    const likes = document.createElement('div');
    likes.innerHTML = '<b>Likes</b><br><br>' + image.likes;

    const views = document.createElement('div');
    views.innerHTML = '<b>Views</b><br><br>' + image.views;

    const comments = document.createElement('div');
    comments.innerHTML = '<b>Comments</b><br><br>' + image.comments;

    const downloads = document.createElement('div');
    downloads.innerHTML = '<b>Downloads</b><br><br>' + image.downloads;

    description.appendChild(likes);
    description.appendChild(views);
    description.appendChild(comments);
    description.appendChild(downloads);
    card.appendChild(img);
    card.appendChild(description);

    gallery.appendChild(card);
  });

  // Виклик методу refresh() для оновлення галереї SimpleLightbox
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

function showNoImagesMessage() {
  notiflix.Notify.info(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function showEndOfResultsMessage() {
  notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}

function showErrorMessage() {
  notiflix.Notify.failure(
    'An error occurred while processing your request. Please try again later.'
  );
}

function loadMoreOnScroll() {
  const { scrollTop, scrollHeight, clientHeight } = gallery;
  if (scrollTop + clientHeight >= scrollHeight - 300) {
    gallery.removeEventListener('scroll', loadMoreOnScroll);

    page += 1;
    searchImages(currentSearchQuery);
  }
}

// Отримуємо посилання на всі картки зображень
const imageLinks = document.querySelectorAll('.gallery a');

// Проходимося по кожному посиланню і додаємо номер до атрибуту data-caption
imageLinks.forEach((link, index) => {
  const imageNumber = index + 1;
  link.setAttribute('data-caption', `Image ${imageNumber}`);
});

// Ініціалізуємо бібліотеку SimpleLightbox з оновленими посиланнями
const lightbox = new SimpleLightbox('.gallery a');
