// Create an initial toDoCount variable
var toDoCount = 0;
//  On Click event associated with the add-to-do function
$("#add-to-do").on("click", function(event) {
// prevent form from submitting
event.preventDefault();

// Get the to-do "value" from the textbox and store it a variable
var toDoValue = $('#to-do').val().trim();
// Create a new variable that will hold a "<p>" tag.
var p = $('<p class="text-center">');
// Then give it an ID in the following form:
// "item-4" or "item-3" or "item-99", where the number is equal to toDoCount.
p.attr('id', 'item-' + toDoCount);
// Then append the to-do "value" as text to this <p> element.
p.text(toDoValue);
// p.append(toDoValue);

// Create a button with unique identifiers based on what number it is in the list. Again use jQuery to do this.
var button = $('<button>');
// Give your button a data attribute called data-to-do and a class called "checkbox".
button.attr('data-to-do', toDoCount);
button.addClass('checkbox');
// Lastly append the letter X inside.
button.text('X');

// Append the button to the to do item
p.append(button);

// Add the button and toDoItem to the to-dos div
$('#to-dos').append(p);

// Clear the textbox when done
$('#to-do').val('');

// Add to the toDoCount
toDoCount++;
});

//  When a user clicks a check box then delete the specific content
//  (NOTE: Pay attention to the unusual syntax here for the click event.
//  Because we are creating click events on "dynamic" content, we can't just use the usual "on" "click" syntax.)
$(document.body).on("click", ".checkbox", function() {

    // Get the number of the button from its data attribute and hold in a variable called  toDoNumber.
    var toDoNumber = $(this).attr('data-to-do');
        
    // Select and Empty the specific <p> element that previously held the to do item number.
    $('#item-'+toDoNumber).remove();

});