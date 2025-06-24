document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
        return;
    }

    const phoneInput = document.getElementById('phoneNumber');
    const messageInput = document.getElementById('messageText');
    const sendWhatsAppBtn = document.getElementById('sendWhatsApp');

    // Format phone number as user types
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    });

    // Send WhatsApp message
    sendWhatsAppBtn.addEventListener('click', () => {
        const phone = phoneInput.value;
        const message = messageInput.value;

        if (!phone || phone.length !== 10) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        if (!message.trim()) {
            alert('Please enter a message');
            return;
        }

        // Format the message with user info
        const currentUser = localStorage.getItem('currentUser');
        const formattedMessage = `Message from ShareFeelings user ${currentUser}:\n\n${message}`;
        const encodedMessage = encodeURIComponent(formattedMessage);

        // Open WhatsApp with the message
        window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
    });

    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    const footerLogoutBtn = document.getElementById('footerLogoutBtn');

    function logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }

    logoutBtn.addEventListener('click', logout);
    footerLogoutBtn.addEventListener('click', logout);

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}); 