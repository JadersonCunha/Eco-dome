
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email === email && user.password === password) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'launch.html';
    } else {
        alert('Email ou senha incorretos.');
    }
}


function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password === confirmPassword) {
        const newUser = { name, email, password };
        localStorage.setItem('user', JSON.stringify(newUser));
        alert('Usuário cadastrado com sucesso!');
        window.location.href = 'index.html';
    } else {
        alert('As senhas não coincidem.');
    }
}


function handleAddExpense(event) {
    event.preventDefault();
    const name = document.getElementById('expenseName').value;
    const date = document.getElementById('expenseDate').value;
    const value = document.getElementById('expenseValue').value;
    const status = document.getElementById('expenseStatus').value;

    const expense = { name, date, value, status };
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    window.location.href = 'expenses.html';
}


function displayExpenses() {
    const expensesTableBody = document.querySelector('#expensesTable tbody');
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    expensesTableBody.innerHTML = '';

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>${expense.date}</td>
            <td>${expense.value}</td>
            <td>${expense.status}</td>
            <td><button onclick="deleteExpense(${index})">Excluir</button></td>
        `;
        expensesTableBody.appendChild(row);
    });
}


function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}


function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.autoTable({ html: '#expensesTable' });
    doc.save('despesas.pdf');
}


function handleLogout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}


function goToRegister() {
    window.location.href = 'register.html';
}

function goToLogin() {
    window.location.href = 'index.html';
}

function goToLaunch() {
    window.location.href = 'launch.html';
}


window.onload = function() {
    const path = window.location.pathname;
    
    
    if (path.includes('index.html')) {
        document.getElementById('loginForm').addEventListener('submit', handleLogin);
        document.getElementById('switchToRegister').addEventListener('click', goToRegister);
    }
    
    
    if (path.includes('register.html')) {
        document.getElementById('registerForm').addEventListener('submit', handleRegister);
    }

    
    if (path.includes('launch.html')) {
        document.getElementById('addExpenseButton').addEventListener('click', () => {
            document.getElementById('expenseFormContainer').style.display = 'block';
        });
        document.getElementById('cancelAddExpense').addEventListener('click', () => {
            document.getElementById('expenseFormContainer').style.display = 'none';
        });
        document.getElementById('expenseForm').addEventListener('submit', handleAddExpense);
    }

    
    if (path.includes('expenses.html')) {
        displayExpenses();
        document.getElementById('newExpenseButton').addEventListener('click', goToLaunch);
        document.getElementById('generatePDF').addEventListener('click', generatePDF);
        document.getElementById('logoutButton').addEventListener('click', handleLogout);
    }
};
