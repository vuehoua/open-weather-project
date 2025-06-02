// Charlotte, NC lat/lon
const lat = 35.2271;
const lon = -80.8431;

fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`
)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data); // just testing fetch for now
    const temp = data.current_weather.temperature;

    document.getElementById("location").textContent = "Charlotte, NC";
    document.getElementById(
      "temp"
    ).textContent = `Current Temperature: ${temp}° F`;
  })
  .catch((error) => {
    console.error("Error fetching weather data:", error);
  });

fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset&timezone=America%2FNew_York`
)
  .then((response) => response.json())
  .then((data) => {
    const sunrise = data.daily.sunrise[0].split("T")[1];
    const sunset = data.daily.sunset[0].split("T")[1];

    document.getElementById("sunrise").textContent = `Sunrise: ${sunrise} AM`;
    document.getElementById("sunset").textContent = `Sunset: ${sunset} PM`;
  })
  .catch((error) => {
    console.error("Error", error);
  });
