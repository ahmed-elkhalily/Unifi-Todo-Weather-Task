export function getNextFiveWeather(lat, long, apiKey, setNextFiveWeather) {
  const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=&appid=${apiKey}`;
  fetch(api)
    .then((res) => res.json())
    .then((json) => setNextFiveWeather(json.daily[4].weather[0].main));
}

export function getCurrentWeather(lat, long, apiKey, setCurrentWeather) {
  const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,daily&appid=${apiKey}`;
  fetch(api)
    .then((res) => res.json())
    .then((json) => setCurrentWeather(json.current.weather[0].main));
}
