let listState = [];
const STATE_KEY = "todo-list";

function loadState() {
  const listState = localStorage.getItem(STATE_KEY);
  if (listState !== null) return JSON.parse(listState);
  return [];
}

function saveState(list) {
  localStorage.setItem(STATE_KEY, JSON.stringify(list));
}

function initList() {
  listState = loadState();
  const ul = document.getElementById("list");
  for (const item of listState) {
    const li = document.createElement("li");
    li.classList.add("item");
    li.innerText = item.text;
    li.onclick = checkItem;
    const deleteButton = document.createElement("span");
    deleteButton.classList.add("delete");
    deleteButton.onclick = deleteItem;
    li.appendChild(deleteButton);
    if (item.checked) li.classList.add("checked");
    ul.appendChild(li);
  }
}

function addItem() {
  const ul = document.getElementById("list");
  const input = document.getElementById("input");
  const text = input.value;
  if (text === "") {
    alert("請輸入內容");
    return;
  }
  const newItem = document.createElement("li");
  newItem.classList.add("item");
  newItem.innerText = text;
  newItem.onclick = checkItem;

  const deleteButton = document.createElement("span");
  deleteButton.classList.add("delete");
  deleteButton.onclick = deleteItem;

  newItem.appendChild(deleteButton);

  listState.push({
    text,
    checked: false,
  });
  saveState(listState);
  input.value = "";
  ul.appendChild(newItem);
}

function checkItem(e) {
  const item = e.target;
  const parent = item.parentNode;
  const idx = Array.from(parent.childNodes).indexOf(item);
  listState[idx - 1].checked = !listState[idx - 1].checked;
  console.log(idx);
  item.classList.toggle("checked");
  saveState(listState);
}

function deleteItem(e) {
  const item = this.parentNode;
  const parent = item.parentNode;
  const index = Array.from(parent.childNodes).indexOf(item);
  listState = listState.filter((_, i) => i !== index - 1);
  saveState(listState);
  parent.removeChild(item);
  e.stopPropagation();
}

initList();
const addbutton = document.getElementById("add-button");
const form = document.getElementById("input-wrapper");
addbutton.addEventListener("click", addItem);
form.addEventListener("submit", (e) => e.preventDefault());
