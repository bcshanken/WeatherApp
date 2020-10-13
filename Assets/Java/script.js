$(document).ready(function () {
    console.log("connected");
    // Dom Variables
    var newCity = "";
    var cityList = ["Philly", "San Fran"];
    var selectedCity = "";
    var selectedCityTemp = "";
    var selectedCityHumidity = "";
    var selectedCityWindSpeed = "";
    var selectedCityLat = "";
    var selectedCityLong = "";
    var selectedCityUv = "";


    //Function Definitions 
    function renderCityList() {
        $("#cityHistory").empty();
        for (i = 0; i < cityList.length; i++) {
            console.log(cityList[i]);
            var newLiEl = $("<div>");
            newLiEl.attr("id", cityList[i]);
            newLiEl.attr("class", "historyEl");
            newLiEl.text(cityList[i]);
            $("#cityHistory").append(newLiEl);
        }
    }

    function getCurrentData(){
        var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        selectedCity +
        "&units=imperial&appid=65a8340c47c8039a8355bd288e7f9d5a";
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
    
            selectedCityTemp = response.main.temp;
            selectedCityHumidity = response.main.humidity;
            selectedCityWindSpeed = response.wind.speed;
            selectedCityLat = response.coord.lat;
            selectedCityLong = response.coord.lon;
    
            var queryURLUv =
                "http://api.openweathermap.org/data/2.5/uvi?lat=" + selectedCityLat + "&lon=" + selectedCityLong + "&appid=65a8340c47c8039a8355bd288e7f9d5a";
            $.ajax({
                url: queryURLUv,
                method: "GET",
            }).then(function (response) {
              
    
                selectedCityUv = response.value;
                console.log(selectedCityUv);
                $("#cityDisplayed").text(selectedCity);
                $("#temperature").text("Temperature: " + selectedCityTemp + " F");
                $("#humidity").text("Humidity: " + selectedCityHumidity + " %");
                $("#windSpeed").text("Wind Speed: " + selectedCityWindSpeed + " mph");
                $("#uv").text("UV index: " + selectedCityUv);    
            });
        });
    }

    // Event Listeners
    $("#cityButton").on("click", function (event) {
        event.preventDefault();
        newCity = $(this).parent().parent().parent().parent().find("input").val();
        // newCity = document.getElementById("cityInput");
        selectedCity = newCity;
        console.log("the new city is " + newCity);
        cityList.push(newCity);
        console.log(cityList);
        renderCityList();
        localStorage.setItem("savedCities", JSON.stringify(cityList));
        getCurrentData();
    });

    //Function calls
    renderCityList();
    





});
