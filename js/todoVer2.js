const toDoForm = document.querySelector(".toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".pendingList"),
  finishedList = document.querySelector(".finishedList");

const PENDINGLIST_LS = "PENDING",
  FINISHEDLIST_LS = "FINISHED";

let pendingToDos = [];
let finishedToDos = [];

function savePending() {
  localStorage.setItem(PENDINGLIST_LS, JSON.stringify(pendingToDos));
}

function saveFinished() {
  localStorage.setItem(FINISHEDLIST_LS, JSON.stringify(finishedToDos));
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;

  if (ul.className === "pendingList") {
    pendingList.removeChild(li);

    const cleanToDo = pendingToDos.filter(function (pendingToDos) {
      return pendingToDos.id !== parseInt(li.id);
    });

    pendingToDos = cleanToDo;

    savePending();
  } else {
    finishedList.removeChild(li);

    const cleanToDo = finishedToDos.filter(function (finishedToDos) {
      return finishedToDos.id !== parseInt(li.id);
    });

    finishedToDos = cleanToDo;

    saveFinished();
  }
}

function finishedToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;

  pendingList.removeChild(li);
  const cleanPending = pendingToDos.filter(function (pendingToDos) {
    return pendingToDos.id !== parseInt(li.id);
  });

  pendingToDos = cleanPending;

  const texts = li.querySelector("span").innerText;
  paintFinished(texts);

  savePending();
}

function pendingToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;

  finishedList.removeChild(li);
  const cleanPending = finishedToDos.filter(function (finishedToDos) {
    return finishedToDos.id !== parseInt(li.id);
  });

  finishedToDos = cleanPending;

  const texts = li.querySelector("span").innerText;
  paintPending(texts);

  saveFinished();
}

function paintPending(text) {
  const li = document.createElement("li");
  const deleteBtn = document.createElement("button");
  const finishedBtn = document.createElement("button");
  const span = document.createElement("span");

  deleteBtn.innerText = "X";
  finishedBtn.innerText = "V";

  deleteBtn.addEventListener("click", deleteToDo);
  finishedBtn.addEventListener("click", finishedToDo);
  span.innerText = text;

  li.appendChild(span);
  li.appendChild(finishedBtn);
  li.appendChild(deleteBtn);
  const newId = pendingToDos.length + 1;
  li.id = newId;
  pendingList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };

  pendingToDos.push(toDoObj);
  savePending();
}

function paintFinished(text) {
  const li = document.createElement("li");
  const deleteBtn = document.createElement("button");
  const pendingBtn = document.createElement("button");
  const span = document.createElement("span");
  deleteBtn.innerText = "X";
  pendingBtn.innerText = "<";
  deleteBtn.addEventListener("click", deleteToDo);
  pendingBtn.addEventListener("click", pendingToDo);
  span.innerText = text;

  li.appendChild(span);
  li.appendChild(pendingBtn);
  li.appendChild(deleteBtn);
  const newId = finishedToDos.length + 1;
  li.id = newId;
  finishedList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };

  finishedToDos.push(toDoObj);
  saveFinished();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintPending(currentValue);
  toDoInput.value = "";
}

function loadPendingList() {
  const loadedToDos = localStorage.getItem(PENDINGLIST_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintPending(toDo.text);
    });
  }
}

function loadFinishedList() {
  const loadedToDos = localStorage.getItem(FINISHEDLIST_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintFinished(toDo.text);
    });
  }
}

function loadToDos() {
  loadPendingList();
  loadFinishedList();
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
