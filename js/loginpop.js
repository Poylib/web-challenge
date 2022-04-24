const nameInput = document.querySelector('.nameInput')
const loginPop = document.querySelector('#loginPop');
const loginInput = document.querySelector('.loginInput');
const loginForm = document.querySelector('#loginForm');

const USERNAME_KEY = "username";

loginForm.addEventListener("submit", onLoginSubmit);

function onLoginSubmit(event) {
  event.preventDefault();
  loginPop.style.display = "none";
  const userName = loginInput.value;
  localStorage.setItem(USERNAME_KEY,userName);
  paintGreetings(userName);
}

function paintGreetings(userName) {
  if(userName === "") {
    nameInput.innerHTML = `Hello !`;
  } else {
    nameInput.innerHTML = `Hi ${userName}!<br/>Beautiful day, isn't it? `
  }
}

const savedUserName = localStorage.getItem(USERNAME_KEY);

if(savedUserName === null) {
  loginPop.addEventListener("submit", onLoginSubmit);
} else {
  loginPop.style.display = "none";
  paintGreetings(savedUserName);
}