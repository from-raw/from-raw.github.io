"use strict";

const weather = document.querySelector(".js-weather");

// API(Application Programming Interface)
// 다른 서버로부터 손쉽게 데이터를 가지고 올 수 있는 수단
// 특정 웹사이트로부터 데이터를 얻거나 컴퓨터(Machine)끼리 소통하기 위해 고안된 것(디자인 필요 X)
const API_KEY = "baca90bdc90deaad58cae69706787f27";
const COORD = "coords";

function getWeather(lat, lng) {
  // 따옴표가 아니라 ``(backtick)을 이용할 것
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(response){
    return response.json();
  }).then(function(json) {
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerHTML = `Today is ${temperature}°C <b>in ${place}</b>`;
  });
  // then(): 기본적으로 함수를 호출하는 역할을 하지만, 데이터가 완전히 들어온 다음에 호출한다. 작동하는 것이 끝나기를 기다리는 방법.
  
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORD, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  }; // key와 value 값의 이름이 같을 땐 한 번만 기재해 줘도 된다
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access Geo");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoord() {
  const loadedCoords = localStorage.getItem(COORD);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoord();
}

init();