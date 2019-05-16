const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let img = new Image();
let fileName = '';

const downloadBtn = document.getElementById('download-btn');
const uploadFile = document.getElementById('upload-file');
const revertBtn = document.getElementById('revert-btn');

function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
}

function submitFile() {

  let imageURL = canvas.toDataURL('image/jpeg', 0.8);
  let block = imageURL.split(";");
  let contentType = block[0].split(":")[1];
  let realData = block[1].split(",")[1];

  let blob = b64toBlob(realData, contentType);

  let formData = new FormData();
  formData.append('original_image', document.getElementById('upload-file').files[0]);
  formData.append('altered_image', blob);

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

// function submitFile() {
//   let blob = canvas.toBlob(function(blob) {
//       console.log(blob)
//       let formData = new FormData();
//       formData.append('original_image', document.getElementById('upload-file').files[0]);
//       formData.append('altered_image', blob);
//
//       axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
//       axios.defaults.xsrfCookieName = "csrftoken";
//
//       axios.post( '',
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       }
//     ).then(function(res){
//       console.log('SUCCESS!!');
//       // console.log(res);
//     })
//     .catch(function(err){
//       console.log('FAILURE!!');
//       // console.log(err);
//     });
//
//   }, 'image/jpeg', 0.8)
// }

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
  Caman('#canvas', img, function() {
    this.revert();
  });
});

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
  link.href = canvas.toDataURL('image/jpeg', 0.8);
  // New mouse event
  e = new MouseEvent('click');
  // Dispatch event
  link.dispatchEvent(e);
}
