const API_KEY = "YOUR_API_KEY_HERE";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const result = document.getElementById("weatherResult");

    loading.style.display = "block";
    error.textContent = "";
    result.style.display = "none";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("cityName").textContent = data.name;
        document.getElementById("temperature").textContent =
            `Temperature: ${data.main.temp}°C`;
        document.getElementById("description").textContent =
            `Weather: ${data.weather[0].description}`;
        document.getElementById("humidity").textContent =
            `Humidity: ${data.main.humidity}%`;
        document.getElementById("wind").textContent =
            `Wind Speed: ${data.wind.speed} m/s`;

        result.style.display = "block";

    } catch (err) {
        error.textContent = "Unable to find that city. Please try again.";
    } finally {
        loading.style.display = "none";
    }
}