"use strict";
// selector
const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

// 현재 시간 얻기
function getTime() {
  // Date 객체로부터 시간 가지고 오기
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // HTML로 보여 주는 작업
  // ternary operator(삼항 연산자)
  // 조건 ? A : B
  // : 조건이 만약 참이면 A, 거짓이면 B
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}


function init() {
  getTime();
  // setInterval
  // 두 개의 인자를 가지고 있는데, 첫 번째 인자는 함수, 두 번째 인자는 시간 간격
  setInterval(getTime, 1000);
}

init();