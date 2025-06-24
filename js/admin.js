// Admin credentials (in a real application, this would be stored securely on the server)
const ADMIN_CREDENTIALS = {
    username: 'Admin',
    password: 'admin1234' // In a real application, this would be hashed
};

// Check if admin is logged in
function checkAdminAuth() {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isAdminLoggedIn && !window.location.href.includes('admin-login.html')) {
        window.location.href = 'admin-login.html';
    }
}

// Admin login form handler
document.addEventListener('DOMContentLoaded', () => {
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    const footerAdminLogoutBtn = document.getElementById('footerAdminLogoutBtn');

    // Handle admin login
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('adminUsername').value;
            const password = document.getElementById('adminPassword').value;

            if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
                localStorage.setItem('isAdminLoggedIn', 'true');
                showNotification('Admin login successful!');
                setTimeout(() => {
                    window.location.href = 'admin-dashboard.html';
                }, 1500);
            } else {
                showNotification('Invalid admin credentials', 'error');
            }
        });
    }

    // Handle admin logout
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isAdminLoggedIn');
            window.location.href = 'admin-login.html';
        });
    }

    if (footerAdminLogoutBtn) {
        footerAdminLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isAdminLoggedIn');
            window.location.href = 'admin-login.html';
        });
    }

    // Load admin dashboard data
    if (window.location.href.includes('admin-dashboard.html')) {
        loadAdminDashboard();
    }
});

// Load admin dashboard data
function loadAdminDashboard() {
    // Load users count
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    document.getElementById('totalUsers').textContent = users.length;

    // Load messages
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    document.getElementById('totalMessages').textContent = messages.length;

    // Display messages
    displayMessages(messages);

    // Add filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            filterMessages(filter);
        });
    });
}

// Display messages in the dashboard
function displayMessages(messages) {
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '';

    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message-card';
        messageElement.innerHTML = `
            <div class="message-header">
                <span class="message-from">From: ${message.from}</span>
                <span class="message-to">To: ${message.to}</span>
                <span class="message-time">${new Date(message.timestamp).toLocaleString()}</span>
            </div>
            <div class="message-content">
                <p>${message.message}</p>
                ${message.feeling ? `<span class="message-feeling">Feeling: ${message.feeling}</span>` : ''}
            </div>
        `;
        messagesList.appendChild(messageElement);
    });
}

// Filter messages by feeling
function filterMessages(filter) {
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    const filteredMessages = filter === 'all' 
        ? messages 
        : messages.filter(message => message.feeling === filter);
    displayMessages(filteredMessages);
}

// Add admin dashboard styles
const adminStyles = document.createElement('style');
adminStyles.textContent = `
    .admin-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin: 2rem 0;
    }

    .stat-card {
        background: white;
        padding: 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        text-align: center;
    }

    .stat-card h3 {
        margin-bottom: 0.5rem;
        color: var(--text-color);
    }

    .stat-card p {
        font-size: 2rem;
        font-weight: bold;
        color: var(--primary-color);
    }

    .message-filters {
        background: white;
        padding: 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        margin: 2rem 0;
    }

    .filter-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;
    }

    .filter-btn {
        padding: 0.5rem 1rem;
        border: 2px solid var(--primary-color);
        border-radius: var(--border-radius);
        background: white;
        color: var(--primary-color);
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .filter-btn:hover,
    .filter-btn.active {
        background: var(--primary-color);
        color: white;
    }

    .messages-container {
        background: white;
        padding: 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
    }

    .message-card {
        border: 1px solid #eee;
        border-radius: var(--border-radius);
        padding: 1rem;
        margin-bottom: 1rem;
    }

    .message-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        color: #666;
    }

    .message-content {
        color: var(--text-color);
    }

    .message-feeling {
        display: inline-block;
        margin-top: 0.5rem;
        padding: 0.25rem 0.5rem;
        background: #f0f0f0;
        border-radius: var(--border-radius);
        font-size: 0.9rem;
    }
`;
document.head.appendChild(adminStyles); 