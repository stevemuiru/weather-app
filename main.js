const locationInput = document.getElementById('location');
const submit = document.getElementById('submit');
const weatherInfo = document.getElementById('weather-info');

submit.addEventListener("click", (event) => {
  event.preventDefault();
  const location = locationInput.value.trim();

  if (location) {
    console.log(`Searching weather for: ${location}`);
    fetchData(location);
  } else {
    weatherInfo.textContent = "Please Enter A Valid Location.";
  }
});

const fetchData = async (location) => {
  const apiKey = "PZ8UHXWJ55B9CZZNC983Z3WTF";
  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${apiKey}&contentType=json`;

  try {
    console.log(`Fetching data from: ${apiUrl}`);
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Weather data received:", data);
    displayWeather(data);
  } catch (error) {
    weatherInfo.textContent = `Error fetching weather data: ${error.message}`;
    console.error("Error Fetching Data:", error);
  }
};

const displayWeather = (data) => {
  weatherInfo.innerHTML = `
    <h2>Weather for ${data.resolvedAddress}</h2>
    <p>Current Temperature: ${data.currentConditions.temp}°C</p>
    <p>Conditions: ${data.currentConditions.conditions}</p>
    <p>Humidity: ${data.currentConditions.humidity}%</p>
    <p>Wind Speed: ${data.currentConditions.windspeed} km/h</p>
  `;
};
