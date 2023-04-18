// API key
const api = '19975f0371f4997472de6a125c67a809';

// const iconImg = document.getElementById('weather-icon');
// const loc = document.querySelector('#location');
// const tempC = document.querySelector('.c');
// const tempF = document.querySelector('.f');
// const feels = document.querySelector('.feels')
// const desc = document.querySelector('.desc');
// const sunriseDOM = document.querySelector('.sunrise');
// const sunsetDOM = document.querySelector('.sunset');

const geo = async (city_name) => {
  const resp = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&appid=${api}`);
  if (resp.status == 200){
      return resp.data
  }
}
const inputField = document.getElementById('cityInput')
const form = document.getElementById('cityForm');
// form.addEventListener('submit', formSubmit);

// window.addEventListener('load', () => {
//   while (!formSubmit){

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       // Storing Longitude and Latitude in variables
//       let long = position.coords.longitude;
//       let lat = position.coords.latitude;
//       const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;


//       fetch(base)
//         .then((response) => {
//           return response.json();
//         })
//         //getting data
//         .then((data) => {
//           const { temp, feels_like } = data.main;
//           const place = data.name;
//           const { main, icon } = data.weather[0];
//           const { sunrise, sunset } = data.sys;

//           const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
//           const fahrenheit = (temp * 9) / 5 + 32;
//           const f_fahrenheit = (feels_like * 9) / 5 + 32;
//           const sunriseGMT = new Date(sunrise * 1000);
//           const sunsetGMT = new Date(sunset * 1000);

//           // displaying data on page
//           iconImg.src = iconUrl;
//           loc.textContent = `${place}`;
//           desc.textContent = `${main}`;
//           tempC.textContent = `${temp.toFixed(0)} °C`;
//           tempF.textContent = `${fahrenheit.toFixed(0)} °F`;
//           feels.textContent = `${feels_like.toFixed(0)} °C or ${f_fahrenheit.toFixed(0)} °F`;
//           sunriseDOM.textContent = `${sunriseGMT.toLocaleTimeString()}`;
//           sunsetDOM.textContent = `${sunsetGMT.toLocaleTimeString()}`;


//           //   if(desc=='Clouds'){
//           //     document.body.style.backgroundImage =url('../images/clouds.jpeg')
//           //   };
//         });
//       ;
//     }
//     )
//   }
// };
let formSubmit = async (event) => {
  event.preventDefault();
  let city_name = inputField.value;
  let geo_info = await geo(city_name);
  // navigator.geolocation.getElementById(city_name);
  let lat = geo_info['lat'];
  let long = geo_info['lon'];
  const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=imperial`;

  fetch(base)
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    document.getElementById('place').innerHTML = data.name;
    document.getElementById('icon').innerHTML= data.weather[0].icon;
    document.getElementById('temp').innerHTML= `${data.main.temp}°F`;
    document.getElementById('feels').innerHTML= `Feels like ${data.main.feels_like}°F`;
    document.getElementById('desc').innerHTML= data.weather[0].main;

    if (data.weather[0].main == 'Clouds'){
      document.getElementById('background').innerHTML = `<img src='images/clouds.jpeg></img>`
    } else if (data.weather[0].main == 'Rain'){
      document.getElementById('background').innerHTML = `<img src='images/rain.webp></img>`
    } else if (data.weather[0].main == 'Clear'){
      document.getElementById('background').innerHTML = `<img src='images/clear.webp></img>`
    } else if (data.weather[0].main == 'Drizzle'){
      document.getElementById('background').innerHTML = `<img src='images/drizzle.jpeg></img>`
    } else if (data.weather[0].main == 'Mist'){
      document.getElementById('background').innerHTML = `<img src='images/mist.jpeg></img>`
    } else if (data.weather[0].main == 'Snow'){
      document.getElementById('background').innerHTML = `<img src='images/snow.jpeg></img>`
    } else if (data.weather[0].main == 'Thunderstorm'){
      document.getElementById('background').innerHTML = `<img src='images/thunderstorm.jpeg></img>`
    };
  
    // form.reset();
    // const { temp, feels_like } = data.main;
    //       const place = data.name;
    //       const { main, icon } = data.weather[0];
    //       const { sunrise, sunset } = data.sys;

    //       const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    //       const fahrenheit = (temp * 9) / 5 + 32;
    //       const f_fahrenheit = (feels_like * 9) / 5 + 32;
    //       const sunriseGMT = new Date(sunrise * 1000);
    //       const sunsetGMT = new Date(sunset * 1000);
          
    //       // displaying data on page
    //       iconImg.src = iconUrl;
    //       loc.textContent = `${place}`;
    //       desc.textContent = `${main}`;
    //       tempC.textContent = `${temp.toFixed(0)} °C`;
    //       tempF.textContent = `${fahrenheit.toFixed(0)} °F`;
    //       feels.textContent = `${feels_like.toFixed(0)} °C or ${f_fahrenheit.toFixed(0)} °F`;
    //       sunriseDOM.textContent = `${sunriseGMT.toLocaleTimeString()}`;
    //       sunsetDOM.textContent = `${sunsetGMT.toLocaleTimeString()}`;
  }

  )
}
// const inputField = document.getElementById('cityInput')
// const form = document.getElementById('cityForm');
form.addEventListener('click', formSubmit);

 