$(document).ready(function () {
  console.log("connected");
  // Dom Variables
  var newCity = "";
  var cityList = JSON.parse(localStorage.getItem("savedCities"));
  console.log(cityList);
  var selectedCity = "";
  var selectedCityTemp = "";
  var selectedCityHumidity = "";
  var selectedCityWindSpeed = "";
  var selectedCityLat = "";
  var selectedCityLong = "";
  var selectedCityUv = "";
  var currentDay = moment().format("L");
  var futureOne = moment().add(1, "day").format("L");
  var futureTwo = moment().add(2, "day").format("L");
  var futureThree = moment().add(3, "day").format("L");
  var futureFour = moment().add(4, "day").format("L");
  var futureFive = moment().add(5, "day").format("L");

  //Function Definitions
  function renderCityList() {
    $("#cityHistory").empty();
    for (i = 0; i < cityList.length; i++) {
      console.log(cityList[i]);
      var newLiEl = $("<button>");
      newLiEl.attr("id", "savedCity");
      newLiEl.attr("class", "historyEl");
      newLiEl.attr("data-local", cityList[i]);
      newLiEl.text(cityList[i]);
      $("#cityHistory").append(newLiEl);
    }
  }

  function getCurrentData() {
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
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
        selectedCityLat +
        "&lon=" +
        selectedCityLong +
        "&appid=65a8340c47c8039a8355bd288e7f9d5a";
      $.ajax({
        url: queryURLUv,
        method: "GET",
      }).then(function (response) {
        selectedCityUv = response.value;
        console.log(selectedCityUv);
        $("#cityDisplayed").text(selectedCity + " (" + currentDay + ")");
        $("#temperature").text("Temperature: " + selectedCityTemp + " F");
        $("#humidity").text("Humidity: " + selectedCityHumidity + " %");
        $("#windSpeed").text("Wind Speed: " + selectedCityWindSpeed + " mph");
        $("#uv").text("UV Index: " + selectedCityUv);
      });
    });
  }

  function forcastDays() {
    $("#dayOneDate").text(futureOne);
    $("#dayTwoDate").text(futureTwo);
    $("#dayThreeDate").text(futureThree);
    $("#dayFourDate").text(futureFour);
    $("#dayFiveDate").text(futureFive);
  }
  function forcastData() {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      selectedCity +
      "&units=imperial&appid=65a8340c47c8039a8355bd288e7f9d5a";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (responseTwo) {
      // forecast temp
      $("#dayOneTemp").text(
        "Temp: " + Math.floor(responseTwo.list[0].main.temp_max) + " F"
      );
      $("#dayTwoTemp").text(
        "Temp: " + Math.floor(responseTwo.list[8].main.temp_max) + " F"
      );
      $("#dayThreeTemp").text(
        "Temp: " + Math.floor(responseTwo.list[16].main.temp_max) + " F"
      );
      $("#dayFourTemp").text(
        "Temp: " + Math.floor(responseTwo.list[24].main.temp_max) + " F"
      );
      $("#dayFiveTemp").text(
        "Temp: " + Math.floor(responseTwo.list[32].main.temp_max) + " F"
      );
      // forecast humidity
      $("#dayOneHumidity").text(
        "Humidity: " + Math.floor(responseTwo.list[0].main.humidity) + " %"
      );
      $("#dayTwoHumidity").text(
        "Humidity: " + Math.floor(responseTwo.list[8].main.humidity) + " %"
      );
      $("#dayThreeHumidity").text(
        "Humidity: " + Math.floor(responseTwo.list[16].main.humidity) + " %"
      );
      $("#dayFourHumidity").text(
        "Humidity: " + Math.floor(responseTwo.list[24].main.humidity) + " %"
      );
      $("#dayFiveHumidity").text(
        "Humidity: " + Math.floor(responseTwo.list[32].main.humidity) + " %"
      );
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
    forcastData();
  });

  // Selecting from the saved Cities
  $("#savedCity").on("click", function (event) {
    console.log("history button clicked");
  });

  //Function calls
  renderCityList();
  forcastDays();
});
