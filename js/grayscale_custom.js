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
   // console.log("default app name is: " + firebase.app().name);
    var database = firebase.database();

	//whenever a new image is uploaded... 
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	// Store encoded image from database into a variable.
    var values = childSnapshot.val();
    var keys = Object.keys(values);
    console.log(keys);
  for(i=0;i<keys.length;i++){
      var k = keys[i];
  	  //get image variables
      var src = values[k].imageUpload;
      var type = values[k].fileType;
      //get audio variables
      var audioName = values[k].audioName;
      var audioType = values[k].audioType;
      var audioDate = values[k].audioDateUploaded;
      var audioFile = values[k].audioUpload;
    //  console.log(src);
    if(type=='image/jpeg'){
       // $('.fade').slick('slickAdd',"<div><a class='thumbnail' href='#'><img class='img-responsive' src='" + src +"' alt='image'></a></div>");
    $('.slider-for').slick('slickAdd',"<div><a class='thumbnail' href='#'><img class='img-responsive' src='" + src +"' alt='image'></a></div>");
    $('.slider-nav').slick('slickAdd',"<div><a class='thumbnail' href='#'><img class='img-responsive' src='" + src +"' alt='image'></a></div>");
    }
    if(audioType == 'audio/mp3'){
          $("#audio-table > tbody").append("<tr><td><a href='"+ audioFile +"'>" + audioName + "</a></td><td>" + audioType + "</td><td>" + audioDate.substring(0,16) + "</td><td><button type='button' class='playBtn btn btn-default btn-sm' data-src='" + audioFile + "'><span class='glyphicon glyphicon-play' aria-hidden='true'></span> Play</button></td><td><button data-name='" + name + "'>PayPalbtn</button></td></tr>");
    }
    
    };
    

    // var play = document.querySelector(".playBtn");
    // play.on('click', function(event) {
    //   var song = event.target.dataset.scr; //$(this).data(audioFile);
    //   var src = song.toString(); 
    //   console.log(song);
    // $("#audioPlayer").attr("src",song);
    // }); 

    // $(".playBtn").each(function(index, element) {
    //     var test = $(this).data(src);
    //     var test2 = test.toString();
    //     //console.log(test2);
    //     $("#audioPlayer").attr("src",test2);
    //   });
      
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

//play audio files
    // $("button").click(function(){
    //   var song = $(this).attr("data-src");
    //   console.log(song);
    //   $("#audioPlayer").attr("src","song");
    // });
     
document.querySelector("body").addEventListener('click', function(event) {
    //  var song = $(this).data(src);
      var src = event.target.dataset.src//song.toString();//JSON.stringify(song); //event.target.dataset.audioFile;
    //  song.prototype.toString = function songToString() {
    //   var src = this.breed;
    //   return scr;
    // }
    //  console.log(src);
    $("#audioPlayer").attr("src",src);
    }); 


})