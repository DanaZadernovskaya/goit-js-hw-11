import SimpleLightbox from 'simplelightbox';
import { accessObjects } from './access-objects';
export function showImages(images) {
  images.forEach(function (image) {
    const card = document.createElement('a'); // Змінено елемент на <a> для використання SimpleLightbox
    accessObjects.gallery.appendChild(card);
    card.outerHTML = `
 <a class="card" href="${image.largeImageURL}">
      <img src="${image.webformatURL}" alt="${image.tags}">
      <div class="description">
        <div><b>Likes</b><br><br>${image.likes} </div>
        <div><b>Views</b><br><br>${image.views} </div>
        <div><b>Comments</b><br><br>${image.comments} </div>
        <div><b>Downloads</b><br><br>${image.downloads} </div>
      </div>
    </a>`;
  });

  // Виклик методу refresh() для оновлення галереї SimpleLightbox
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}
