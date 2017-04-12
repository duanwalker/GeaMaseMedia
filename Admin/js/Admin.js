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
    var ref = database.ref('Images');

    var imgName = "";
    var imgType = "";
    var imgUploadDate ="";

    var time = new Date().toString();
	var convertDate = moment(new Date(time));
	var currentTime = moment(convertDate);
	var time2 = currentTime._d.toString();
	var uploadDateTime = time2.split("(");
	//run function to initialize table
	populateTable();

	// Creates object for holding image data
  	var newImg = {
    	imageUpload: "",
    	fileName: "",
    	fileType: "",
    	dateUploaded: "",
  	};
    //encode image
    function encodeImageFileAsURL(cb) {
    return function(){
        var file = this.files[0];
        var reader  = new FileReader();
        reader.onloadend = function () {
        //check for .jpg or .gif or .png
    	var ext = file.name.split('.').pop();

        if(ext != 'jpg')
        {
        	alert("Only .jpg files please.");
        	return;
        }	
        else
            cb(reader.result);
        }
        reader.readAsDataURL(file);
        // get file name and file type from upload
       	newImg.fileName =  file.name;
        newImg.fileType = file.type;
        newImg.dateUploaded = uploadDateTime[0];
    	}
	}
	// push new object to the database
	$('#inputFileToLoad').change(encodeImageFileAsURL(function(base64Img){
	    $('.viewImg')
	      .find('img')
	        .attr('src', base64Img);
	        newImg.imageUpload=base64Img;
		ref.push(newImg);
		console.log(newImg);
		//clear and repopulate table
		$("#image-table > tbody").empty();
		populateTable();
	}));
	//function to pull images from database and store in html table
	function populateTable(){
	  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	  console.log(childSnapshot.val());
	  var images = childSnapshot.val();
	  var keys = Object.keys(images);
	  console.log(keys);
	  for(i=0;i<keys.length;i++){
	  	var k = keys[i];
	  	imgName = images[k].fileName;
	  	imgType = images[k].fileType;
	  	imgDate = images[k].dateUploaded;
	  
	  	console.log(imgName,imgType);
	  	// Add each imge's data into the table
	  	$("#image-table > tbody").append("<tr><td><a href='#'>" + imgName + "</a></td><td>" + imgType + "</td><td>" + imgDate + "</td><td><button id='delete' type='button' class='deletebtn btn btn-danger'>Delete</button></td></tr>");
	  	
	  	//delete button functionality
		$(".deletebtn").click(function(){
			console.log(prevChildKey);
			console.log(keys);
			console.log(keys[1]);
			console.log(k);
			ref.child().remove();
			//clear and repopulate table
			$("#image-table > tbody").empty();
			populateTable();
		});
	   };
	});
	};  	
})

