// API key
const api = "19975f0371f4997472de6a125c67a809";


const geo = async (city_name) => {
    const resp = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&appid=${api}`
    );
    if (resp.status == 200) {
        return resp.data;
    }
};

const inputField = document.getElementById("cityInput");
const form = document.getElementById("cityForm");

//when form is used
let formSubmit = async (event) => {
    event.preventDefault();
    let city_name = inputField.value;

    let geo_info = await geo(city_name);
    let lat = geo_info[0]["lat"];
    let long = geo_info[0]["lon"];
    const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=imperial`;
  //get info from api
    fetch(base)
        .then((response) => {
            return response.json();
        })
        //display info
        .then((data) => {
            document.getElementById("place").innerHTML = data.name;
            document.getElementById("temp").innerHTML = `${data.main.temp.toFixed(0)}°F`;
            document.getElementById("feels").innerHTML = `Feels like ${data.main.feels_like.toFixed(0)}°F`;
            document.getElementById("desc").innerHTML = data.weather[0].main;
            const sunsetGMT = new Date(data.sys.sunset * 1000);
            const sunriseGMT = new Date(data.sys.sunrise * 1000);
            document.getElementById("sunset").innerHTML = `Sunset: ${sunsetGMT.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;
            document.getElementById('sunrise').innerHTML = `Sunrise: ${sunriseGMT.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;



            //interative background
            const bg = document.querySelector("#background");
            const weather = data.weather[0].main.toLowerCase();
            if (weather == "clouds") {
                bg.setAttribute("data-bg", weather);
            } else if (weather == "clear") {
                bg.setAttribute("data-bg", weather);
            } else if (weather == "drizzle") {
                bg.setAttribute("data-bg", weather);
            } else if (weather == "mist") {
                bg.setAttribute("data-bg", weather);
            } else if (weather == "rain") {
                bg.setAttribute("data-bg", weather);
            } else if (weather == "snow") {
                bg.setAttribute("data-bg", weather);
            } else {
                bg.setAttribute("data-bg", weather);
            }
        });
        form.reset()
};

//form event listener
form.addEventListener("submit", formSubmit);

 