// home.js

function displayWelcome() {
    // Check if user is logged in
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    // Get user email from sessionStorage (set during login/signup)
    const email = sessionStorage.getItem('currentUserEmail');
    if (!email) {
        document.getElementById('welcomeMsg').innerText = 'Welcome!';
        return;
    }

    // Get user info from localStorage
    const members = JSON.parse(localStorage.getItem('members')) || [];
    const user = members.find(m => m.email === email);
    if (user) {
        document.getElementById('welcomeMsg').innerText = `Welcome, ${user.name}!`;
    }
}

// Logout function
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUserEmail');
    window.location.href = 'index.html';
}
