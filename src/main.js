import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const BASE_URL = 'https://pixabay.com/api';
// import fetchData from "./js/pixabay-api"
// import { createMarkup } from './js/render-functions';

// const API_KEY = '41870399-9b44301246ceb98c07efd626a';
const API_KEY = '41902273-a1675a4e2dad43acb6fd87e89';
const galleryContainer = document.querySelector('.gallery');

const form = document.querySelector('.form');

form.addEventListener('submit', handleSearch);
const loader = document.querySelector('.loader');
// Когда мы устанавливаем loader.style.display = 'block', это означает, что элемент становится видимым.
function showLoader() {
  loader.style.display = 'block';
}
// Когда мы устанавливаем loader.style.display = 'none', элемент будет скрыт с экрана.
// Это означает, что он не будет занимать место на странице и не будет виден.
function hideLoader() {
  loader.style.display = 'none';
}

// Создали переменную lightbox перед функцией handleSearch, чтобы потом вызывать refresh().
let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
function handleSearch(event) {
  event.preventDefault();
  const query = event.currentTarget.elements.search.value.trim(); // Убираем пробелы
  console.log('query: ', query);

  if (query === '') {
    alert('Поле не должно быть пустым!');
    return; // Останавливаем выполнение функции
  }
  // Очищаем контейнер перед добавлением новых элементов
  galleryContainer.innerHTML = '';

  showLoader(); // Показываем лоадер перед началом запроса

  // в этом месте происходит вызов ФУНКЦИИ fetch ЭТО И ЕСТЬ НАЧАЛО ЗАПРОСА!
  searchImages(query)
    .then(data => {
      console.log(data);
      console.log(data.hits);
      if (data.hits.length === 0) {
        // Если массив пустой
        iziToast.error({
          message: 'По вашему запросу ничего не найдено!',
          position: 'center',
        });
        return;
      }

      // Добавляем разметку в контейнер
      galleryContainer.insertAdjacentHTML('beforeend', createMarkup(data.hits));

      lightbox.refresh(); // 🔥 ВАЖНО: обновляем lightbox, чтобы он увидел новые изображения
    })
    .catch(error => {
      console.error('Ошибка при загрузке изображений:', error);
    })
    .finally(() => {
      hideLoader(); // Прячем лоадер когда загрузка(запрос) завершился
      form.reset();
    });
}
function searchImages(images) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${images}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}
function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
  <li class="gallery-item">
   <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
   <div class="gallery-info">
          <div class="info-item">
           <p class="info-label">Likes</p>
            <p class="info-value">${likes}</p>

          </div>
          <div class="info-item">
          <p class="info-label">Views</p>
            <p class="info-value">${views}</p>

          </div>
          <div class="info-item">
            <p class="info-label">Comments</p>
            <p class="info-value">${comments}</p>

          </div>
          <div class="info-item">
           <p class="info-label">Downloads</p>
            <p class="info-value">${downloads}</p>

          </div>
        </div>
        </a>
        </li>
  `
    )
    .join('');
}

// webformatURL- це маленька версія зображення , зберігається в атрибуті src тегу <img>;
//largeImageURL - це велика версія зображення, зберігається в data атрибуті data - source тегу < img >;
// tags - це опис зображення , зберігається в атрибуті alt тегу <img>
