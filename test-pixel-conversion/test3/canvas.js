const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let img = new Image();
let fileName = '';

const downloadBtn = document.getElementById('download-btn');
const uploadFile = document.getElementById('upload-file');
const pixelfy = document.getElementById('pixelate-btn');

function rgb(r, g, b) {
  if (g == undefined) g = r;
  if (b == undefined) b = r;
  return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';
};

function clamp(value, min, max){
  return Math.min(Math.max(value, Math.min(min, max)),Math.max(min, max));
}

// let rgb = (r, g, b) => Math.floor((r + g + b) / 3);

function pixelate(blocksize) {
  if (blocksize == undefined) blocksize = 20;
  var imgData = ctx.getImageData(0,0,canvas.width,canvas.height).data;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // var buffer = new Uint8Array(imgData.data.buffer);

  for (var y = 0; y < canvas.height; y += blocksize) {
    for (var x = 0; x < canvas.width; x += blocksize) {
      var pos = (x + y * canvas.width) * 4;
      var red   = imgData[pos];
      var green = imgData[pos+1];
      var blue  = imgData[pos+2];

      ctx.fillStyle = rgb(red, green, blue);
      console.log('in pixelate', 'blocksize', blocksize, x, y, rgb(red, green, blue))
      ctx.fillRect(x, y, blocksize, blocksize);
    }
  }
}

pixelfy.addEventListener('click', () => pixelate(Math.floor(canvas.width/100)))
// pixelfy.addEventListener('click', () => pixelate(canvas.width/50))

// Upload file
uploadFile.addEventListener('change', (e) => {
  // get file
  const file = document.getElementById('upload-file').files[0];

  // Init FileReader
  const reader = new FileReader();

  if (file) {
    //set file name
    fileName = file.name;
    // read data as url
    reader.readAsDataURL(file);
  }

//add image to canvas
reader.addEventListener('load', (ev) => {
  // create img
  img = new Image();
  // set src
  img.src = reader.result;
  // on image load, add to canvas
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    canvas.removeAttribute('data-caman-id');
  }
}, false);
});

// Download Event
downloadBtn.addEventListener('click', (e) => {
// get file extension
const fileExtension = fileName.slice(-4);

// Init new fileName
let newFileName;

// check image type
if (fileExtension === '.jpg' || fileExtension === '.png') {
  newFileName = fileName.substring(0, fileName.length - 4) + '-edited.jpg';
}

// Call download
download(canvas, newFileName);
});

// Download function
function download(canvas, filename) {
// Init event
let e;
// create link (a-tag)
const link = document.createElement('a');

// Set props
link.download = filename;
link.href = canvas.toDataURL('image/jpeg', 0.8);
// New mouse event
e = new MouseEvent('click');
// Dispatch event
link.dispatchEvent(e);
}
