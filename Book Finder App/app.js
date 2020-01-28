//DOM Queries
const searchForm = document.querySelector('.search-form');
const booksList = document.querySelector('.books-list');
const loader = document.querySelector('.loader');
const addToWishList = document.querySelector('.wishlist');

//Class instances
const book = new Book();

//Utility functions
checkIfPresent = field => {
  let result = null;
  result = field ? (field instanceof Array ? field.toString() : field) : 'Not Found';
  return result;
}

addLoadingIcon = () => {
  let html = `<i class="fa fa-spinner fa-2x fa-spin text-center text-white"></i>`;
  loader.innerHTML = html;
}

removeLoadingIcon = () => {
  loader.innerHTML = '';
}

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
              items.forEach(item => {
                item.volumeInfo.publisher = checkIfPresent(item.volumeInfo.publisher);
                item.volumeInfo.authors = checkIfPresent(item.volumeInfo.authors);
                item.volumeInfo.categories = checkIfPresent(item.volumeInfo.categories);
                item.volumeInfo.pageCount = checkIfPresent(item.volumeInfo.pageCount);
                item.volumeInfo.publishedDate = checkIfPresent(item.volumeInfo.publishedDate);
                item.volumeInfo.averageRating = checkIfPresent(item.volumeInfo.averageRating);
                item.volumeInfo.description = checkIfPresent(item.volumeInfo.description);
                item.volumeInfo.language = item.volumeInfo.language ? langCodes[item.volumeInfo.language].nativeName : 'Not Found';
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
