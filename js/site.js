//Site Script

//Globals
var c;
var ctx;
var overlay = new Array("images/ContentCensored.jpg", "images/GlobalAlly.jpg");

//Helper Functions
function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}
function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        $(img).error(function() { console.log("Sorry, the URL provided doesn't work"); });
        img.onload = function() {
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.drawImage(img, 0, 0, 800, 800);

            img2.src = overlay[$("#otype").find('input').index($("#otype").find(':checked'))];
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}

//Page Load
$(document).ready(function() {
  
    c = document.getElementById("maincanvas");
    ctx = c.getContext("2d");
    var img2 = new Image();
    img2.onload = function() {
        ctx.drawImage(img2, 0, 250);
        $("#output").empty();
        $("#output").append('<img src="' + c.toDataURL() + '">');
    };
    var imageLoader = document.getElementById('fileupload');
    imageLoader.addEventListener('change', handleImage, false);
    $("#urlSubmit").on("click", function() {
        event.preventDefault();
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        $(img).error(function() { console.log("Sorry, the URL provided doesn't work"); });
        img.onload = function() {
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.drawImage(img, 0, 0, 800, 800);
            img2.src = overlay[$("#otype").find('input').index($("#otype").find(':checked'))];
        };

        img.src = $("#imageURL").val();
    });

    $("#dlImage").on("click", function() {
        downloadCanvas(this, 'maincanvas', 'globalAlly.png');
    });

});
