function signUp(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const year = document.getElementById('year').value.trim();
    const address = document.getElementById('address').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!name || !email || !year || !address || !password) {
        alert("Please fill in all required fields.");
        return;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    let members = JSON.parse(localStorage.getItem('members')) || [];
    if (members.find(m => m.email === email)) {
        alert("This email is already registered.");
        return;
    }

    const newMember = { name, email, phone, year, address, password };
    members.push(newMember);
    localStorage.setItem('members', JSON.stringify(members));

  
    sessionStorage.setItem('isLoggedIn', 'true');
    alert("Registration Successful!");
    window.location.href = "Members.html";
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPassword').value;
    
    let members = JSON.parse(localStorage.getItem('members')) || [];
    const user = members.find(m => m.email === email && m.password === pass);

    if (user) {
      
        sessionStorage.setItem('isLoggedIn', 'true');
        window.location.href = "Members.html";
    } else {
        alert("Invalid credentials!");
    }
}


function checkAuth() {
    const directoryBtn = document.getElementById('directoryBtn');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true') {
        directoryBtn.style.display = 'block';
    } else {
        directoryBtn.style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', checkAuth);
