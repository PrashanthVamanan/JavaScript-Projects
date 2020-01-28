//DOM Queries and Variables;
let bookItem = '';

class Book {
  constructor() {
    this.url = 'https://www.googleapis.com/books/v1/volumes?q='
  }

  async fetchData(input) {
    input = encodeURIComponent(input);
    const response = await fetch(`${this.url}${input}&key=${this.apiKey}`);
    const data = await response.json();
    return data;
  }

  renderData(data) {
    let { title, 
          authors, 
          publisher, 
          publishedDate, 
          description, 
          categories, 
          pageCount,
          averageRating,
          language
        } = data.volumeInfo;
    let html = `
      <div class="book-item d-flex justify-content-between">
        <div>
          <img src="${data.volumeInfo.imageLinks.smallThumbnail}" alt="No Image Found">
        </div>
        <div class="book-details">
         <p>
            <strong class="item-label">Title:</strong> 
            <span class="text-white">${title}</span>
         </p>
        <p>
          <strong class="item-label">Author:</strong> 
          <span class="text-white">${authors}</span>
        </p>
        <p>
          <strong class="item-label">Publisher: </strong> 
          <span class="text-white">${publisher}</span>
        </p>
        <p>
          <strong class="item-label">Published Date: </strong> 
          <span class="text-white">${publishedDate}</span>
        </p>
        <p>
          <strong class="item-label">Description: </strong> 
          <span class="text-white description" data-toggle="tooltip" data-placement="top" title="${description}">
            ${description.substring(0,20)}...
          </span>
        </p>
        <p>
          <strong class="item-label">Category: </strong> 
          <span class="text-white">${categories}</span>
        </p>
        <p>
          <strong class="item-label">Page Count: </strong> 
          <span class="text-white">${pageCount}</span>
        </p>
        <p>
          <strong class="item-label">Average Rating : </strong> 
          <span class="text-white">${averageRating}</span>
        </p>
        <p>
          <strong class="item-label">Language : </strong> 
          <span class="text-white">${language}</span>
        </p>
      </div>
      <div class="custom-checkbox d-flex justify-content-end">
       <input type ="checkbox">
      </div>
    `;

    bookItem = document.querySelector('.book-item');

    handleCheckEvent(bookItem);

    booksList.innerHTML += html;

  }

  clearData() {
    booksList.innerHTML = '';
  }

  handleCheckEvent(bookItem){
    
  }

}