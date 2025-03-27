
let users = JSON.parse(localStorage.getItem('users')) || [];


let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;


const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const logoutBtn = document.getElementById('logoutBtn');
const userEmailSpan = document.getElementById('userEmail');
const loginError = document.getElementById('loginError');
const registerError = document.getElementById('registerError');


document.addEventListener('DOMContentLoaded', () => {
    if (currentUser && (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html'))) {
        window.location.href = 'dashboard.html';
    }
    
    if (!currentUser && (window.location.pathname.includes('dashboard.html') || 
                         window.location.pathname.includes('upload.html') || 
                         window.location.pathname.includes('download.html'))) {
        window.location.href = 'login.html';
    }
    
    if (userEmailSpan) {
        userEmailSpan.textContent = currentUser ? currentUser.email : '';
    }
});

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            currentUser = { email: user.email, name: user.name };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            window.location.href = 'dashboard.html';
        } else {
            loginError.textContent = 'Invalid email or password';
            loginError.classList.remove('hidden');
        }
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        
       
        if (password !== confirmPassword) {
            registerError.textContent = 'Passwords do not match';
            registerError.classList.remove('hidden');
            return;
        }
        
        if (users.some(u => u.email === email)) {
            registerError.textContent = 'Email already registered';
            registerError.classList.remove('hidden');
            return;
        }
        
        
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        
        currentUser = { email, name };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        window.location.href = 'dashboard.html';
    });
}


if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
}
