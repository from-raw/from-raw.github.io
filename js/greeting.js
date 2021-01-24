"use strict";

// querySelector는 찾은 것 중 첫 번째 것을 가지고 오고, querySelectorAll은 전부 다 가지고 온다
const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const classClock = document.querySelector(".js-clock"),
  classWeather = document.querySelector(".js-weather"),
  classToDoForm = document.querySelector(".toDoForm"),
  classPendingWrap = document.querySelector(".pending-wrap"),
  classFinishedWrap = document.querySelector(".finished-wrap");


// null: doesn't exist (like undefined, cannot find)
// localStorge 이용하기
const CURRENT_LOCALSTORAGE = "currentUserName",
  CLASSNAME_SHOWING = "showing"; // 반복적으로 사용되기 때문에 만들어 놓은 변수

function saveName(text) {
  localStorage.setItem(CURRENT_LOCALSTORAGE, text);
}

function handleSubmit(event) {
  event.preventDefault(); // 디폴트로 수행되는 것을 막아준다
  const currentValue = input.value;
  paintingGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(CLASSNAME_SHOWING);
  form.addEventListener("submit", handleSubmit);
}

function paintingGreeting(text) {
  form.classList.remove(CLASSNAME_SHOWING);
  greeting.classList.add(CLASSNAME_SHOWING);
  greeting.innerText = `Hello, ${text}`;

  // add class other element
  classClock.classList.add(CLASSNAME_SHOWING);
  classWeather.classList.add(CLASSNAME_SHOWING);
  classToDoForm.classList.add(CLASSNAME_SHOWING);
  classPendingWrap.classList.add(CLASSNAME_SHOWING);
  classFinishedWrap.classList.add(CLASSNAME_SHOWING);
}

function loadUserName() {
  const currentUserName = localStorage.getItem(CURRENT_LOCALSTORAGE);
  if(currentUserName == null) {
    // 사용자가 존재하지 않을 때
    askForName();
  } else {
    // 사용자가 존재할 때
    paintingGreeting(currentUserName);
  }
}

function init() {
  loadUserName();
}

init();