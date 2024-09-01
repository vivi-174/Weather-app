const apiKey = "9f77bcd45ba029aa4022f5cf9bcde336";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.main.temp > 30) {
      weatherIcon.src = "./images/sunny.webp";
    } else if (data.main.temp < 30 && data.main.temp > 20) {
      weatherIcon.src = "./images/partially.webp";
    } else if (data.main.temp < 20) {
      weatherIcon.src = "./images/cloudy.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "./images/rain.webp";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "./images/drizzling.webp";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "./images/snow.webp";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
