// Michael Osgood / Train Scheduler

// Console logs date and time in 24 hour format to verify that moment.js is working
console.log(moment().format("HH:mm")); // Console logs date and time in 24 hour format

// Initialize Firebase
var config = {
	apiKey: "AIzaSyAitrNyAyEoM5Mo7cs5YaqPIdFo8HCbXsQ",
    authDomain: "trainscheduler-ea83f.firebaseapp.com",
    databaseURL: "https://trainscheduler-ea83f.firebaseio.com",
    projectId: "trainscheduler-ea83f",
    storageBucket: "trainscheduler-ea83f.appspot.com",
    messagingSenderId: "679724840977"
};
firebase.initializeApp(config);

// Variable to reference the database
var database = firebase.database();

// Train Object
var train = {
	name: "",
	destination: "",
	time: "",
	frequency: "",
}

// Function to add train when button is clicked
$("#addTrain").on("click", function(){
	event.preventDefault(); // Prevents page from refreshing when button is clicked
	console.log("Submit Button Clicked"); // Console Log the that button has been clicked

	// Storing the data that the user inputs
	train.name = $("#name-input").val().trim();
	train.destination = $("#destination-input").val().trim();
	train.time = moment($("#time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
	train.frequency = $("#frequency-input").val().trim();

	// Pushes our data to Firebase
	database.ref().push(train);
  alert("Train Added!");
  return false;
});

// Used to pull data from Firebase and display it on #trainTable
database.ref().on("child_added", function(snapshot) {
  var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var time = snapshot.val().time;

    var remainder = moment().diff(moment.unix(time),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+
    "</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
});

// Clock Function
  (function () {
    var clockElement = document.getElementById("clock");
    function updateClock(clock) {
      clock.innerHTML = new Date().toLocaleTimeString();
    }
    setInterval(function() {
    updateClock(clockElement);
    }, 1000);
    }());