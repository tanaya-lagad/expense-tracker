const chartCanvas = document.getElementById("chart");
let chart;

const form = document.getElementById("expenseForm");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const list = document.getElementById("expenseList");
const totalText = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];   // ← expenses

function showExpenses() {
  list.innerHTML = "";
  let total = 0;

  expenses.forEach(function (exp, index) {                            // ← expenses
    const li = document.createElement("li");
    li.textContent = `${exp.name} - Rs.${exp.amount} (${exp.category}, ${exp.date}) `;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      expenses.splice(index, 1);                                      // ← expenses
      saveAndShow();                                                  // ← capital S
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
    total += exp.amount;
  });

  totalText.textContent = total;
  showChart();                                                        // ← NEW
}

function saveAndShow() {                                              // ← was missing
  localStorage.setItem("expenses", JSON.stringify(expenses));
  showExpenses();
}

function showChart() {                                                // ← NEW (chart)
  const totals = {};

  expenses.forEach(function (exp) {
    totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
  });

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(chartCanvas, {
    type: "pie",
    data: {
      labels: Object.keys(totals),
      datasets: [{ data: Object.values(totals) }]
    }
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  expenses.push({
    name: nameInput.value,
    amount: Number(amountInput.value),
    category: categoryInput.value,
    date: dateInput.value
  });

  saveAndShow();
  form.reset();
});

showExpenses();