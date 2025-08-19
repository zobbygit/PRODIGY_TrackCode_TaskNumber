const API_KEY = 'd5a65c50b9c11656f1106ce3d73c2bee'; 
const cityName = document.getElementById('cityName');
const description = document.getElementById('description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');

async function fetchWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
    const data = await response.json();
    if(data.cod === 200){
      cityName.textContent = `${data.name}, ${data.sys.country}`;
      description.textContent = data.weather[0].description.toUpperCase();
      temperature.textContent = data.main.temp;
      humidity.textContent = data.main.humidity;
      wind.textContent = data.wind.speed;
    } else {
      cityName.textContent = "City not found";
      description.textContent = "";
      temperature.textContent = "";
      humidity.textContent = "";
      wind.textContent = "";
    }
  } catch (error) {
    cityName.textContent = "Error fetching data";
  }
}


searchBtn.addEventListener('click', () => {
  const city = locationInput.value.trim();
  if(city) fetchWeather(city);
});


window.addEventListener('load', () => {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        const data = await response.json();
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        description.textContent = data.weather[0].description.toUpperCase();
        temperature.textContent = data.main.temp;
        humidity.textContent = data.main.humidity;
        wind.textContent = data.wind.speed;
      } catch(err){
        cityName.textContent = "Error fetching location weather";
      }
    });
  }
});
