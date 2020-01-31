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
    let template = getBookItemTemplate(index,imageLinks,title,authors,averageRating,strData)
    booksList.innerHTML += template;

  }

  clearData() {
    booksList.innerHTML = '';
  }

}