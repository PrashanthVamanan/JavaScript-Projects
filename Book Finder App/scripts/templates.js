getModalTemplate = (data) => {
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
            <button type="button" class="btn btn-secondary close-button" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
  </div>`;

return modalTemplate;
}

getBookItemTemplate = (...args) => {
  let html = `
    <div class="book-item d-flex justify-content-between" id="${args[0]}">
      <div>
        <img src="${args[1].smallThumbnail}" alt="No Image Found">
      </div>
      <div class="book-details">
      <p>
          <strong class="item-label">Title:</strong> 
          <span class="text-white">${args[2]}</span>
      </p>
      <p>
        <strong class="item-label">Author:</strong> 
        <span class="text-white">${args[3]}</span>
      </p>
      <p>
        <strong class="item-label">Average Rating : </strong> 
        <span class="text-white">${args[4]}</span>
      </p>
      <div class="show-more d-flex justify-content-center">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick='onModalClick(${args[5]})'>Show More ...</button>
    </div>
    </div>
    <div class="d-flex justify-content-end">
    <input type ="checkbox" class="checkbox-status" id="checkbox">
    </div>
`;

return html;

}