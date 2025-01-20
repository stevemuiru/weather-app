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
    <h2 class="mb-3">${data.resolvedAddress}</h2>
    <p class="display-4 fw-bold">${data.currentConditions.temp}°C</p>
    <p class="fs-5">${data.currentConditions.conditions}</p>
    <p>Humidity: <strong>${data.currentConditions.humidity}%</strong></p>
    <p>Wind Speed: <strong>${data.currentConditions.windspeed} km/h</strong></p>
  `;
};

