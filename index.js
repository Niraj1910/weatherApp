const API_KEY = "157702ccd6496e8f213a97f02c61f23b";

async function test() {
  const city_name = document.getElementById("search").value || "Kolkata";
  const capitalizeCity = city_name.charAt(0).toUpperCase() + city_name.slice(1);

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`
    );

    const data = await response.json();

    const newtemperature = data.main.temp - 273.15;
    const newHumidity = data.main.humidity;
    const newWind = data.wind.speed;
    const newWeatherimg = data.weather[0].main;

    const prevPlace = document.querySelector(".place");
    const prevtemperature = document.querySelector(".temperature");

    prevPlace.innerHTML = `${capitalizeCity}`;
    prevtemperature.innerHTML = `${newtemperature.toFixed(0)}°C`;

    const prevHumidity = document.querySelector(".humidity_head");
    const prevWind = document.querySelector(".wind_head");

    prevHumidity.innerHTML = `${newHumidity}%`;
    prevWind.innerHTML = `${newWind} km/h`;

    const prevWeatherimg = document.querySelector(".weather_img");

    if (newWeatherimg) {
      prevWeatherimg.setAttribute("src", `./images/${newWeatherimg}.png`);
      prevWeatherimg.setAttribute("alt", newWeatherimg);
      document.body.style.background = `url('./bg_img/${newWeatherimg}.png') center center / cover no-repeat`;
    }
  } catch (error) {
    alert("There is no such place exist");
  }
}

document.querySelector("button").addEventListener("click", test);
document.getElementById("search").addEventListener("keydown", function (event) {
  if (event.code === "Enter") test();
});
