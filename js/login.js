document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!validateForm(loginForm)) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                // In a real application, this would be an API call
                // For demo purposes, we'll check localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => u.username === username && u.password === password);

                if (user) {
                    // Set login state
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('currentUser', username);

                    showNotification('Login successful!');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                } else {
                    showNotification('Invalid username or password', 'error');
                }
            } catch (error) {
                showNotification('Login failed. Please try again.', 'error');
                console.error('Login error:', error);
            }
        });
    }
}); 