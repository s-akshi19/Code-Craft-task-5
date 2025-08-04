const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

function getWeather() {
  const city = document.getElementById('locationInput').value.trim();
  if (city !== '') {
    fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  } else {
    alert("Please enter a city name.");
  }
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    }, () => {
      alert("Location access denied.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function fetchWeatherData(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Weather data not found");
      return response.json();
    })
    .then(data => {
      document.getElementById('weatherResult').classList.remove('hidden');
      document.getElementById('cityName').textContent = `Weather in ${data.name}`;
      document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
      document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
      document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    })
    .catch(error => {
      alert("Error fetching weather data: " + error.message);
    });
}
