/* Built with <3 by Duan Walker 2017 */

$(document).ready(function(){

	// Initialize Firebase
    var config = {
      apiKey: "AIzaSyCuPLYd8d6IpS6EdAf8y40l4_07drR4FUM",
      authDomain: "geamasemedia.firebaseapp.com",
      databaseURL: "https://geamasemedia.firebaseio.com",
      projectId: "geamasemedia",
      storageBucket: "geamasemedia.appspot.com",
      messagingSenderId: "337938452314"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

	//whenever a new image is uploaded... 
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	// Store encoded image from database into a variable.
  var images = childSnapshot.val();
    var keys = Object.keys(images);
    console.log(keys);
    for(i=0;i<keys.length;i++){
      var k = keys[i];
  	  var src = images[k].imageUpload;
    console.log(src);
  	$('.fade').slick('slickAdd',"<div><a class='thumbnail' href='#'><img class='img-responsive' src='" + src +"' alt='image'></a></div>");
  };
 //	$("#carousel").append("<div><a class='thumbnail' href='#'><img class='img-responsive' src='" + src +"' alt='image'></a></div>");
	});

//slick image carousel
$('.fade').slick({
  dots: true,
  infinite: true,
  speed: 600,
  fade: true,
  cssEase: 'linear',
  autoplay: true,
  autoplaySpeed: 3000,
  draggable:true,
  swipe:true,
  touchMove:true,
  mobileFirst:true,
});
	

})