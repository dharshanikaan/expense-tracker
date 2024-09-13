document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('form');
    const expenseList = document.getElementById('list');
    const expenseCategory = document.getElementById('category');
    const addExpenseBtn = document.getElementById('btn');
    const expenseAmount = document.getElementById('amount');
    const expenseDescription = document.getElementById('des');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    
    function display() {
        expenseList.innerHTML = '';
        expenses.forEach(function(expense, index) {
            const li = document.createElement('li');
            li.textContent = `Amount: ${expense.amount} | Description: ${expense.description} | Category: ${expense.category}`;
                                        //keyword const amountword
            
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.setAttribute('edit-id',index);
            editBtn.addEventListener('click', function() {
                editExpense(index);
            });
            li.appendChild(editBtn);

            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.setAttribute('data-id', index); 
            deleteBtn.addEventListener('click', function() {
                deleteExpense(index);
            });
            li.appendChild(deleteBtn);

            expenseList.appendChild(li);
        });
    }
    function addExpense() {
        const amount = parseFloat(expenseAmount.value);
        const description = expenseDescription.value;
        const category = expenseCategory.value;

        if (!amount || !description || !category) {
            alert('Please fill in all fields.');
            return;
        }

        const expense = {
            amount: amount,
            description: description,
            category: category
        };

        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        expenseForm.reset();
        display(); 
    }
    function editExpense(index) {
        const newAmount = parseFloat(expenseAmount.value);
        const newDescription = expenseDescription.value;

        if (!newAmount || !newDescription) {
            alert('Please enter a valid amount and description.');
            return;
        }

        expenses[index].amount = newAmount;
        expenses[index].description = newDescription;

        localStorage.setItem('expenses', JSON.stringify(expenses));
        expenseForm.reset();
        display();
    }
    function deleteExpense(index) {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        display(); 
    }

    
    addExpenseBtn.addEventListener('click', addExpense);

    
    display();
});
