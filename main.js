const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
let fileName = "";

const downloadBtn = document.getElementById("download-btn");
const uploadFile = document.getElementById("upload-file");
const revertBtn = document.getElementById("revert-btn");

// using event delegation for the filters and effects, event listener on the document, to target what we want, use if else statements
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('filter-btn')){
        if(e.target.classList.contains('brightness-add')){
            Caman('#canvas', img, function(){
                this.brightness(5).render();
            });
        } else if(e.target.classList.contains('brightness-remove')){
            Caman('#canvas', img, function(){
                this.brightness(-5).render();
            });
        } else if(e.target.classList.contains('contrast-add')){
            Caman('#canvas', img, function(){
                this.contrast(5).render();
            });
        } else if(e.target.classList.contains('contrast-remove')){
            Caman('#canvas', img, function(){
                this.contrast(-5).render();
            });
        } else if(e.target.classList.contains('saturation-add')){
            Caman('#canvas', img, function(){
                this.saturation(5).render();
            });
        } else if(e.target.classList.contains('saturation-remove')){
            Caman('#canvas', img, function(){
                this.saturation(-5).render();
            });
        } else if(e.target.classList.contains('vibrance-add')){
            Caman('#canvas', img, function(){
                this.vibrance(5).render();
            });
        } else if(e.target.classList.contains('vibrance-remove')){
            Caman('#canvas', img, function(){
                this.vibrance(-5).render();
            });
        } else if(e.target.classList.contains('vintage-add')){
            Caman('#canvas', img, function(){
                this.vintage().render();
            });
        } else if(e.target.classList.contains('lomo-add')){
            Caman('#canvas', img, function(){
                this.lomo().render();
            });
        } else if(e.target.classList.contains('clarity-add')){
            Caman('#canvas', img, function(){
                this.clarity().render();
            });
        } else if(e.target.classList.contains('sincity-add')){
            Caman('#canvas', img, function(){
                this.sinCity().render();
            });
        } else if(e.target.classList.contains('crossprocess-add')){
            Caman('#canvas', img, function(){
                this.crossProcess().render();
            });
        } else if(e.target.classList.contains('pinhole-add')){
            Caman('#canvas', img, function(){
                this.pinhole().render();
            });
        } else if(e.target.classList.contains('nostalgia-add')){
            Caman('#canvas', img, function(){
                this.nostalgia().render();
            });
        } else if(e.target.classList.contains('hermajesty-add')){
            Caman('#canvas', img, function(){
                this.herMajesty().render();
            });
        }
    }
});

//revert/remove filters
revertBtn.addEventListener('click', () =>{
    Caman('#canvas', img, function(){
        this.revert();
    })
});


//upload file
uploadFile.addEventListener("change", e => {
  //get file
  const file = document.getElementById("upload-file").files[0];

  //init file reader api, check MDN
  const reader = new FileReader();

  if (file) {
    //set file name
    fileName = file.name;
    //read data as URL
    reader.readAsDataURL(file);
  }
  //add image to the canvas
  reader.addEventListener(
    "load",
    () => {
      //create img
      img = new Image();
      //set the source of the image
      img.src = reader.result;
      //on image load, add to canvas
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        canvas.removeAttribute("data-caman-id");
      };
    },
    false
  );
});

//download
downloadBtn.addEventListener('click', (e) =>{
    //get file extension
    const fileExtension = fileName.slice(-4);

    //init new filename
    let newFileName;

    //check image type
    if(fileExtension === '.jpg' || fileExtension === '.png'){
        newFileName = fileName.substring(0,fileName.length - 4) + '-edited.jpeg';
    }

    //call download
    download(canvas, newFileName);
});

//download function 
function download(canvas,filename){
    //init event
    let e;
    //create link
    const link = document.createElement('a');
    //set props
    link.download = filename;
    link.href = canvas.toDataURL('image/jpeg', 0.8);
    //new mouse event
    e = new MouseEvent('click');
    //dispatch event
    link.dispatchEvent(e);
}