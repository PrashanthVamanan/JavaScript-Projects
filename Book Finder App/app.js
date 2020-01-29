//DOM Queries
const searchForm = document.querySelector('.search-form');
const booksList = document.querySelector('.books-list');
const loader = document.querySelector('.loader');
const addToWishList = document.querySelector('.wishlist');
const errorMessage = document.querySelector('.error-message');

//Class instances
const book = new Book();

//Other variables
let wishlistElements = [];

//Utility functions
checkIfPresent = field => {
  let result = null;
  result = field ? (field instanceof Array ? field.toString() : field) : 'Not Found';
  return result;
}

setErrorMessage = (message) => {
  errorMessage.innerHTML = message;
  errorMessage.classList.add('d-flex');
  setTimeout(() => {
    errorMessage.classList.remove('d-flex');
  }, 3000)
}

addLoadingIcon = () => {
  let html = `<i class="fa fa-spinner fa-2x fa-spin text-center text-white"></i>`;
  loader.innerHTML = html;
}

removeLoadingIcon = () => {
  loader.innerHTML = '';
}

//End of utility functions

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  book.clearData();
  addLoadingIcon();
  if (e.target.tagName === 'BUTTON' || 'I') {
    let searchTerm = e.target.searchText.value.trim();

    book.fetchData(searchTerm)
      .then(data => {
        if(data.totalItems != 0) {
          let { items } = data;
            if(items !== undefined) {
              removeLoadingIcon();
              items.forEach((item,index) => {
                item.volumeInfo.title = checkIfPresent(item.volumeInfo.title);
                item.volumeInfo.authors = checkIfPresent(item.volumeInfo.authors);
                item.volumeInfo.averageRating = checkIfPresent(item.volumeInfo.averageRating);
                item.volumeInfo.imageLinks = checkIfPresent(item.volumeInfo.imageLinks);
                book.renderData(item);
              })
          }
        } else {
          removeLoadingIcon();
          setErrorMessage('No data to display. Try alternate search terms');
        }
      })
      .catch(err => {
        removeLoadingIcon();
        setErrorMessage(err);
    });

    searchForm.reset();
  }
});

booksList.addEventListener('click', e => {
  let parentDiv = e.target.parentElement.parentElement;
  if(e.target.checked){
    parentDiv.classList.add('green-border');
    wishlistElements.push(parentDiv);
  } else {
    parentDiv.classList.remove('green-border');
  }
})
