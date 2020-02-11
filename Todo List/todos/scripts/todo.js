//DOM Queries
const loader = document.querySelector('.lds-ring');

class Todo {
  constructor() {
    this.todos = db.collection('todos');
  }

  //Get Todos in Real-Time
  getTodos(callback) {
    loader.classList.add('d-flex');
    this.todos.onSnapshot(snapshot => {
      loader.classList.add('d-none');
      loader.classList.remove('d-flex');
      snapshot.docChanges().forEach(change => {
        callback(change.doc.data(), change.doc.id, change.type)
      })
    })
  }

  async addTodo(task, category) {

    const now = new Date();

    const todo = {
      task: task,
      created_at: firebase.firestore.Timestamp.fromDate(now),
      status: 'incomplete',
      category: category ? category : 'general'
    }

    const response = await this.todos.add(todo);
    return response;

  }

  async deleteTodo(id) {
    const response = this.todos.doc(id).delete();
    return response;
  }

  filterTodos(searchTerm, list) {

    Array.from(list.children)
      .filter((todo) => !todo.textContent.toLowerCase().includes(searchTerm))
      .forEach((todo) => todo.classList.add('filtered'));

    Array.from(list.children)
      .filter((todo) => todo.textContent.toLowerCase().includes(searchTerm))
      .forEach((todo) => todo.classList.remove('filtered'));
  }

  changeTodoStatus(id, status) {
    let updatedStatus = status === 'incomplete' ? 'complete' : 'incomplete';
    const response = this.todos.doc(id).update({status: updatedStatus});
    return response;
  }

}