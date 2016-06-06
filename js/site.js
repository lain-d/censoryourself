//Site Script

function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}



function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img,0,0, 800, 800);
        //    
            img2.src = "images/GlobalAlly.jpg";
        };
        img.src = event.target.result;
        img.setAttribute('crossorigin', 'anonymous');
    };
    reader.readAsDataURL(e.target.files[0]);     
}

var c;
var ctx;
var img2 = new Image();


$( document ).ready(function() {
c = document.getElementById("maincanvas");
ctx = c.getContext("2d");

img2.onload = function() {
    ctx.drawImage(img2, 0, 250);
      $("#output").append('<img src="'+c.toDataURL()+'">');
};

var imageLoader = document.getElementById('fileupload');
imageLoader.addEventListener('change', handleImage, false);




$("#urlSubmit").on("click", function(){
    event.preventDefault();

var img = new Image();
img.onload = function() {
    ctx.drawImage(img, 0, 0, 800, 800);
 //   img2.setAttribute('crossOrigin', 'anonymous');
    img2.src = "images/GlobalAlly.jpg";
};
img.src = $("#imageURL").val();
img.setAttribute('crossorigin', 'anonymous');

});


$("#dlImage").on("click", function(){
  downloadCanvas(this, 'maincanvas', 'globalAlly.png');
});

});
