// const apiKey = "40809c32279c3fc1b8a5a1b9b3d978ab";
// const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// const searchBox = document.querySelector(".search input");
// const searchButton = document.querySelector(".search button");

// async function checkWeather() {
//     const response = await fetch(apiUrl + `&appid=${apiKey}`);
//     var data = await response.json();

//     console.log(data)

//     document.querySelector(".city").innerHTML = data.name;
//     document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
//     document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
//     document.querySelector(".wind").innerHTML = data.wind.speed + " mph";


// }

// searchButton.addEventListener("click", () => {
//     checkWeather(searchBox.value);
// })

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

        // console.log(data);

        cityElement.innerHTML = data.name;
        tempElement.innerHTML = Math.round(data.main.temp) + "°F";
        humidityElement.innerHTML = data.main.humidity + "%";
        windElement.innerHTML = data.wind.speed + " mph";

        if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "../images/clouds.png"
        }
        else if(data.weather[0].main == "Clear") {
            weatherIcon.src = "../images/clear.png"
        }
        else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "../images/rain.png"
        }
        else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "../images/drizzle.png"
        }
        else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "../images/mist.png"
        }

        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        console.error('Error fetching weather data:', error);
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
