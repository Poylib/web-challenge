const API_KEY = "09c778c3e8b276b04cdb91f0b044e4a0";

let weatherApp = {
  onGeoOk : (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url)
      .then(response => response.json()
      .then(data => {
        const cityName = document.querySelector('.city');
        const temp =  document.querySelector('.temp');
        const description = document.querySelector('.description');
        const humidity =  document.querySelector('.humidity');
        const wind =  document.querySelector('.wind');
        cityName.innerText = `Weather in ${data.name}`;
        temp.innerText = `temperature: ${data.main.temp}℃`;
        description.innerText = `Description: ${data.weather[0].description}`;
        humidity.innerText = `Humidity: ${data.main.humidity}`;
        wind.innerText = `wind speed: ${data.wind.speed}km/h`;
      }));
  },
  searchWeather : (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&usits=metric&appid=${API_KEY}`)
    .then(response => response.json()
    .then((data)=> weatherApp.displayWeather(data)
    ))},
  displayWeather : (data) => {
        const cityName = document.querySelector('.city');
        const temp =  document.querySelector('.temp');
        const description = document.querySelector('.description');
        const humidity =  document.querySelector('.humidity');
        const wind =  document.querySelector('.wind');
        cityName.innerText = `Weather in ${data.name}`;
        temp.innerText = `temperature: ${Math.round(data.main.temp-273)}℃`;
        description.innerText = `Description: ${data.weather[0].description}`;
        humidity.innerText = `Humidity: ${data.main.humidity}`;
        wind.innerText = `wind speed: ${data.wind.speed}km/h`;
  },
  search : function() {
    this.searchWeather(document.querySelector('.search-bar').value);
  },
  onGeoError : () => {
    alert("uhm.. Can't find you. no weather for you.");
  }
}

document.querySelector(".search button").addEventListener("click", () => {
  weatherApp.search();
});
document.querySelector(".search-bar").addEventListener("keyup",(event) => {
  if (event.key == "Enter") {
    weatherApp.search()
  }
});

navigator.geolocation.getCurrentPosition(weatherApp.onGeoOk, weatherApp.onGeoErroronGeoError);