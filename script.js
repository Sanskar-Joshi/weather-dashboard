const apiKey = "49df39400123e81c3ff4806ec83dd507";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCard = document.querySelector(".weather");
const errorDiv = document.querySelector(".error");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
      // If city is invalid: Show Error, Hide Weather
      errorDiv.style.display = "block";
      weatherCard.classList.remove("active");
      weatherCard.style.display = "none";
    } else {
      var data = await response.json();

      // Update the HTML elements with real data
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "℃";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      // Cleaner Image Logic
      if (data.weather[0].main == "Clouds") {
        weatherIcon.src =
          "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src =
          "https://cdn-icons-png.flaticon.com/512/869/869869.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src =
          "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src =
          "https://cdn-icons-png.flaticon.com/512/3076/3076129.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src =
          "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
      } else if (data.weather[0].main == "Snow") {
        weatherIcon.src =
          "https://cdn-icons-png.flaticon.com/512/2315/2315309.png";
      }

      // If valid: Hide Error, Show Weather with Animation
      errorDiv.style.display = "none";
      weatherCard.style.display = "block";

      // We use small timeout or class toggle to trigger CSS animation properly
      weatherCard.classList.remove("active");
      void weatherCard.offsetWidth;
      weatherCard.classList.add("active");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Trigger search when "Enter" key is pressed
searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
checkWeather("Ambaji");
