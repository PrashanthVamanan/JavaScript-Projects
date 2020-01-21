const form = document.querySelector('.add');
const list = document.querySelector('.todos');
const searchQuery = document.querySelector('.search input');

const generateTemplate = todo => {

  const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="fa fa-trash delete"></i>
        </li>
    `;

  list.innerHTML += html;

};

//Adding new todos
form.addEventListener('submit', e => {

  e.preventDefault();
  const todo = form.add.value.trim();

  if (todo.length) {
    generateTemplate(todo);
    form.reset();
  }

});

//Deleting todos through event delegation
list.addEventListener('click', e => {
  if (e.target.tagName === 'I') {
    e.target.parentElement.remove();
  }
});

//Filter todos
const filterTodos = searchTerm => {

   Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(searchTerm))
    .forEach((todo) => todo.classList.add('filtered'));

   Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(searchTerm))
    .forEach((todo) => todo.classList.remove('filtered'));

};

//Key up event
searchQuery.addEventListener('keyup', e => {
  const searchTerm = e.target.value.trim().toLowerCase();
  filterTodos(searchTerm);
});

//Bonus tasks to implement

//Edit functionality

//Mark todo as complete

//Show only complete todos

//Show only incomplete todos