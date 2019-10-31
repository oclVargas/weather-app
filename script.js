const img = document.querySelector('img');
const searchBtn = document.querySelector('.searchBtn');
const cityLookup = document.querySelector('#cityLookup');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.weather-description');
const highlow = document.querySelector('.high-low');
const humidity = document.querySelector('.humidity');
const cloudCover = document.querySelector('.cloud-cover');
const weatherContainer = document.querySelector('.weather-container');

async function getWeather() {
    try {
        let location = document.querySelector('.location');
        city = cityLookup.value;
        if (city === '') {
            return 
        }
        console.log(city);
        const weather = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=29769ab6214b9aed72cf77646d756221`, { mode: 'cors' });
        if (weather.status === 404) {
            location.textContent = 'Pls input valid city name';
            return
        }
        const weatherData = await weather.json();
        console.log(weatherData);
        iconOneCode = weatherData.weather[0].icon;
        iconAlt = weatherData.weather[0].description;
        img.alt = iconAlt;
        img.src = `https://cors-anywhere.herokuapp.com/http://openweathermap.org/img/wn/${iconOneCode}@2x.png`
        description.textContent = weatherData.weather[0].description.toUpperCase();
        temperature.textContent = Math.floor(weatherData.main.temp) + '°F';
        
        cityName = cityLookup.value;
        cityCapitalized = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        location.textContent = cityCapitalized;
        highlow.textContent = `H ${Math.floor(weatherData.main.temp_max)}° / L ${Math.floor(weatherData.main.temp_min)}°`;
        humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
        cloudCover.textContent = `Cloud Cover: ${weatherData.clouds.all}%`;
        weatherContainer.style.display = 'block';
        cityLookup.value = '';
    } catch (error){
        console.log(error);
    }
}

cityLookup.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        searchBtn.click();
    }
})
searchBtn.addEventListener('click', getWeather);
