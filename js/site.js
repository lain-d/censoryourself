//Site Script
$( document ).ready(function() {
 

var c = document.getElementById("maincanvas");
var ctx = c.getContext("2d");


$("#urlSubmit").on("click", function(){

var img = new Image();
img.onload = function() {
    ctx.drawImage(img, 0, 0);
};
img.src = $("#imageURL").val();

});



});
