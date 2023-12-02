const url = "https://restcountries.com/v3.1/all";
const apiKey = "11a1a70f88f93d84c02889beb29c768e"; 

const fetchWeather = (lat, lon) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    return fetch(weatherUrl).then((response) => response.json());
};

const countryContainer = document.getElementById("countryContainer");

const handleWeatherButtonClick = (lat, lon, weatherContainer) => {
    fetchWeather(lat, lon)
        .then((weatherInfo) => {
            weatherContainer.innerHTML = `
                <p>Temperature: ${weatherInfo.main.temp} &#8451;</p>
                <p>Weather: ${weatherInfo.weather[0].description}</p>
            `;
        })
        .catch((error) => {
            console.error("Error fetching weather data", error);
            weatherContainer.innerHTML = "<p>Error fetching weather data</p>";
        });
};

const result = fetch(url);
result.then((data) => data.json()).then((ele) => {
    for (let i = 0; i < ele.length; i++) {
        const card = document.createElement("div");
        card.className = "col";
        card.innerHTML = `
            <div class="card">
                <div class="card-header">${ele[i].name.common}</div>
                <img src="${ele[i].flags.png}" class="card-img-top" style="height: 150px;">
                
                <button class="btn btn-primary" onclick="handleWeatherButtonClick(${ele[i].latlng[0]}, ${ele[i].latlng[1]}, this.nextElementSibling)">Click for Weather</button>
                <div class="weather-container"></div>
            </div>
        `;
        countryContainer.appendChild(card);
    }
});
