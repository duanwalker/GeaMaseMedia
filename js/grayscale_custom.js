/* Built with <3 by Duan Walker 2017 */

$(document).ready(function(){
  //set variables
  var values,keys,k,src, type,audioName,audioType,audioDate,audioFile;
//   var ppBtn = "<form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top'>" +
// "<input type='hidden' name='cmd' value='_s-xclick'>" +
// "<input type='hidden' name='hosted_button_id' value='EXYRWQM4NSUAJ'>" +
// "<input type='image' src='https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif' border='0' name='submit' alt='PayPal - The safer, easier way to pay online!'>" +
// "<img alt=' border='0' src='https://www.paypalobjects.com/en_US/i/scr/pixel.gif' width='1' height='1'>" +
// "</form>";

  var ppBtn = "<form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top'>" +
"<input type='hidden' name='cmd' value='_s-xclick'>"+
"<input type='hidden' name='hosted_button_id' value='MBK8SYC45NHEN'>"+
"<input type='image' src='https://www.paypalobjects.com/en_US/i/btn/btn_buynow_LG.gif' border='0' name='submit' alt='PayPal - The safer, easier way to pay online!'>"+
"<img alt=' border='0' src='https://www.paypalobjects.com/en_US/i/scr/pixel.gif' width='1' height='1'></form>"


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
    values = childSnapshot.val();
    keys = Object.keys(values);
    // console.log(keys);
  for(i=0;i<keys.length;i++){
      k = keys[i];
  	  //get image variables
      src = values[k].imageUpload;
      type = values[k].fileType;
      //get audio variables
      audioName = values[k].audioName;
      audioType = values[k].audioType;
      audioDate = values[k].audioDateUploaded;
      audioFile = values[k].audioUpload;
    
    if(type=='image/jpeg'){
       // $('.fade').slick('slickAdd',"<div><a class='thumbnail' href='#'><img class='img-responsive' src='" + src +"' alt='image'></a></div>");
        $('.slider-for').slick('slickAdd',"<div><a class='thumbnail' href='#'><img class='img-responsive' src='" + src +"' alt='image'></a></div>");
        $('.slider-nav').slick('slickAdd',"<div><a class='thumbnail' href='#'><img class='img-responsive' src='" + src +"' alt='image'></a></div>");
      
        $("#gallaryNavLoad").hide();
    }
    if(audioType == 'audio/mp3'){
          $("#audio-table > tbody").append("<tr><td>" + audioName + "</td><td>" + audioType + "</td><td>" + audioDate.substring(0,16) + "</td><td><button type='button' class='playBtn btn blue btn-sm' data-src='" + audioFile + "'><span class='glyphicon glyphicon-play' aria-hidden='true'></span> Play</button></td><td><div class='dnld' data-dnld='" + audioFile + "'>" + ppBtn + "</div></td></tr>");
          $("#audioLoad").hide();
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

//add audio file to session storage
    $(".dnld").click(function(){
      var song = $(this).attr("data-dnld");
      // check browser support for session storage
      if (typeof(Storage) !== "undefined") {
      // Code for localStorage/sessionStorage.
        localStorage.purchasedAudio = song;
      } else {
      // Sorry! No Web Storage support..
      alert("Your browser does not support the download of this type of audio.");
      }
    });
     
document.querySelector("body").addEventListener('click', function(event) {

      var src = event.target.dataset.src;
    $("#audioPlayer").attr("src",src);
}); 



})