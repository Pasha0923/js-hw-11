export function createMarkup(data) {
  return data
    .map(
      ({ completed, title }) =>
        `<li>
      <h2>${title}</h2>
     <p>Status completed: ${completed}</p>
    </li>
  `
    )
    .join('');
}
