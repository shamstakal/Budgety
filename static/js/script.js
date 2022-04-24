// var total_budget_field = document.getElementById("total-inc-out");
// var total_income_field = document.getElementById("total-income");
// var total_outcome_field = document.getElementById("total-outcome");
// var income_list = document.getElementById("income-ul");
// var outcome_list = document.getElementById("outcome-ul");
// alert('fsfe')
let add_btn = document.getElementById("add-btn");
let budget_form = document.querySelector(".budget-form");

function addBudgetReq() {
  let data = form_data(budget_form);
  let url = "http://127.0.0.1:8000/add-budget/";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((jresp) => jresp.json())
    .then((resp) => alert(resp.msg))
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
// form_data(budget_form);
// add_btn.addEventListener("click", addBudgetReq);
budget_form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBudgetReq();
});
// var type = document.getElementById("type");
// var description = document.getElementById("name");
// var amount = document.getElementById("amount");
// var inputs = document.querySelectorAll("input");
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
