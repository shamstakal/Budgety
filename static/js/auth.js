let loginForm = document.getElementById("login-form");
let signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    signup();
  });
}
function signup() {
  let url = "http://127.0.0.1:8000/signup/";
  let data = JSON.stringify(form_data(signupForm));
  fetch(url, {
    method: "POST",
    body: data,
  })
    .then((jresp) => jresp.json())
    .then((resp) => loginHandler(resp))
    .catch((error) => console.log(error));
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
  });
}
function login() {
  let url = "http://127.0.0.1:8000/login/";
  let data = JSON.stringify(form_data(loginForm));
  fetch(url, {
    method: "POST",
    body: data,
  })
    .then((jresp) => jresp.json())
    .then((resp) => loginHandler(resp))
    .catch((error) => console.log(error));
}

function loginHandler(resp) {
  if (resp["error"]) {
    if (resp.hasOwnProperty("key")) {
      alert(resp["key"] + " Can not be empty");
    } else if (resp.hasOwnProperty("error")) {
      alert(resp["msg"]);
    }
  } else {
    window.location = "/";
  }
}

function form_data(form) {
  let data = {};
  for (let inp of form) {
    if (inp.tagName != "BUTTON") {
      data[inp.id] = inp.value;
    }
  }
  return data;
}
