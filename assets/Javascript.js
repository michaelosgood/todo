// Michael Osgood / To Do List

// Console logs date and time in 24 hour format to verify that moment.js is working
console.log(moment().format("HH:mm")); // Console logs date and time in 24 hour format

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAMJVwgewkaFHYb_TpRBuoii6R9r3b8w3c",
    authDomain: "todo-fc154.firebaseapp.com",
    databaseURL: "https://todo-fc154.firebaseio.com",
    projectId: "todo-fc154",
    storageBucket: "todo-fc154.appspot.com",
    messagingSenderId: "228287179446"
};
firebase.initializeApp(config);

// Variable to reference the database
var database = firebase.database();

// To Do Object
var tasks = {
  name: "",
  description: "",
  deadline: "",
}

// Function to Add Task when button is clicked
$("#addTask").on("click", function(){
  event.preventDefault();
  console.log("Task Added Successfully!");

  tasks.name = $("#name-input").val().trim();
  tasks.description = $("#description-input").val().trim();
  tasks.deadline = $("#deadline-input").val().trim();

  // Pushes our data to Firebase
	database.ref().push(tasks);
  alert("Task Added!");

  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#description-input").val("");
  $("#deadline-input").val("");
    
  return false;
});

// Function to delete Task
$('#deleteTask').on("click", function(){
  console.log("Task Deleted Successfully!");

  database.ref().delete(tasks);
  alert("Task Deleted")
});

// Used to pull data from Firebase and display it on #taskTable
database.ref().on("child_added", function(snapshot) {
  var name = snapshot.val().name;
  var description = snapshot.val().description;
  var deadline = snapshot.val().deadline;

  $("#taskTable > tBody").append("<tr><td>"+name+"</td><td>"+description+"</td><td>"+deadline+"</td></tr>");
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