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
	
		// Creates local "temporary" object for holding image data
  	var newImg = {
    	imageUpload: "",
    	fileName:"",
    	fileType: ""
  	};
    //encode image
    function encodeImageFileAsURL(cb) {
    return function(){
        var file = this.files[0];
        var reader  = new FileReader();
        reader.onloadend = function () {
            cb(reader.result);
        }
        reader.readAsDataURL(file);
        // get file name and file type from upload
       	newImg.fileName =  file.name;
        newImg.fileType = file.type;
    	}
	}
	// push new object to the database
	$('#inputFileToLoad').change(encodeImageFileAsURL(function(base64Img){
	    $('.viewImg')
	      .find('img')
	        .attr('src', base64Img);

	        newImg.imageUpload=base64Img;

		database.ref().push(newImg);
		console.log(newImg);
	}));

	//pull images from database and store in html table
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	  console.log(childSnapshot.val());

	  // Store everything into a variable.
	  var imgName = childSnapshot.val().fileName;
	  var imgType = childSnapshot.val().fileType;
	  // var imgUploadDate = childSnapshot.val().;
	 
	  // image Info
	  console.log(imgName);
	  console.log(imgType);
	  // console.log(imgUploadDate);

	  // Add each imge's data into the table
	  $("#image-table > tbody").append("<tr><td><a href='#'>" + imgName + "</a></td><td>" + imgType + "</td><td>12:00:00</td><td><button type='button' class='btn btn-danger' onclick='removeImage'>Delete</button></td></tr>");
	});
})

