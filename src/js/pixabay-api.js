export const fetchTodos = () => {
  return fetch('https://jsonplaceholder.typicode.com/todos').then(resp => {
    if (!resp.ok) {
      throw new Error(`Error in promise: ${resp.status}`);
      /*
Якщо відповідь сервера не окей(resp.ok === false), то нам треба перевести проміс у стан rejected,
для цьго ми робимо перевірку та ручний викид власної помилки за допомогою оператора throw
(це оператор викидує помилку і переводить проміс у стан rejected, відповідно, завдяки цьому ми моментально переходимо у блок catch
для обробки цієї помилки)
      */
    }

    return resp.json();
  });
};
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
