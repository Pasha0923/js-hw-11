import { fetchTodos } from './pixabay-api';
import { createMarkup } from './render-functions';

const list = document.querySelector('.todo-list');

/**
 * Всередині функції запит, зовні обробка (then().catch().finally())!!!
 */
fetchTodos()
  .then(data => {
    // сюди потрапляє те що повернув попередній then із самого запита , а повернув він масив об'єктів
    // data - масив обʼєктів які нам надав сервер в якості відповіді
    console.log(data);
    list.insertAdjacentHTML('beforeend', createMarkup(data));
  })
  .catch(err => console.log(err));
