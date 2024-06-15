
let $ = document;
let searchBtn = $.getElementById("search");
let searchBar = $.querySelector(".search-bar");


//  curl "http://worldtimeapi.org/api/timezone/Europe/Berlin"
// {
//   "abbreviation": "CEST",
//   "client_ip": "95.90.206.226",
//   "datetime": "2024-05-14T01:04:57.677029+02:00",
//   "day_of_week": 2,
//   "day_of_year": 135,
//   "dst": true,
//   "dst_from": "2024-03-31T01:00:00+00:00",
//   "dst_offset": 3600,
//   "dst_until": "2024-10-27T01:00:00+00:00",
//   "raw_offset": 3600,
//   "timezone": "Europe/Berlin",
//   "unixtime": 1715641497,
//   "utc_datetime": "2024-05-13T23:04:57.677029+00:00",
//   "utc_offset": "+02:00",
//   "week_number": 20
// }


function searchTheCity() {
  let city = searchBar.value;


  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0f6c2bbe4e29d74b5e1761d2b9b8bfd1`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      if (data) {
        console.log(data.coord.lat)
        console.log(data.coord.lon)
        // $.querySelector(".time").innerHTML = getTimeByCoordinates(data.coord.lat,data.coord.lon);
        $.querySelector(".city").innerHTML =
          "Weather in " + data.name + ", " + data.sys.country;
        $.querySelector(".temp").innerHTML =
          Math.round(data.main.temp - 273) + "°C";
        $.querySelector(".icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        $.querySelector(".description").innerHTML = data.weather[0].description;
        $.querySelector(".humidity").innerHTML =
          "Humidity: " + data.main.humidity + "%";
        $.querySelector(".wind").innerHTML =
          "Wind speed: " + data.wind.speed + "km/h";
        $.querySelector(".weather").classList.remove("loading");
      } else {
        alert("Please select your City correctly!");
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// function getCityTime(cityTimeZone) {
//   let options = {
//     timeZone: cityTimeZone,
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   };
//   let formatter = new Intl.DateTimeFormat([], options);
//   return formatter.format(new Date());
// }


searchBar.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchTheCity();
  }
});

searchBtn.addEventListener("click", function (event) {
  searchTheCity();
});
