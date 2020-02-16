class TodoUI {
  constructor(list) {
    this.list = list;
    this.class = '';
  }

  render(todo, id, type) {

    this.class = todo.status === 'incomplete' ? 'badge badge-danger' : todo.status === 'complete' ? 'badge badge-success' : 'badge';
    let lineThrough = todo.status === 'complete' ? 'complete' : 'incomplete'

    const formattedDate = dateFns.distanceInWordsToNow(
      todo.created_at.toDate(), {
        addSuffix: true
      }
    );

    const html = `
        <div class="d-flex flex-column bg-color todo-item">
          <li data-id="${id}" class="list-group-item d-flex justify-content-between align-items-center">
              <input type="checkbox" class="checkbox" />
              <span class='${lineThrough}'>${todo.task}</span>
              <span class='${this.class}' style="cursor:pointer;">${todo.status}</span>
              <i class="fa fa-trash delete"></i>
          </li>
          <div class="d-flex justify-content-end date">
            <i class="fa fa-clock-o"></i>
            <span>${formattedDate}</span> 
          </div>
        </div>
    `;

    if (type === 'added') {

    }
    else if (type === 'modified') {
      let todos = document.querySelectorAll('li');
      todos = Array.from(todos);
      let item = todos.filter(todo => todo.getAttribute('data-id') === id);
      item[0].parentElement.remove();
    }
    this.list.innerHTML += html;
  }

  deleteTodo(id) {
    let todos = document.querySelectorAll('li');
    todos.forEach(todo => {
      let todoId = todo.getAttribute('data-id');
      if (todoId == id) {
        todo.parentElement.remove();
        return;
      }
    })
  }

  clear() {
    this.list.innerHTML = '';
  }

}