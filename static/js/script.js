// var total_budget_field = document.getElementById("total-inc-out");
// var total_income_field = document.getElementById("total-income");
// var total_outcome_field = document.getElementById("total-outcome");
let delete_btns = document.querySelectorAll(".delete");
let budget_form = document.querySelector(".budget-form");

function addBudgetReq() {
  let data = form_data(budget_form);
  let url = "http://127.0.0.1:8000/add-budget/";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((jresp) => jresp.json())
    .then((resp) => successHandler(resp))
    .catch((error) => console.log(error));
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
budget_form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBudgetReq();
});
function successHandler(resp) {
  if (resp.error) {
    alert(resp.msg);
  } else {
    console.log("sles called");
    appendBudgetEl(resp);
  }
}
function appendBudgetEl(resp) {
  let newBudget = JSON.parse(resp)[0]["fields"];

  let element = document.createElement("li");
  let income_list = document.getElementById("income-ul");
  let outcome_list = document.getElementById("outcome-ul");
  element.innerHTML = `
        <h1>${newBudget["desc"]}</h1>
        <p>${newBudget["value"]}</p>
        <button class='delete' id="${newBudget["id"]}">x</button>`;

  if (newBudget["typ"] == "+") {
    income_list.appendChild(element);
  } else {
    outcome_list.appendChild(element);
  }
}
// console.log(delete_btns)

delete_btns.forEach((btn) => {
  // console.log(btn)
  btn.addEventListener("click", (e) => {
    // console.log(e.target.id)
    deleteBudget(e);
  });
});
function deleteBudget(e) {
  let url = "http://127.0.0.1:8000/delete-budget/";
  let data = JSON.stringify({ budg_id: e.target.id });
  fetch(url, {
    method: "POST",
    body: data,
  })
    .then((jresp) => jresp.json())
    .then((resp) => alert(resp["msg"]))
    .catch((error) => console.log(error));
}
// total_income = 20;
// total_outcome = 10;
// total_budget = 0;
// function budget_tracker() {
//   valid_inputs = validate_inputs(amount.value, description.value);
//   if (valid_inputs) {
//     let activity = create_activity_obj(
//       amount.value,
//       description.value,
//       type.value
//     );
//     add_activity(activity);
//   } else {
//     show_error_message("Please Insert Valid Values :) ");
//   }
//   clear_inputs(inputs);
// }

// function validate_inputs(amount, description) {
//   return parseInt(amount) && description;
// }

// function create_activity_obj(amount, description, type) {
//   return {
//     amount: amount,
//     desc: description,
//     type: type,
//   };
// }

// function add_activity(activity) {
//   let element = document.createElement("li");
//   create_activity_element(element, activity["desc"], activity["amount"]);

//   if (activity["type"] == "+") {
//     total_income += parseFloat(activity["amount"]);
//     income_list.append(element);
//   } else {
//     total_outcome += parseFloat(activity["amount"]);
//     outcome_list.append(element);
//   }
//   available_budget();
// }

// function available_budget() {
//   total_income_field.textContent = total_income;
//   total_outcome_field.textContent = total_outcome;
//   total_budget = total_income - total_outcome;
//   total_budget_field.textContent = total_budget;
// }

// function show_error_message(message) {
//   alert(message);
// }

// function create_activity_element(element, desc, amount) {
//   element.innerHTML = `
//                         <h1>${desc}</h1>
//                         <p>${amount}</p>
//                         <button id="delete">x</button>`;
// }

// function clear_inputs(inputs) {
//   for (const input of inputs) {
//     input.value = "";
//   }
// }
// add_btn.addEventListener("click", budget_tracker);
