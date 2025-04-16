 const button = document.getElementById("search-button");
const input = document.getElementById("city");
const cityNameEl = document.getElementById("city-name");
const cityTimeEl = document.getElementById("city-time");
const cityTempEl = document.getElementById("city-temp");

async function getData(city) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=d88c40c1f84e4116a4891627251204&q=${city}&aqi=yes`
        );
        if (!response.ok) throw new Error("City not found or network issue");
        return await response.json();
    } catch (error) {
        alert(error.message);
        return null;
    }
}

button.addEventListener("click", async () => {
    const value = input.value.trim();
    if (!value) {
        alert("Please enter a city name.");
        return;
    }

    const result = await getData(value);
    if (result) {
        cityNameEl.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
        cityTimeEl.innerText = result.location.localtime;
        cityTempEl.innerText = `${result.current.temp_c}°C`;
    }
});
