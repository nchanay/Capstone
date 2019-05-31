const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let img = new Image();
let fileName = '';
let blocksize = 100;
let mixsize = 100;

const downloadBtn = document.getElementById('download-btn');
const uploadFile = document.getElementById('upload-file');
const revertBtn = document.getElementById('revert-btn');
const pixelfy = document.getElementById('pixelate-btn');
const mixelfy = document.getElementById('mixelate-btn');
const blocksizeRange = document.getElementById("pixelsize");
const mixsizeRange = document.getElementById("mixelsize");

// submits original and altered images as form data to the server
function submitFile() {

  let imgURL = canvas.toDataURL('image/jpeg', 1.0);
  let formData = new FormData();
  formData.append('original_image', uploadFile.files[0]);
  formData.append('altered_image', imgURL);

  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";

  axios.post( '',
    formData,
    {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
    }
  ).then(function(res){
    console.log('SUCCESS!!');
    console.log(res);
  })
  .catch(function(err){
    console.log('FAILURE!!');
    console.log(err);
  });
}


function rgb(r, g, b) {
  if (g == undefined) g = r;
  if (b == undefined) b = r;
  return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';
};

function clamp(value, min, max){
  return Math.min(Math.max(value, Math.min(min, max)),Math.max(min, max));
}

function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    canvas.removeAttribute('data-caman-id');
}

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
    img.onload = drawImage;
  }, false);
});

function pixelate(blocksize) {
  var imgData = ctx.getImageData(0,0,canvas.width,canvas.height).data;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var y = 0; y < canvas.height; y += blocksize) {
    for (var x = 0; x < canvas.width; x += blocksize) {
      var pos = (x + y * canvas.width) * 4;
      var red   = imgData[pos];
      var green = imgData[pos+1];
      var blue  = imgData[pos+2];

      ctx.fillStyle = rgb(red, green, blue);
      ctx.fillRect(x, y, blocksize, blocksize);
    }
  }
}

pixelfy.addEventListener('click', () => pixelate(Math.floor(canvas.width/blocksize)))

blocksizeRange.addEventListener('change', function(evt) {
  blocksize = Math.floor(canvas.width/blocksizeRange.value)
  drawImage()
  pixelate(blocksize)
})

mixelfy.addEventListener('click', () => pixelate(canvas.width/mixsize))

mixsizeRange.addEventListener('change', function(evt) {
  mixsize = canvas.width/mixsizeRange.value
  drawImage()
  pixelate(mixsize)
})

// add filters & Effects
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-btn')) {
    if (e.target.classList.contains('brightness-add')) {
      Caman('#canvas', img, function() {
        this.brightness(5).render();
      });
    } else if (e.target.classList.contains('brightness-remove')) {
      Caman('#canvas', img, function() {
        this.brightness(-5).render();
      });
    } else if (e.target.classList.contains('contrast-add')) {
      Caman('#canvas', img, function() {
        this.contrast(5).render();
      });
    } else if (e.target.classList.contains('contrast-remove')) {
      Caman('#canvas', img, function() {
        this.contrast(-5).render();
      });
    } else if (e.target.classList.contains('saturation-add')) {
      Caman('#canvas', img, function() {
        this.saturation(5).render();
      });
    } else if (e.target.classList.contains('saturation-remove')) {
      Caman('#canvas', img, function() {
        this.saturation(-5).render();
      });
    } else if (e.target.classList.contains('vibrance-add')) {
      Caman('#canvas', img, function() {
        this.vibrance(5).render();
      });
    } else if (e.target.classList.contains('vibrance-remove')) {
      Caman('#canvas', img, function() {
        this.vibrance(-5).render();
      });
    } else if (e.target.classList.contains('vintage-add')) {
      Caman('#canvas', img, function() {
        this.vintage().render();
      });
    } else if (e.target.classList.contains('lomo-add')) {
      Caman('#canvas', img, function() {
        this.lomo().render();
      });
    } else if (e.target.classList.contains('clarity-add')) {
      Caman('#canvas', img, function() {
        this.clarity().render();
      });
    } else if (e.target.classList.contains('sincity-add')) {
      Caman('#canvas', img, function() {
        this.sinCity().render();
      });
    } else if (e.target.classList.contains('crossprocess-add')) {
      Caman('#canvas', img, function() {
        this.crossProcess().render();
      });
    } else if (e.target.classList.contains('pinhole-add')) {
      Caman('#canvas', img, function() {
        this.pinhole().render();
      });
    } else if (e.target.classList.contains('nostalgia-add')) {
      Caman('#canvas', img, function() {
        this.nostalgia().render();
      });
    } else if (e.target.classList.contains('hermajesty-add')) {
      Caman('#canvas', img, function() {
        this.herMajesty().render();
      });
    }
  }
});

// Revert filters
revertBtn.addEventListener('click', e => {
  // Caman('#canvas', img, function() {
  //   this.revert();
  // });
  drawImage();
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
  // sending form data to sever
  submitFile();
});

// Download function
function download(canvas, filename) {
  // Init event
  let e;
  // create link (a-tag)
  const link = document.createElement('a');

  // Set props
  link.download = filename;
  link.href = canvas.toDataURL('image/jpeg', 1.0);
  // New mouse event
  e = new MouseEvent('click');
  // Dispatch event
  link.dispatchEvent(e);
}
