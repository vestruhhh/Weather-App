// https://openweathermap.org/current
// https://home.openweathermap.org/api_keys

const apiKey = "40809c32279c3fc1b8a5a1b9b3d978ab";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");

/*
Purpose: Fetch weather data from OpenWeatherMap API and update UI with weather information.
Pre-Condition: cityName should be a non-empty string representing a valid city name.
Post-Condition:
1. If data.name exists and matches the input cityName,
   - UI elements (cityElement, tempElement, humidityElement, windElement, weatherIcon) are updated with valid weather data.
   - Weather information is displayed in the UI.
   - The weather icon is set based on the weather condition (setWeatherIcon function).
2. If data.name does not match the input cityName,
   - User is alerted with an error message ("City not found. Please enter a valid city name.").
3. If response.ok is false,
   - An error message is logged to the console.
   - User is alerted with a generic error message ("Error fetching weather data. Please try again later.").
*/
async function checkWeather(cityName) {
    try {
        const response = await fetch(apiUrl + `${cityName}&appid=${apiKey}`);
        const data = await response.json();

        if (response.ok) {
            if (!data.name || data.name.toLowerCase() !== cityName.toLowerCase()) {
                alert('City not found. Please enter a valid city name.');
                return;
            }

            clearWeatherData();

            cityElement.innerHTML = data.name;
            tempElement.innerHTML = Math.round(data.main.temp) + "°F";
            humidityElement.innerHTML = data.main.humidity + "%";
            windElement.innerHTML = data.wind.speed + " mph";

            if (data.weather && data.weather.length > 0) {
                const weatherMain = data.weather[0].main;
                setWeatherIcon(weatherMain);
            }

            document.querySelector(".weather").style.display = "block";
        } else {
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

/*
Purpose: Clear weather data from UI elements.
Pre-Condition:
Post-Condition:
1. Upon execution, UI elements (cityElement, tempElement, humidityElement, windElement) are cleared of previous weather data.
*/
function clearWeatherData() {
    cityElement.innerHTML = '';
    tempElement.innerHTML = '';
    humidityElement.innerHTML = '';
    windElement.innerHTML = '';
    weatherIcon.src = ''; // Clear weather icon
}

/*
Purpose: Set weather icon based on weather condition.
Pre-Condition: weatherMain should be a valid string representing weather conditions (e.g., "Clouds", "Clear", etc.).
Post-Condition:
1. Upon execution with a valid weatherMain string,
   - weatherIcon's src attribute is updated to the corresponding weather icon image file path.
2. If weatherMain is not recognized,
   - weatherIcon's src attribute is set to an empty string.
*/
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
