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
  //  firebase.initializeApp(config);
    var database = firebase.database();
    var ref = database.ref('Audio');

    //create variables
    var audioName = "";
    var audioType = "";
    var audioUploadDate ="";
    //get time 
    var time = new Date().toString();
	var convertDate = moment(new Date(time));
	var currentTime = moment(convertDate);
	var time2 = currentTime._d.toString();
	var uploadDateTime = time2.split("(");

	populateAudioTable();

	// Create object for holding audio data
  	var newAudio = {
    	audioUpload: "",
    	audioName: "",
    	audioType: "",
    	audioDateUploaded: "",
  	};

  	//encode audio
    function encodeAudioFileAsURL(cb) {
    return function(){
        var file = this.files[0];
        var reader  = new FileReader();
        reader.onloadend = function () {
        //check for .jpg or .gif or .png
    	var ext = file.name.split('.').pop();

        if(ext != 'mp3')
        {
        	alert("Only .mp3 files please.");
        	return;
        }	
        else
            cb(reader.result);
        }
        reader.readAsDataURL(file);
        // get file name and file type from upload
       	newAudio.audioName =  file.name;
        newAudio.audioType = file.type;
        newAudio.audioDateUploaded = uploadDateTime[0];
    	}
	}

	// push new audio object to the database
	$('#inputAudioToLoad').change(encodeAudioFileAsURL(function(base64Img){
	    $('.viewAudio')
	      .find('label')
	        .text(newAudio.audioName);
	        newAudio.audioUpload=base64Img;
		ref.push(newAudio);
		console.log(newAudio);
		//clear and repopulate table
		$("#audio-table > tbody").empty();
		populateAudioTable();
	}));
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
		  		$("#audio-table > tbody").append("<tr><td><a href='"+ audioFile +"'>" + audioName + "</a></td><td>" + audioType + "</td><td>" + audioDate + "</td><td>Sample</td><td>Full Audio</td><td><button data-name='" + name + "' type='button' class='deletebtn btn btn-danger'>Delete</button></td></tr>");
		    }
		   };
		});
	};

	//add event listener for image delete button functionality
	  document.querySelector('body').addEventListener('click', function(event) {
  		ref.child(event.target.dataset.name).remove();
  		//clear and repopulate table
		// $("#image-table > tbody").empty();
		// populateTable();
		$("#audio-table > tbody").empty();
		populateAudioTable();
	}); 	
});