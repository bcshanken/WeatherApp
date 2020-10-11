$(document).ready(function() {
    console.log("connected")
    // Dom Variables
    var newCity = "";
    var cityList=["Philly", "San Fran"];
    
    
    function renderCityList (){
        $("#cityHistory").empty();    
        for(i=0;i<cityList.length;i++){
            console.log(cityList[i]);
            var newLiEl = $("<div>");
            newLiEl.attr("id",cityList[i]);
            newLiEl.attr("class","historyEl");
            newLiEl.text(cityList[i]);
            $("#cityHistory").append(newLiEl);
        }
    }
    
    
    // Event Listeners
    $("#cityButton").on("click", function(event) {
        event.preventDefault();
        newCity= ($(this).parent().parent().parent().parent().find("input").val());
        // newCity = document.getElementById("cityInput");
        console.log("the new city is " + newCity);
        cityList.push(newCity);
        console.log(cityList);
        renderCityList();
      });

        //Function calls
        renderCityList();

  });