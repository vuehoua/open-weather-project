// Charlotte, NC lat/lon
const lat = 35.2271;
const lon = -80.8431;

fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // just testing fetch for now
  })
  .catch((error) => {
    console.error("Error fetching weather data:", error);
  });
