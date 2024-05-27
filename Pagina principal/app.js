

function getCityForWeather(event){
    event.preventDefault();

    const cityEl = document.getElementById("inputCity");
    let valueCity = cityEl.value;
    getCityData(valueCity).then((data)=> {
        console.log("getCityData", data);
        let cityResults = data.results[0];
        getWeatherData(cityResults.lat, cityResults.lon);
    });

}

function getWeatherDefault(){
    getWeatherData(10.3, 12.6);
}

function getWeatherData(lat, lon) {
    const apiKey = `http://my.meteoblue.com/packages/basic-day?lat=${lat}&lon=${lon}&apikey=mp75uRAbqGlLJEhe`;
    const dataTemperatureAreaEl = document.querySelector(".temperatureArea");

    fetch(apiKey)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                return response.json();
            }
        })
        .then((data) => {
            console.log(data);
            const tempMax = data.data_day.temperature_max;
            const tempMin = data.data_day.temperature_min;
            const windMax = data.data_day.windspeed_max;
            const windMin = data.data_day.windspeed_min;
            const dayNames = getNextSevenDays();

            const days = document.querySelectorAll('.temperatureArea > div');

            days.forEach((day, index) => {
                const maxTemp = parseFloat(tempMax[index]).toFixed(1);
                const minTemp = parseFloat(tempMin[index]).toFixed(1);
                const maxWind = parseFloat(windMax[index]).toFixed(1);
                const minWind = parseFloat(windMin[index]).toFixed(1);

                day.querySelector('.weekDay').innerHTML = dayNames[index];
                day.querySelector('.tab-temp-max').innerHTML = maxTemp;
                day.querySelector('.tab-temp-min').innerHTML = minTemp;
                day.querySelector('.windDayMax').innerHTML = `Max: ${maxWind} m/s`;
                day.querySelector('.windDayMin').innerHTML = `Min: ${minWind} m/s`;

                const imgContainer = day.querySelector('.img-day');
                let imgSrc = '';

                if (maxTemp > 25) {
                    imgSrc = '/Imagenes/sol.png';
                    day.style.background = 'linear-gradient(to bottom, orange, yellow, skyblue, white)';
                } else if (maxTemp <= 25 && maxTemp > 15) {
                    imgSrc = '/Imagenes/templado.png';
                    day.style.background = 'linear-gradient(to bottom, #fff116, #fff05c, #4be6ff, #00b2ff)';
                } else if (maxTemp <= 15 && maxTemp > 8) {
                    imgSrc = '/Imagenes/nublado.png';
                    day.style.background = 'linear-gradient(to bottom, #fff66d, #6df8ff, #0dc8ff, #0d8dff)';
                } else {
                    imgSrc = '/Imagenes/frio.png';
                    day.style.background = 'linear-gradient(to bottom, #fffd91, #3dcdff, #2d67ff, #0023ff)';
                }

                imgContainer.innerHTML = `<img src="${imgSrc}" alt="Weather Image" />`;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function getNextSevenDays() {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const days = [];

    for (let i = 0; i < 7; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        const dayName = dayNames[nextDay.getDay()];
        days.push(dayName);
    }

    return days;
}


async function getCityData(city){
    const apiUrl = `https://www.meteoblue.com/en/server/search/query3?query=${city}&apikey=mp75uRAbqGlLJEhe`;
    const response = await fetch(apiUrl);
    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function buttonInfo(){
    
}

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}