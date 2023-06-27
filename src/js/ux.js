import notiflix from 'notiflix';
export function showErrorMessage() {
  notiflix.Notify.failure(
    'An error occurred while processing your request. Please try again later.'
  );
}
export function showNoImagesMessage() {
  notiflix.Notify.info(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
export function showEndOfResultsMessage() {
  notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}
