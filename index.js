const btnFetch = document.getElementById("button-fetch");
const btnTemp = document.getElementById("button-temp");
const btnSun = document.getElementById("button-sun");
const navLinks = document.getElementById("nav");

const status = document.getElementById("status");
const temp = document.getElementById("temp");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

let currentLat = null;
let currentLon = null;

// Clear the data when clicked on a new button

function clearDisplay() {
  status.textContent = "";
  temp.textContent = "";
  sunrise.textContent = "";
  sunset.textContent = "";
}

// getting api from this website - get zipcode and state then will get weather for it
function fetchCoord(zip) {
  clearDisplay();
  status.textContent = "Loading zip code...";

  return fetch(`https://api.zippopotam.us/us/${zip}`)
    .then((response) => {
      if (!response.ok) throw new Error("Invalid zip code");
      return response.json();
    })
    .then((data) => {
      const place = data.places[0];
      currentLat = parseFloat(place.latitude);
      currentLon = parseFloat(place.longitude);
      status.textContent = `Location: ${place["place name"]}, ${place["state abbreviation"]}`;
      navLinks.style.display = "block";
    })
    .catch((error) => {
      clearDisplay();
      status.textContent = "Zip code not found";
      navLinks.style.display = "none";
      console.error(error);
    });
}

//getting the weather from this api

function fetchTemp() {
  clearDisplay();
  status.textContent = "Loading temperature...";

  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${currentLat}&longitude=${currentLon}&current_weather=true&temperature_unit=fahrenheit&timezone=America%2FNew_York`
  )
    .then((response) => response.json())
    .then((data) => {
      clearDisplay();

      const currentTemp = data.current_weather.temperature;

      temp.textContent = `Current Temperature: ${currentTemp}°F`;
    })
    .catch((error) => {
      clearDisplay();
      status.textContent = "Error fetching temperature";
      console.error(error);
    });
}

//getting sunsrise/sunset information
function fetchSunRiseSet() {
  clearDisplay();
  status.textContent = "Loading sunrise/sunset...";

  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${currentLat}&longitude=${currentLon}&daily=sunrise,sunset&timezone=America%2FNew_York`
  )
    .then((response) => response.json())
    .then((data) => {
      clearDisplay();

      const sunrises = data?.daily?.sunrise;
      const sunsets = data?.daily?.sunset;

      if (
        Array.isArray(sunrises) &&
        sunrises.length > 0 &&
        Array.isArray(sunsets) &&
        sunsets.length > 0
      ) {
        const currSunrise = sunrises[0].split("T")[1];
        const currSunset = sunsets[0].split("T")[1];

        sunrise.textContent = `Sunrise: ${currSunrise}`;
        sunset.textContent = `Sunset: ${currSunset}`;
      } else {
        status.textContent = "No sunrise/sunset data available.";
        console.error("Unexpected API structure:", data);
      }
    })
    .catch((error) => {
      clearDisplay();
      status.textContent = "Error fetching sunrise/sunset data.";
      console.error(error);
    });
}

//button once clicked
btnFetch.addEventListener("click", () => {
  const zip = document.getElementById("zipcode").value.trim();
  if (zip.length !== 5 || isNaN(zip)) {
    status.textContent = "Please enter a valid Zip code.";
    navLinks.style.display = "none";
    return;
  }

  fetchCoord(zip);
});

btnTemp.addEventListener("click", () => {
  if (currentLat && currentLon) {
    fetchTemp();
  }
});

btnSun.addEventListener("click", () => {
  if (currentLat && currentLon) {
    fetchSunRiseSet();
  }
});
