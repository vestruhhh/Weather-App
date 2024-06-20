const apiKey = "40809c32279c3fc1b8a5a1b9b3d978ab";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");

async function checkWeather(cityName) {
    try {
        const response = await fetch(apiUrl + `${cityName}&appid=${apiKey}`);
        const data = await response.json();

        if (response.ok) {
            // Check if data.name exists and matches the input cityName
            if (!data.name || data.name.toLowerCase() !== cityName.toLowerCase()) {
                alert('City not found. Please enter a valid city name.');
                return;
            }

            // Clear previous weather data
            clearWeatherData();

            cityElement.innerHTML = data.name;
            tempElement.innerHTML = Math.round(data.main.temp) + "°F";
            humidityElement.innerHTML = data.main.humidity + "%";
            windElement.innerHTML = data.wind.speed + " mph";

            // Set weather icon based on weather condition
            if (data.weather && data.weather.length > 0) {
                const weatherMain = data.weather[0].main;
                setWeatherIcon(weatherMain);
            }

            document.querySelector(".weather").style.display = "block";
        } else {
            // Handle non-successful response (e.g., city not found)
            const errorMessage = await response.json();
            throw new Error(errorMessage.message);
        }

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again later.');
    }
}


searchButton.addEventListener("click", () => {
    const cityName = searchBox.value.trim();
    if (cityName) {
        checkWeather(cityName);
    } else {
        alert("Please enter a city name.");
    }
});

function clearWeatherData() {
    cityElement.innerHTML = '';
    tempElement.innerHTML = '';
    humidityElement.innerHTML = '';
    windElement.innerHTML = '';
    weatherIcon.src = ''; // Clear weather icon
}

function setWeatherIcon(weatherMain) {
    switch (weatherMain) {
        case "Clouds":
            weatherIcon.src = "../images/clouds.png";
            break;
        case "Clear":
            weatherIcon.src = "../images/clear.png";
            break;
        case "Rain":
            weatherIcon.src = "../images/rain.png";
            break;
        case "Drizzle":
            weatherIcon.src = "../images/drizzle.png";
            break;
        case "Mist":
            weatherIcon.src = "../images/mist.png";
            break;
        default:
            weatherIcon.src = ""; // Handle other weather conditions or unknown
    }
}
