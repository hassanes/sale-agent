function readImage(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#preview').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

$(document).ready(function() {
  $("#form_edit_info").hide();
})

$("#profile_image").change(function () {
  readImage(this);
});

$("#edit_info").click(function() {
  $("#info").hide();
  $("#form_edit_info").show();
})

$("#cancel_edit_info").click(function() {
  $("#form_edit_info").hide();
  $("#info").show();
})