//DOM Queries
const searchForm = document.querySelector('.search-form');
const booksList = document.querySelector('.books-list');
const loader = document.querySelector('.loader');
const addToWishList = document.querySelector('.wishlist');
const errorMessage = document.querySelector('.error-message');
const modalContainer = document.querySelector('.modal-container');
console.log(modalContainer);

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
        if (data.totalItems != 0) {
          let {
            items
          } = data;
          if (items !== undefined) {
            removeLoadingIcon();
            items.forEach((item, index) => {
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
  if (e.target.checked) {
    parentDiv.classList.add('green-border');
    wishlistElements.push(parentDiv);
  } else {
    parentDiv.classList.remove('green-border');
  }
})


onModalClick = (data) => {
  console.log("Called ", data);
  generateModalAndPopulate(data);
}

generateModalAndPopulate = data => {
  let modalTemplate = `
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${data.title}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>`;

   modalContainer.innerHTML = modalTemplate;
}
