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
      var type = images[k].fileType;
    //  console.log(src);
    if(type=='image/jpeg'){
       // $('.fade').slick('slickAdd',"<div><a class='thumbnail' href='#'><img class='img-responsive' src='" + src +"' alt='image'></a></div>");
    $('.slider-for').slick('slickAdd',"<div><a class='thumbnail' href='#'><img class='img-responsive' src='" + src +"' alt='image'></a></div>");
    $('.slider-nav').slick('slickAdd',"<div><a class='thumbnail' href='#'><img class='img-responsive' src='" + src +"' alt='image'></a></div>");
    }
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
// slick slider synching carousel
$('.slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.slider-for',
  dots: true,
  centerMode: true,
  focusOnSelect: true,
  mobileFirst:true,
  autoplay: true,
  autoplaySpeed: 3000,
  draggable:true,
  swipe:true,
  touchMove:true,
  arrows: true,
  mobileFirst:true
});

//User Form Variables
var fName = document.getElementById("firstName").value;
var lName = document.getElementById("lastName").value;
var eMail = document.getElementById("emailAddress").value;
var co = document.getElementById("companyName").value;
var phone = document.getElementById("phoneNumber").value;
var message = document.getElementById("messageBody").value;
var personName=fName+" "+lName;

// User Form EmailJS Web service call 
emailjs.send("gmmclientservice_gmail_com","geamase_media_contact_form",{"from_name":"personName", "company":"co","email_address":"eMail","contact_phone":"phone","message_html":"message"})
.then(function(response) {
   console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
}, function(err) {
   console.log("FAILED. error=", err);
});

})