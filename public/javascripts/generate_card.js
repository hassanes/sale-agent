var canvas = new fabric.Canvas("card");

fabric.Image.fromURL("/imgs/card_background.jpg", function(oImg) {
  oImg.set("selectable", false);
  canvas.add(oImg);
  canvas.sendToBack(oImg);
});

fabric.Image.fromURL(user.image_path, function(oImg) {
  oImg.set({
    left: 100,
    top: 100,
    scaleX: 0.25,
    scaleY: 0.25,
    centeredScaling: true
  });
  canvas.add(oImg);
});

var firstname = new fabric.Text("ชื่อ :" + user.firstname, {
  left: 400,
  top: 100,
  fontFamily: "Kanit",
  fontSize: 25,
  stroke: "#c3bfbf",
  strokeWidth: 0.5
});
canvas.add(firstname);

var lastname = new fabric.Text("นามสกุล :" + user.lastname, {
  left: 400,
  top: 140,
  fontFamily: "Kanit",
  fontSize: 25,
  stroke: "#c3bfbf",
  strokeWidth: 0.5
});
canvas.add(lastname);

var social = new fabric.Text("Social Media", {
  left: 400,
  top: 200,
  fontFamily: "Kanit",
  fontSize: 25,
  stroke: "#424242",
  strokeWidth: 1
});
canvas.add(social);

var facebook = new fabric.Text("Facebook : " + user.social_media.facebook, {
  left: 400,
  top: 240,
  fontFamily: "Kanit",
  fontSize: 25,
  stroke: "#c3bfbf",
  strokeWidth: 0.5
});
canvas.add(facebook);

var line = new fabric.Text("Line : " + user.social_media.line, {
  left: 400,
  top: 280,
  fontFamily: "Kanit",
  fontSize: 25,
  stroke: "#c3bfbf",
  strokeWidth: 0.5
});
canvas.add(line);

var instagram = new fabric.Text("Instagram : " + user.social_media.instagram, {
  left: 400,
  top: 320,
  fontFamily: "Kanit",
  fontSize: 25,
  stroke: "#c3bfbf",
  strokeWidth: 0.5
});
canvas.add(instagram);


$("#download_card").click(function() {
  console.log("Click download");
  var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  window.location.href=image;
  
  /*
  canvas.toBlob(function(blob) {
      var formData = new FormData();
      formData.append("file", blob, "file.jpeg");
  }, "image/jpeg");
  */


});


/*
$("#download_card").click(function() {
  if (typeof canvas.toBlob !== "undefined") {
    canvas.toBlob(function(blob) {
      saveAs(blob, "pretty image.png");
    });
  }
});
*/
