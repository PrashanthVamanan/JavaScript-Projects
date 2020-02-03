//DOM Queries
const searchForm = document.querySelector('.search-form');
const booksList = document.querySelector('.books-list');
const loader = document.querySelector('.loader');
const addToWishListButton = document.querySelector('.wishlist');
const errorMessage = document.querySelector('.error-message');
const modalContainer = document.querySelector('.modal-container');
const viewWishList = document.querySelector('.view-wishlist');
const viewWishListButton = document.querySelector('.view-button');

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
  addToWishListButton.disabled = wishlistElements.length > 0 ? false : true;
  if (!addToWishListButton.disabled) {
    addToWishListButton.style.cursor = "pointer";
  } else {
    addToWishListButton.style.cursor = "not-allowed"
  }
  updateCheckBoxStatus(!addToWishListButton.disabled, viewWishListButton);
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

  let template = getModalTemplate(data)

  modalContainer.innerHTML = template;
}

//Handle event when user clicks on Add wishlist button
addToWishListButton.addEventListener('click', () => {
  if (!addToWishListButton.disabled) {
    addToWishList(wishlistElements,viewWishList);
  }
})

//Handle event when user clicks on View wishlist button
viewWishListButton.addEventListener('click', () => {
  if(viewWishListButton){
    location.href="view-wishlist.html";
  }
})
