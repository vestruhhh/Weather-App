const apiKey = "40809c32279c3fc1b8a5a1b9b3d978ab";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

async function checkWeather(city) {
    // Fetchs URL to  check weather in particular city 
    const response = await fetch(apiUrl + city + '&appid=${apiKey}');
    var data = await  response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    // Assuming this turns out to celsius once the API Key loads convert to fahrenheit
    document.querySelecter(".temp").innerHTML = Math.round(data.main.temp) + "°F";
    document.querySelecter(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelecter(".wind").innerHTML = data.main.wind.speed + "mph";

}

searchButton.addEventListener("click", ()=> {
    // This will grab the city name from the field and pass it the function. 
    // i.e. I want to see the weather in Gothenburg, Sweden. Gothenburg is passed to checkWeather
    checkWeather(searchBox.value);
})