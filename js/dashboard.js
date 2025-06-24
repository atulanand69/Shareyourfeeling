document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
        return;
    }

    const adminMessageForm = document.getElementById('adminMessageForm');
    const userMessageForm = document.getElementById('userMessageForm');
    const feelingButtons = document.querySelectorAll('.feeling-btn');
    let selectedFeeling = null;

    // Handle feeling selection
    feelingButtons.forEach(button => {
        button.addEventListener('click', () => {
            feelingButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedFeeling = button.dataset.feeling;
        });
    });

    // Handle admin message form
    if (adminMessageForm) {
        adminMessageForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!validateForm(adminMessageForm)) {
                showNotification('Please enter your message', 'error');
                return;
            }

            const message = adminMessageForm.querySelector('textarea').value;
            const currentUser = localStorage.getItem('currentUser');

            try {
                // In a real application, this would be an API call
                const messages = JSON.parse(localStorage.getItem('messages') || '[]');
                messages.push({
                    from: currentUser,
                    to: 'admin',
                    message,
                    feeling: selectedFeeling,
                    timestamp: new Date().toISOString()
                });

                localStorage.setItem('messages', JSON.stringify(messages));
                adminMessageForm.reset();
                feelingButtons.forEach(btn => btn.classList.remove('active'));
                selectedFeeling = null;

                showNotification('Message sent to admin successfully!');
            } catch (error) {
                showNotification('Failed to send message. Please try again.', 'error');
                console.error('Message error:', error);
            }
        });
    }

    // Handle user message form
    if (userMessageForm) {
        userMessageForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!validateForm(userMessageForm)) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            const toUsername = userMessageForm.querySelector('input').value;
            const message = userMessageForm.querySelector('textarea').value;
            const currentUser = localStorage.getItem('currentUser');

            try {
                // Check if recipient exists
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const recipientExists = users.some(user => user.username === toUsername);

                if (!recipientExists) {
                    showNotification('Recipient username not found', 'error');
                    return;
                }

                // In a real application, this would be an API call
                const messages = JSON.parse(localStorage.getItem('messages') || '[]');
                messages.push({
                    from: currentUser,
                    to: toUsername,
                    message,
                    feeling: selectedFeeling,
                    timestamp: new Date().toISOString()
                });

                localStorage.setItem('messages', JSON.stringify(messages));
                userMessageForm.reset();
                feelingButtons.forEach(btn => btn.classList.remove('active'));
                selectedFeeling = null;

                showNotification('Message sent successfully!');
            } catch (error) {
                showNotification('Failed to send message. Please try again.', 'error');
                console.error('Message error:', error);
            }
        });
    }
}); 