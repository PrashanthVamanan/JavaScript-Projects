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
    let html = `
      <div class="book-item d-flex justify-content-between">
        <div>
          <img src="${data.volumeInfo.imageLinks.smallThumbnail}" alt="No Image Found">
        </div>
        <div class="book-details">
         <p>
            <strong class="item-label">Title:</strong> 
            <span class="text-white">${data.volumeInfo.title}</span>
         </p>
        <p>
          <strong class="item-label">Author:</strong> 
          <span class="text-white">${data.volumeInfo.authors[0]}</span>
        </p>
        <p>
          <strong class="item-label">Publisher: </strong> 
          <span class="text-white">${data.volumeInfo.publisher}</span>
        </p>
      </div>
    `;

    booksList.innerHTML += html;

  }

}