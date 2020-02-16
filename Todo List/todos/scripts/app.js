//DOM Queries
const form = document.querySelector('.add');
const list = document.querySelector('.todos');
const searchQuery = document.querySelector('.search input');
const categories = document.querySelector('.categories');
const updateForm = document.querySelector('.update');

//Class Instances
const todoUI = new TodoUI(list);
const todo = new Todo('general');


//Get existing todos
todo.getTodos((data, id, type) => {
  if (type === 'added' || type === 'modified')
    todoUI.render(data, id, type);
  else if (type == 'removed')
    todoUI.deleteTodo(id);
});

//Add new todos
form.addEventListener('submit', e => {
  e.preventDefault();

  const now = new Date();
  let task = form.add.value.trim();
  let category = '';

  form.reset();

  todo.addTodo(task, category)
    .then(() => {
      console.log("Todo Added !");
    })
    .catch(err => {
      console.log("Error in adding todo!", err);
    })
})

//Delete a todo
list.addEventListener('click', e => {
  //If trash icon was clicked
  if (e.target.tagName === 'I') {
    let id = e.target.parentElement.getAttribute('data-id');
    todo.deleteTodo(id)
      .then(() => {
        console.log("Todo deleted !");
      })
      .catch(err => {
        console.log("Error in deleting todo!", err);
      })
  } 
  
  else if (e.target.tagName === 'INPUT') {
    let currentStatus = e.target.parentElement.getElementsByClassName('badge')[0].textContent;
    let id = e.target.parentElement.getAttribute('data-id');
    todo.changeTodoStatus(id, currentStatus);
  }
})

//Filter todos
//Key up event
searchQuery.addEventListener('keyup', e => {
  const searchTerm = e.target.value.trim().toLowerCase();
  todo.filterTodos(searchTerm, list);
});

//Display todos as per selected category
categories.addEventListener('click', e => {
  if(e.target.tagName === 'LI'){
    todoUI.clear();
    todo.updateCategory(e.target.innerHTML);
    todo.getTodos((data, id, type) => {
      if(type === 'added' || type === 'modified')
        todoUI.render(data, id, type);
      else
        todoUI.deleteTodo(id);
    })
  }
});
