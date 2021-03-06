let budget_form = document.querySelector(".budget-form");

//THE MAIN ADD BUDGET AJAX REAQUEST
function addBudgetReq() {
  let data = form_data(budget_form);
  let url = "http://127.0.0.1:8000/add-budget/";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((jresp) => jresp.json())
    .then((resp) => {
      budgetGUIHandler(data);
      respHandler(resp);
    })
    .catch((error) => console.log(error));
}
function respHandler(resp) {
  if (resp.error) {
    if (resp.hasOwnProperty("msg")) {
      alert(resp.msg);
    }
  } else {
    alert("Successfully Added");
    appendBudgetEl(resp);
  }
}
// TOTAL BUDGET INTERFACE HANDLER
function budgetGUIHandler(data) {
  let total_income = document.getElementById("total-income");
  let total_outcome = document.getElementById("total-outcome");
  let total_inc_out = document.getElementById("total-inc-out");

  if (data["type"] == "+") {
    let new_val =
      parseFloat(total_income.textContent) + parseFloat(data["value"]);
    total_income.textContent = new_val;
  } else {
    new_val = parseFloat(total_outcome.textContent) + parseFloat(data["value"]);
    total_outcome.textContent = new_val;
  }
  total_inc_out.textContent =
    parseFloat(total_income.textContent) -
    parseFloat(total_outcome.textContent);
}
//COLLECTING DATA FROM A FORM AT ONCE
function form_data(form) {
  let data = {};
  for (let inp of form) {
    if (inp.tagName != "BUTTON") {
      data[inp.id] = inp.value;
    }
  }
  return data;
}

//SUBMIT EVENT ON THE BUDGET FORMMMM
budget_form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBudgetReq();
});

//CREATING NEW BUDGET ELEMENT
function appendBudgetEl(resp) {
  let data = JSON.parse(resp)[0];
  let newBudget = data["fields"];
  let element = document.createElement("li");
  let income_list = document.getElementById("income-ul");
  let outcome_list = document.getElementById("outcome-ul");
  element.innerHTML = `
        <h1>${newBudget["desc"]}</h1>
        <p>${newBudget["value"]}</p>
        <button class='delete' id="${data["pk"]}">x</button>`;
  if (newBudget["typ"] == "+") {
    income_list.appendChild(element);
  } else {
    outcome_list.appendChild(element);
  }
  deleteListeners();
}

//ADDING EVENT LISTENtERSSSSSSSSSSSS
function deleteListeners() {
  let delete_btns = document.querySelectorAll(".delete");
  delete_btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      deleteBudget(e);
    });
  });
}
deleteListeners();

//DELETING A BUDGETTTTTTT
function deleteBudget(e) {
  let url = "http://127.0.0.1:8000/delete-budget/";
  let data = JSON.stringify({ budg_id: e.target.id });
  fetch(url, {
    method: "POST",
    body: data,
  })
    .then((jresp) => jresp.json())
    .then((resp) => {
      hider(e.target.id);
      alert(resp["msg"]);
    })
    .catch((error) => console.log(error));
}

function hider(id) {
  let el = document.getElementById(id).parentElement;
  el.style.display = "none";
}
