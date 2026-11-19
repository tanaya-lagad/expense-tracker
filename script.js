const form = document.getElementById("expenseForm");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const list = document.getElementById("expenseList");
const totalText = document.getElementById("total");

let  expense = JSON.parse(localStorage.getItem("expenses")) ||[];
//let totalAmount = 0;

function showExpenses(){
    list.innerHTML = "";
    let total = 0;

    showExpenses.forEach(function(exp,index){
        const li = document.createElement("li");
        li.textContent = `${exp.name} - RS.${exp.amount} (${exp.category},${exp.date})`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click",function(){
            showExpenses.splice(index, 1);
            saveAndshow();
        });

        li.appendChild(deleteBtn);
        list.appendChild(li);
        total +=exp.amount;
    });

    totalText.textContent = total;
}


form.addEventListener("submit",function(event){
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