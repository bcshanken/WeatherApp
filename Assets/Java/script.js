$(document).ready(function() {
    console.log("connected")
    // Dom Variables
    var newCity = "";
    
    
    
    
    
    
    // Event Listeners
    $("#cityButton").on("click", function(event) {
        event.preventDefault();
        console.log($(this).parent().parent().parent().parent().find("input").val());
        // newCity = document.getElementById("cityInput");
        // console.log(newCity);
        
      });

  });