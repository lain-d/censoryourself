//Site Script
//Globals
var c;
var ctx;
var overlay = new Array("images/ContentCensored.jpg", "images/GlobalAlly.jpg");
var img2 = new Image();
var img = new Image();
var imgloaded = false;

//Helper Functions
function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

function loadImage(e) {
    var reader = new FileReader();
    reader.onload = function(event) {

        img.setAttribute('crossOrigin', 'anonymous');
        $(img).error(function() { console.log("Sorry, image provided doesn't work"); });
        img.onload = function() {
            imgloaded = true;
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

    $("#otype").on("change", function() {
        if (imgloaded === true) {
            ctx.drawImage(img, 0, 0, 800, 800);
            img2.src = overlay[$("#otype").find('input').index($("#otype").find(':checked'))];
        }

    });

    c = document.getElementById("maincanvas");
    ctx = c.getContext("2d");

    img2.onload = function() {
        ctx.drawImage(img2, 0, 250);
        $("#output").empty();
        $("#output").append('<img src="' + c.toDataURL() + '">');
        $("#output").fadeIn("fast").css("display", "block");
        $("#dlImage").fadeIn("fast").css("display", "inline-block");

    };
    var imageLoader = document.getElementById('fileupload');
    imageLoader.addEventListener('change', loadImage, false);

    $("#dlImage").on("click", function() {
        console.log("go");
        downloadCanvas(this, 'maincanvas', 'globalAlly.png');
    });

});
