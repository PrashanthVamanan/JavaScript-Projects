var initialIndex = 1;
slideImages(initialIndex);

function setIndex(index) {
    initialIndex = initialIndex + index;
    slideImages(initialIndex);
}

function slideImages(index){
    var images = document.getElementsByClassName("image");

    if(index < 1) {
        initialIndex = images.length;
    } else if(index > images.length) {
        initialIndex = 1;
    }

    for(let i = 0; i < images.length; i++){
        images[i].style.display = 'none';
    }

    images[initialIndex - 1].style.display = 'block';

}