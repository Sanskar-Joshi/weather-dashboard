const apiKey = "49df39400123e81c3ff4806ec83dd507";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
      alert("Invalid City Name");
    } else {
      var data = await response.json();
      // This logs the real data to your console so you can see it!
      console.log("✅ Data Received:", data);

      // Update the HTML elements with real data
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "℃";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      // Update the Image based on weather condition
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
      }

      document.querySelector(".weather").style.display = "block";
      console.log("✅ Weather Card Updated!");
    }
  } catch (error) {
    console.error("❌ THE CODE CRASHED HERE:", error);
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

// Debugging Checks - Let's see what is missing
//   if (!document.querySelector(".city"))
//     console.error("❌ Error: Missing element with class '.city'");
//   if (!document.querySelector(".temp"))
//     console.error("❌ Error: Missing element with class '.temp'");
//   if (!document.querySelector(".humidity"))
//     console.error("❌ Error: Missing element with class '.humidity'");
//   if (!document.querySelector(".wind"))
//     console.error("❌ Error: Missing element with class '.wind'");
