//DOM Queries and Variables;

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

  renderData(data, index) {
    let { title, 
          authors,
          averageRating,
          imageLinks
        } = data.volumeInfo;
    let strData = JSON.stringify(data.volumeInfo);
    let html = `
      <div class="book-item d-flex justify-content-between" id="${index}">
        <div>
          <img src="${imageLinks.smallThumbnail}" alt="No Image Found">
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
          <strong class="item-label">Average Rating : </strong> 
          <span class="text-white">${averageRating}</span>
        </p>
        <div class="show-more d-flex justify-content-center">
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick='onModalClick(${strData})'>Show More ...</button>
       </div>
      </div>
      <div class="d-flex justify-content-end">
       <input type ="checkbox" class="checkbox-status" id="checkbox">
      </div>
    `;

    booksList.innerHTML += html;

  }

  clearData() {
    booksList.innerHTML = '';
  }

}