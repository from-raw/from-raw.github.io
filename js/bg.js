"use strict";

const body = document.querySelector("body");

const IMG_NUMBER = 6;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `././images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image); // appendChild와 prepend의 차이점 정리하기
}

function getRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = getRandom();
  paintImage(randomNumber);
}

init();