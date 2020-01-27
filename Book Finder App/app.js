//DOM Queries
const searchForm = document.querySelector('.search-form');
const booksList = document.querySelector('.books-list');

//Class instances
const book = new Book();

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  if (e.target.tagName === 'BUTTON' || 'I') {
    let searchTerm = e.target.searchText.value.trim();

    fetchBookData();

    book.fetchData(searchTerm)
      .then(data => {
        if(data.totalItems != 0) {
          let { items } = data;
            if(items !== undefined) {
              items.forEach(item => {
                book.renderData(item);
              })
          }
        }
      })
      .catch(err => {
        console.log("Error ::", err);
    });

    searchForm.reset();
  }
})
