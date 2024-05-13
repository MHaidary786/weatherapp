let $ = document;
let searchBtn = $.getElementById("search");
let searchBar = $.querySelector(".search-bar");

function searchTheCity() {
  let city = searchBar.value;

  let citiesDatas = [
    {
      city: "Mainz",
      timeZone: "Europe/Berlin",
      latitude: 50.0012314,
      longitude: 8.2762513,
    },
    {
      city: "London",
      timeZone: "Europe/London",
      latitude: 51.5074456,
      longitude: -0.1277653,
    },
    {
      city: "New York City",
      timeZone: "America/New_York",
      latitude: 40.7127281,
      longitude: -74.005974,
    },
    {
      city: "Rome",
      timeZone: "Europe/Rome",
      latitude: 41.8933203,
      longitude: 12.4829321,
    },
    {
      city: "Paris",
      timeZone: "Europe/Paris",
      latitude: 48.856613,
      longitude: 2.352222,
    },
  ];

  function findLat_LongByCity(cityList, cityToSearch, searchValue) {
    for (let i = 0; i < cityList.length; i++) {
      if (cityList[i].city.toLowerCase() === cityToSearch.toLowerCase()) {
        if (searchValue === "latitude") {
          return cityList[i].latitude;
        } else {
          return cityList[i].longitude;
        }
      }
    }
    return "invalid City";
  }

  let latitude = findLat_LongByCity(citiesDatas, city, "latitude");
  let longitude = findLat_LongByCity(citiesDatas, city, "longitude");

  if (latitude === "invalid City") {
    alert("City not found");
  }
  console.log(latitude);
  console.log(longitude);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0f6c2bbe4e29d74b5e1761d2b9b8bfd1`
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
        $.querySelector(".city").innerHTML =
          "Weather in " + data.name + ", " + data.sys.country;
        $.querySelector(".temp").innerHTML =
          Math.round(data.main.temp - 273) + "°C";
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

function getCityTime(cityTimeZone) {
  let options = {
    timeZone: cityTimeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  let formatter = new Intl.DateTimeFormat([], options);
  return formatter.format(new Date());
}

function showTime() {
  let city = searchBar.value;

  let citiesDatas = [
    {
      city: "Mainz",
      timeZone: "Europe/Berlin",
      latitude: 50.0012314,
      longitude: 8.2762513,
    },
    {
      city: "London",
      timeZone: "Europe/London",
      latitude: 51.5074456,
      longitude: -0.1277653,
    },
    {
      city: "New York City",
      timeZone: "America/New_York",
      latitude: 40.7127281,
      longitude: -74.005974,
    },
    {
      city: "Rome",
      timeZone: "Europe/Rome",
      latitude: 41.8933203,
      longitude: 12.4829321,
    },
    {
      city: "Paris",
      timeZone: "Europe/Paris",
      latitude: 48.856613,
      longitude: 2.352222,
    },
  ];
  function findTimeZone(cityList, cityToSearch) {
    for (let i = 0; i < cityList.length; i++) {
      if (cityList[i].city.toLowerCase() === cityToSearch.toLowerCase()) {
        return cityList[i].timeZone;
      }
    }
    return "invalid City";
  }

  let timeZone = findTimeZone(citiesDatas, city);
  $.querySelector(".time").innerHTML = getCityTime(timeZone);
}

searchBar.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchTheCity();
    showTime();
  }
});

searchBtn.addEventListener("click", function (event) {
  searchTheCity();
  showTime();
});
