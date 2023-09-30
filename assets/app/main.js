// date
const date = document.querySelector(".date");
date.innerText = new Date().toLocaleDateString("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

// time

const time = document.querySelector(".date-time");

let hour = new Date().getHours();
let min = new Date().getMinutes();
let sec = new Date().getSeconds();

const interval = setInterval(timeHandler, 1000);

function timeHandler() {
  sec++;
  if (sec === 59) {
    sec = 0;
    min++;
  }
  if (min === 59) {
    if (hour === 23) {
      hour = 0;
      min = 0;
    } else {
      min = 0;
      hour++;
    }
  }
  const allTime = `${hour} : ${min}`;
  time.innerHTML = allTime;
}

document.addEventListener("DOMContentLoaded", () => {
  getWeather();
});

async function getWeather(cityIn = "tehran") {
  const key = `f2bbc52e18cabb66a5da6dacf22dda03`;
  const city = cityIn;
  const apiResult = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
  );
  const data = await apiResult.json();
  createDom(data);
}

function createDom(data) {
  if (data.code >= 400) {
    alert("error");
    return;
  }

  let icon = data.weather[0].icon.split("");
  icon.pop();
  icon = icon.join("");
  const mainContent = document.querySelector(".main");
  const divContent = document.createElement("div");
  divContent.classList.add("card")
  const card = `
    
                    <div class="top">
                        <div class="top-filter">
                            <div class="city-country">
                                <h3 class="city">${data.name}</h3>
                                <h3 class="country">${data.sys.country}</h3>
                            </div>
                            <div class="deg-par">
                                <h3>${Math.round(data.main.temp)}° </h3>
                            </div>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="weather">
                            <h3 class="weater-main">${
                              data.weather[0].description
                            }</h3>
                            <img src="assets/picture/icon/${icon}.png" alt="" />
                        </div>
                        <div class="line"></div>
                        <div class="compass">
                            <div class="wind-compass">
                                <img
                                    src="assets/picture/png/compass.png"
                                    class="compass-img"
                                    alt=""
                                />
                                <img
                                    src="assets/picture/png/Untitled-1.png"
                                    class="arrow-img"
                                    alt=""
                                    style="transform : rotate(${data.wind.deg}deg) !important"
                                />
                            </div>
                            <h3 class="wind-speed">${data.wind.speed} KM/h</h3>
                        </div>
                    </div>
               
    `;
    divContent.innerHTML = card;
    mainContent.appendChild(divContent)



  
}



// createDom()


const searchBtn=document.querySelector(".material-symbols-outlined");
const searchInput=document.querySelector("#searchInput")


searchBtn.addEventListener("click",()=>{
  if(!searchInput.value)return alert("Please enter a city")
  // console.log(searchInput.value);
  getWeather(searchInput.value)
  searchInput.value=""
})
