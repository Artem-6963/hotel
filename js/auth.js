let currentUser = null;

function loadCurrentUser() {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
        currentUser = JSON.parse(userJson);
        updateUIBasedOnAuth();
    }
}

function updateUIBasedOnAuth() {
    const profileLink = document.getElementById('profileLink');
    const authLink = document.getElementById('authLink');
    const adminLink = document.getElementById('adminLink');
    
    if (currentUser) {
        if (profileLink) profileLink.textContent = `👤 ${currentUser.name}`;
        if (authLink) authLink.textContent = 'Выйти';
        if (adminLink && currentUser.role === 'admin') {
            adminLink.style.display = 'inline';
        }
    } else {
        if (profileLink) profileLink.textContent = 'Профиль';
        if (authLink) authLink.textContent = 'Вход';
        if (adminLink) adminLink.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    loadCurrentUser();
    const authLink = document.getElementById('authLink');
    if (authLink) {
        authLink.addEventListener('click', (e) => {
            if (currentUser) {
                e.preventDefault();
                logout();
            }
        });
    }
});