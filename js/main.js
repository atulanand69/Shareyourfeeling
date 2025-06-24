// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Check authentication status
    checkAuthStatus();
});

// Authentication Functions
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    
    // Update navigation based on auth status
    const authLinks = document.querySelectorAll('.auth-link');
    const dashboardLinks = document.querySelectorAll('[href="dashboard.html"]');
    
    if (isLoggedIn && currentUser) {
        authLinks.forEach(link => link.style.display = 'none');
        dashboardLinks.forEach(link => link.style.display = 'inline-block');
    } else {
        authLinks.forEach(link => link.style.display = 'inline-block');
        dashboardLinks.forEach(link => link.style.display = 'none');
    }
}

// Logout Function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Add logout event listeners
document.addEventListener('DOMContentLoaded', () => {
    const logoutButtons = document.querySelectorAll('#logoutBtn, #footerLogoutBtn');
    logoutButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }
    });
});

// Form Validation
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add all common styles
const commonStyles = document.createElement('style');
commonStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }

    .notification.success {
        background-color: #2ecc71;
    }

    .notification.error {
        background-color: #e74c3c;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .error {
        border-color: #e74c3c !important;
    }

    .form-group input.error {
        border-color: #e74c3c;
        animation: shake 0.5s;
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(commonStyles); 