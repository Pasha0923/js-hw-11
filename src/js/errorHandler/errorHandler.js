export default function onFetchError(cardContainer) {
  cardContainer.innerHTML = '';
  alert('Упс, щось пішло не так і ми не знайшли вашого покемона!');
}
