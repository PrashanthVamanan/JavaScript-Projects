let checkboxStatus = false;

//To handle when user clicks on add to wishlist button
addToWishList = (wishlistElements, viewWishList) => {
  toastr.options.closeButton = true;
  toastr.success('Successfully added to wishlist!', {
    timeOut: 2000
  })
  viewWishList.classList.add("d-flex");
}


//Enable and disable view wishlist button based on checkbox status
updateCheckBoxStatus = (status, viewWishListButton) => {
  checkboxStatus = status;

  if (checkboxStatus) {
    viewWishListButton.disabled = false;
    viewWishListButton.style.cursor = "pointer";
  } else {
    viewWishListButton.disabled = true;
    viewWishListButton.style.cursor = "not-allowed";
  }
}

