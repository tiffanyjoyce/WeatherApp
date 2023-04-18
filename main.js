// API key
const api = "19975f0371f4997472*****";


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
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            document.getElementById("icon").innerHTML = data.weather[0].icon;
            document.getElementById("temp").innerHTML = `${data.main.temp.toFixed(0)}°F`;
            document.getElementById("feels").innerHTML = `Feels like ${data.main.feels_like.toFixed(0)}°F`;
            document.getElementById("desc").innerHTML = data.weather[0].main;

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
};

//form event listener
form.addEventListener("submit", formSubmit);

 