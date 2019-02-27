var config = {
    apiKey: "AIzaSyBRHoAb5QlXbtS5JWXtzAt8uYS6dqr3SHU",
    authDomain: "final-project-39fcd.firebaseapp.com",
    databaseURL: "https://final-project-39fcd.firebaseio.com",
    projectId: "final-project-39fcd",
    storageBucket: "final-project-39fcd.appspot.com",
    messagingSenderId: "515004479522"
    };
firebase.initializeApp(config);
var database = firebase.database();

var commentsData = {};

$(".options li").on('click', function() {
  commentsData.options = $(this).text();
  $(".btn:first-child").text($(this).text());
});

$("#request").on('submit', function(e) {
  console.log("test");
  e.preventDefault();
  commentsData.name = $("#name").val();
  $("#name").val('');
  var commentsReference = database.ref('comments');
  commentsReference.push(commentsData);
  $("#comments").html("<h2>Thank you for your request! Emily will be in touch with you soon.</h2>")
});

function getComments() {
  database.ref('comments').on('value', function (results) {
    var allComments = results.val();
    $("#comments").empty();
      for (var comment in allComments) {
        var context = {
          name: allComments[comment].name,
          options: allComments[comment].options,
          commentId: comment
        };
        var source = $("#comment-template").html();
        var template = Handlebars.compile(source);
        var commentItem = template(context);
        $("#comments").append(commentItem);
      }
  });
};

//getComments();

function initMap() {
  console.log("hello rory")
  console.log(google)
  var map = new google.maps.Map(document.getElementById('map'), 
  {
    center: {lat: 40.704351, lng: -74.011167},
    zoom: 15
  });
  var marker = new google.maps.Marker({
          position: {lat: 40.704351, lng: -74.011167},
          map: map,
          title: 'Code Nation Office'
        });
}

document.onload = initMap;
