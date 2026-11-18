const form = document.getElementById("expenseForm");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const list = document.getElementById("expenseList");
const totalText = document.getElementById("total");

let totalAmount = 0;

form.addEventListener("submit",function(event){
    event.preventDefault();

    const name = nameInput.value;
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;

    const li = document.createElement("li");

    li.textContent = `${name} - RS.${amount} (${category},${date})`;
    
    const deleteBtn=document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click",function(){
        li.remove();
        totalAmount -=amount;
        totalText.textContent = totalAmount;
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);

    totalAmount +=amount;
    totalText.textContent = totalAmount;

    form.requestFullscreen();

});