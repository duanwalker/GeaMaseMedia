$(document).ready(function(){
// Initialize Firebase
 //    var config2 = {
 //      apiKey: "AIzaSyCuPLYd8d6IpS6EdAf8y40l4_07drR4FUM",
 //      authDomain: "geamasemedia.firebaseapp.com",
 //      databaseURL: "https://geamasemedia.firebaseio.com",
 //      projectId: "geamasemedia",
 //      storageBucket: "geamasemedia.appspot.com",
 //      messagingSenderId: "337938452314"
 //    };
 //    // var otherApp = firebase.initializeApp(config2, "other");
 //    // console.log("new default name is:" + otherApp.name);
 //    var database = firebase.database();
 //    var ref = database.ref('Audio');

 //    //create variables
 //    var audioName = "";
 //    var audioType = "";
 //    var audioUploadDate ="";
 //    //get time 
 //    var time = new Date().toString();
	// var convertDate = moment(new Date(time));
	// var currentTime = moment(convertDate);
	// var time2 = currentTime._d.toString();
	// var uploadDateTime = time2.split("(");

	populateAudioTable();

	
	//function to pull audio from database and store in html table
	function populateAudioTable(){
	  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
		  console.log(childSnapshot.val());
		  var audio = childSnapshot.val();
		  var keys = Object.keys(audio);
		  console.log(keys);
		  for(i=0;i<keys.length;i++){
		  	var k = keys[i];
		  	audioName = audio[k].audioName;
		  	audioType = audio[k].audioType;
		  	audioDate = audio[k].audioDateUploaded;
		  	audioFile = audio[k].audioUpload;
		  	var name = k;
		  //	console.log(audioName,audioType,name);
		  	// Add each audio's data into the table
		  	if(audioType == 'audio/mp3'){
		  		$("#audio-table > tbody").append("<tr><td><a href='"+ audioFile +"'>" + audioName + "</a></td><td>" + audioType + "</td><td>" + audioDate + "</td><td><button data-name='" + name + "'>Sample</button></td><td><button data-name='" + name + "'>PayPalbtn</button></td></tr>");
		    }
		   };
		});
	};

	//add event listener for image purchase button functionality
	  document.querySelector('body').addEventListener('click', function(event) {
  		//ref.child(event.target.dataset.name).remove();
  		//clear and repopulate table
		// $("#image-table > tbody").empty();
		// populateTable();
		$("#audio-table > tbody").empty();
		populateAudioTable();
	}); 	
});