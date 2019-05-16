const canvas = document.querySelector('#og-image');
const context = canvas.getContext('2d');
const uploadedFile = document.querySelector('#uploader');
const imageSource = document.getElementById('SourceImage');


window.addEventListener('DOMContentLoaded', imageLoader);


// runs when user selects a file
function imageLoader() {
  uploadedFile.addEventListener('change', uploadedImage);

  function uploadedImage(event) {
    // uses first file if multiple are selected
    var file = event.target.files[0];
    handleFile(file);
  }
}

function handleFile(file) {
  // an object that lets web apps read the files on a user's computer
  var reader = new FileReader();

  // runs once the image file has loaded
  reader.onloadend = function(event) {
    // Stores a new image object, not visible. has attibutes and methods associated
    var tempImage = new Image();

    // won't run this fuction until something is loaded
    tempImage.onload = function(ev) {
      // Uses the image data to set up the width and height of the canvas to match that image
      canvas.height = ev.target.height;
      canvas.width = ev.target.width;

      // Draws that image to the canvas
      context.drawImage(ev.target, 0, 0);
    }

    tempImage.src = event.target.result;
  }
  // loads image into javascript
  reader.readAsDataURL(file);
}

//
// function drawImage(image) {
//   // Set the canvas the same width and height of the image
//   canvas.width = image.width;
//   canvas.height = image.height;
//
//   context.drawImage(image, 0, 0);
// }
// 
// drawImage(imageSource);

var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
var filterControls = document.querySelectorAll('input[type=range]');
function applyFilter() {
  var computedFilters = '';
  filterControls.forEach(function(item, index) {
    computedFilters += item.getAgttribute('data-filter') + '(' + item.value + item.getAgttribute('data-scale') + ') ';
  });
  imageData.style.filter = computedFilters;
}
