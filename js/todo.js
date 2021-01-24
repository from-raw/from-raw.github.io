"use strict";

// const이기 때문에 다른 js 파일에 있는 변수명들과 겹쳐서 사용하면 안 된다
const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LOCALSTORAGE = "toDos";

let toDos = [];
// let idNumbers = 1;

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });

  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LOCALSTORAGE, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  
  delBtn.innerText = "❌"; // window키 + .(마침표)
  delBtn.addEventListener("click", deleteToDo);

  const span = document.createElement("span");
  const newId = toDos.length + 1; // 오류 생김
  span.innerText = text;
  li.appendChild(span); // appendChild: 부모 요소(선택자)에게 자식 요소의 최종 결과물을 넣어주는 역할
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  
  const toDoObj = {
    text: text,
    id: newId
  }

  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LOCALSTORAGE);
  if(toDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); // JSON의 parse 메소드: 문자열로 변환해 준다.
    parsedToDos.forEach(function(toDo){
      paintToDo(toDo.text);
    }) // forEach: 요소들을 전부 각각 실행시켜 주는 것
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();