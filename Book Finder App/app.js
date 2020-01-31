//DOM Queries
const searchForm = document.querySelector('.search-form');
const booksList = document.querySelector('.books-list');
const loader = document.querySelector('.loader');
const addToWishList = document.querySelector('.wishlist');
const errorMessage = document.querySelector('.error-message');
const modalContainer = document.querySelector('.modal-container');

//Class instances
const book = new Book();

//Other variables
let wishlistElements = [];

//To handle when user submits the form
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
              book.renderData(item, index);
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

//To handle when user clicks on checkbox to add to wishlist
booksList.addEventListener('click', e => {
  let parentDiv = e.target.parentElement.parentElement;
  let divId = parentDiv.getAttribute("id");
  if (e.target.checked) {
    parentDiv.classList.add('green-border');
    wishlistElements.push(parentDiv);
  } else {
    parentDiv.classList.remove('green-border');
    wishlistElements = wishlistElements.filter(item => item.id != divId);
  }
  addToWishList.disabled = wishlistElements.length > 0 ? false : true;
  if(!addToWishList.disabled) {
    addToWishList.style.cursor = "pointer";
  } else {
    addToWishList.style.cursor = "not-allowed"
  }
})

//handle modal click to view more details
onModalClick = (data) => {
  generateModalAndPopulate(data);
}

//Show modal with proper formatted data
generateModalAndPopulate = data => {
  data.publisher = checkIfPresent(data.publisher);
  data.publishedDate = checkIfPresent(data.publishedDate);
  data.description = checkIfPresent(data.description);
  data.categories = checkIfPresent(data.categories);
  data.pageCount = checkIfPresent(data.pageCount);
  data.language = checkIfPresent(data.language);
  data.imageLinks = checkIfPresent(data.imageLinks);

  let modalTemplate = `
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h5 class="modal-title text-white">${data.title}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          <div class="book-item d-flex justify-content-between">
          <div class="book-details">
            <p class="text-center">
              <strong class="item-label">Publisher: </strong> 
              <span class="details text-white">${data.publisher}</span>
            </p>
            <p class="text-center">
              <strong class="item-label">Published Date: </strong> 
              <span class="details text-white">${data.publishedDate}</span>
            </p>
            <p class="text-center">
              <strong class="item-label">Description: </strong> 
              <span class="description details text-white" data-toggle="tooltip" data-placement="top" title="${data.description}">
                ${data.description.substring(0,20)}...
              </span>
            </p>
            <p class="text-center">
              <strong class="item-label">Category: </strong> 
              <span class="text-white">${data.categories}</span>
            </p>
            <p class="text-center">
              <strong class="item-label">Page Count: </strong> 
              <span class="text-white">${data.pageCount}</span>
            </p>
            <p class="text-center">
              <strong class="item-label">Language : </strong> 
              <span class="text-white">${data.language}</span>
            </p>
          </div>
          </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`;

   modalContainer.innerHTML = modalTemplate;
}
