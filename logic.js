let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempval = document.getElementById("temp-val");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchbutton = document.getElementById("search-button");

searchbutton.addEventListener('click', (e) => {
    e.preventDefault();

    getWeather(searchInput.value);
    searchInput.value = '';

});

const getWeather = async(city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=10faaa5243672f4c9c0b8c0c3da0d948` /* {mode : 'cors'} */ );

        const weatherData = await response.json();

        console.log(weatherData);

        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];

        console.log(id);

        loc.textContent = name;
        climate.textContent = main;
        tempval.textContent = Math.round(feels_like - 273);

        if (id < 300 && id > 200) tempicon.src = "/icons/scattered-thunderstorms.png";

        else if (id < 400 && id > 300) tempicon.src = "/icons/cloudy.png";

        else if (id < 600 && id > 500) tempicon.src = "/icons/rain.png";

        else if (id < 700 && id > 600) tempicon.src = "/icons/snow.png";

        else if (id < 800 && id > 700) tempicon.src = "/icons/cloudy.png";

        else if (id == 800) tempicon.src = "/icons/atmosphere.png";
    } catch (error) {
        alert(`City not found`);
    }
};


window.addEventListener("load", () => {
    let long;
    let lat;
    // const proxy = "https://cors-anywhere.herokuapp.com/";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=10faaa5243672f4c9c0b8c0c3da0d948`;

            fetch(api).then((response) => {

                    return response.json();

                })
                .then(data => {

                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];

                    loc.textContent = name;
                    climate.textContent = main;
                    tempval.textContent = Math.round(feels_like - 273);

                    if (id < 300 && id > 200) tempicon.src = "/icons/scattered-thunderstorms.png";

                    else if (id < 400 && id > 300) tempicon.src = "/icons/cloudy.png";

                    else if (id < 600 && id > 500) tempicon.src = "/icons/rain.png";

                    else if (id < 700 && id > 600) tempicon.src = "/icons/snow.png";

                    else if (id < 800 && id > 700) tempicon.src = "/icons/cloudy.png";

                    else if (id == 800) tempicon.src = "/icons/atmosphere.png";

                });
        });



    }


});