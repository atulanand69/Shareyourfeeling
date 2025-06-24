document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
        return;
    }

    const currentUser = localStorage.getItem('currentUser');
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const tabButtons = document.querySelectorAll('.tab-btn');
    let currentFilter = 'all';
    let currentTab = 'received';

    // Emotion-specific icons
    const emotionIcons = {
        angry: '🔥',
        anxious: '😰',
        broken: '💔',
        bored: '😑',
        confused: '😕',
        calm: '😌',
        all: '💌'
    };

    // Load initial messages
    loadMessages();

    // Handle filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            applyEmotionStyle(currentFilter);
            loadMessages();
        });
    });

    // Handle tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentTab = button.dataset.tab;
            loadMessages();
        });
    });

    // Function to apply emotion-specific styles
    function applyEmotionStyle(emotion) {
        const messagesContainer = document.querySelector('.messages-container');
        if (messagesContainer) {
            // Remove all emotion classes
            messagesContainer.classList.remove(
                'emotion-angry',
                'emotion-anxious',
                'emotion-broken',
                'emotion-bored',
                'emotion-confused',
                'emotion-calm',
                'emotion-all'
            );
            // Add the current emotion class
            messagesContainer.classList.add(`emotion-${emotion}`);
        }
    }

    // Function to share message on WhatsApp
    function shareOnWhatsApp(message) {
        const text = `Message from ShareFeelings:\n\n${message.message}\n\n${message.feeling ? `Feeling: ${message.feeling}\n` : ''}Shared via ShareFeelings`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/?text=${encodedText}`, '_blank');
    }

    // Load and display messages
    function loadMessages() {
        // First, filter messages that are relevant to the current user
        let userMessages = messages.filter(msg => 
            msg.from === currentUser || msg.to === currentUser
        );

        // Then apply tab filter (received/sent)
        if (currentTab === 'received') {
            userMessages = userMessages.filter(msg => msg.to === currentUser);
        } else {
            userMessages = userMessages.filter(msg => msg.from === currentUser);
        }

        // Finally, apply feeling filter if selected
        if (currentFilter !== 'all') {
            userMessages = userMessages.filter(msg => msg.feeling === currentFilter);
        }

        // Sort messages by timestamp (newest first)
        userMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        displayMessages(userMessages);
    }

    // Display messages in the list
    function displayMessages(messages) {
        const messagesList = document.getElementById('messagesList');
        messagesList.innerHTML = '';

        if (messages.length === 0) {
            messagesList.innerHTML = `
                <div class="no-messages">
                    <p>${emotionIcons[currentFilter]} No messages found</p>
                </div>
            `;
            return;
        }

        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message-card';
            
            // Determine if the current user is the sender or receiver
            const isSender = message.from === currentUser;
            
            messageElement.innerHTML = `
                <div class="message-header">
                    <span class="message-direction">
                        ${emotionIcons[currentFilter]} ${isSender ? 'To: ' + message.to : 'From: ' + message.from}
                    </span>
                    <span class="message-time">${new Date(message.timestamp).toLocaleString()}</span>
                </div>
                <div class="message-content">
                    <p>${message.message}</p>
                    ${message.feeling ? `<span class="message-feeling">Feeling: ${message.feeling}</span>` : ''}
                </div>
                <div class="message-actions">
                    <button class="whatsapp-share-btn" onclick="shareOnWhatsApp(${JSON.stringify(message)})">
                        <i class="fab fa-whatsapp"></i> Share on WhatsApp
                    </button>
                </div>
            `;
            messagesList.appendChild(messageElement);
        });
    }
});

// Add messages page specific styles
const messagesStyles = document.createElement('style');
messagesStyles.textContent = `
    .messages-tabs {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .tab-btn {
        padding: 0.8rem 1.5rem;
        border: 2px solid var(--primary-color);
        border-radius: var(--border-radius);
        background: white;
        color: var(--primary-color);
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .tab-btn:hover,
    .tab-btn.active {
        background: var(--primary-color);
        color: white;
    }

    .no-messages {
        text-align: center;
        padding: 2rem;
        color: #666;
        font-size: 1.2rem;
    }

    .message-card {
        background: white;
        border: 1px solid #eee;
        border-radius: var(--border-radius);
        padding: 1rem;
        margin-bottom: 1rem;
        transition: all 0.3s ease;
    }

    .message-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--box-shadow);
    }

    .message-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        color: #666;
    }

    .message-direction {
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .message-content {
        color: var(--text-color);
    }

    .message-feeling {
        display: inline-block;
        margin-top: 0.5rem;
        padding: 0.25rem 0.5rem;
        border-radius: var(--border-radius);
        font-size: 0.9rem;
    }

    .message-actions {
        margin-top: 1rem;
        display: flex;
        justify-content: flex-end;
    }

    .whatsapp-share-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: #25D366;
        color: white;
        border: none;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .whatsapp-share-btn:hover {
        background: #128C7E;
        transform: translateY(-1px);
    }

    .whatsapp-share-btn i {
        font-size: 1.2rem;
    }

    .messages-container {
        padding: 1rem;
        border-radius: var(--border-radius);
        transition: all 0.3s ease;
    }

    .filter-btn {
        transition: all 0.3s ease;
    }

    .filter-btn:hover {
        transform: translateY(-1px);
    }

    @media (max-width: 768px) {
        .message-header {
            flex-direction: column;
            gap: 0.5rem;
        }

        .messages-tabs {
            flex-direction: column;
        }

        .tab-btn {
            width: 100%;
        }

        .message-actions {
            justify-content: center;
        }
    }
`;
document.head.appendChild(messagesStyles); 