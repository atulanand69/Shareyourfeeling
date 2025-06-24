document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!validateForm(registerForm)) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            const username = document.getElementById('username').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validate password match
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }

            // Validate phone number format
            if (!validatePhoneNumber(phone)) {
                showNotification('Please enter a valid phone number', 'error');
                return;
            }

            try {
                // In a real application, this would be an API call
                // For demo purposes, we'll store in localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                
                // Check if username already exists
                if (users.some(user => user.username === username)) {
                    showNotification('Username already exists', 'error');
                    return;
                }

                // Add new user
                users.push({
                    username,
                    phone,
                    password, // In a real app, this should be hashed
                    createdAt: new Date().toISOString()
                });

                localStorage.setItem('users', JSON.stringify(users));

                // Auto login after registration
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', username);

                showNotification('Registration successful!');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } catch (error) {
                showNotification('Registration failed. Please try again.', 'error');
                console.error('Registration error:', error);
            }
        });
    }
});

// Phone number validation
function validatePhoneNumber(phone) {
    // Basic phone number validation
    // This can be customized based on your requirements
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
} 