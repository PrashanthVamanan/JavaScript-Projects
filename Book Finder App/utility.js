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