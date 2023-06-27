import { accessObjects } from './js/access-objects';
import { getGallery } from './js/pixabay-api';
import { showImages } from './js/show-images';
import { showNoImagesMessage, showEndOfResultsMessage } from './js/ux';

let page = 1;
let currentSearchQuery = '';

accessObjects.searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const searchQuery = accessObjects.searchForm.elements.searchQuery.value;
  accessObjects.gallery.innerHTML = '';
  if (searchQuery.trim() === '') {
    return;
  }
  page = 1;
  currentSearchQuery = searchQuery;
  searchImages(searchQuery);
});

function searchImages(searchQuery) {
  getGallery(searchQuery, page).then(function (response) {
    const images = response.data.hits;
    if (images.length > 0) {
      showImages(images);
      if (page === 1) {
        accessObjects.gallery.scrollTo(0, 0);
      }
      accessObjects.gallery.addEventListener('scroll', loadMoreOnScroll); // Додано прослуховування події scroll
    } else {
      if (page === 1) {
        accessObjects.gallery.innerHTML = '';
      }
      showNoImagesMessage();
    }

    const totalHits = response.data.totalHits || 0;
    function loadMoreOnScroll() {
      const { scrollTop, scrollHeight, clientHeight } = accessObjects.gallery;
      if (scrollTop + clientHeight >= scrollHeight - 300) {
        accessObjects.gallery.removeEventListener('scroll', loadMoreOnScroll);

        page += 1;
        searchImages(currentSearchQuery);
      }
    }
    if (images.length === totalHits || images.length === 0) {
      accessObjects.gallery.removeEventListener('scroll', loadMoreOnScroll);
      // Видаляємо прослуховування події scroll
      showEndOfResultsMessage();
    }
  });
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
