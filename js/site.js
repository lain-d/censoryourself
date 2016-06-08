//Site Script

//Globals
var c;
var ctx;
var overlay = new Array("images/ContentCensored.jpg", "images/GlobalAlly.jpg");
var img2 = new Image();
var img = new Image();
var imgloaded = false;


function isUrlValid(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}
//Helper Functions
function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}
function handleImage(e) {
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

$("#otype").on("change",function(){
if(imgloaded === true)
{
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
        $("#output").fadeIn("fast").css("display","inline-block");
        $("#dlImage").fadeIn("fast").css("display","inline-block");

    };
    var imageLoader = document.getElementById('fileupload');
    imageLoader.addEventListener('change', handleImage, false);
    

    $("#dlImage").on("click", function() {
        console.log("go");
        downloadCanvas(this, 'maincanvas', 'globalAlly.png');
    });

});
