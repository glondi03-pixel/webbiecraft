// WebbieCraft Chatbot Integration
// Replace YOUR_N8N_WEBHOOK_URL with your actual webhook URL from n8n

const CHATBOT_CONFIG = {
    webhookUrl: 'https://giovannilondi.app.n8n.cloud/webhook/webbiecraft-chat',
    welcomeMessage: 'Hi! I\'m here to help you learn about WebbieCraft\'s services. Ask me about web design, automation, pricing, or anything else!',
    botName: 'WebbieCraft Assistant'
};

class WebbieCraftChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.conversationHistory = [];
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div class="chatbot-container">
                <button class="chatbot-button" id="chatbot-toggle" aria-label="Open chat">
                    💬
                </button>

                <div class="chatbot-window" id="chatbot-window">
                    <div class="chatbot-header">
                        <h3>WEBBIECRAFT</h3>
                        <button class="chatbot-close" id="chatbot-close" aria-label="Close chat">
                            ×
                        </button>
                    </div>

                    <div class="chatbot-messages" id="chatbot-messages">
                        <!-- Messages will be inserted here -->
                    </div>

                    <div class="chatbot-input-area">
                        <input
                            type="text"
                            class="chatbot-input"
                            id="chatbot-input"
                            placeholder="Type your message..."
                            aria-label="Chat message input"
                        >
                        <button class="chatbot-send" id="chatbot-send" aria-label="Send message">
                            →
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        const toggleBtn = document.getElementById('chatbot-toggle');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        toggleBtn.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.closeChat());
        sendBtn.addEventListener('click', () => this.sendMessage());

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    toggleChat() {
        const window = document.getElementById('chatbot-window');
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            window.classList.add('active');
            document.getElementById('chatbot-input').focus();
        } else {
            window.classList.remove('active');
        }
    }

    closeChat() {
        const window = document.getElementById('chatbot-window');
        window.classList.remove('active');
        this.isOpen = false;
    }

    addWelcomeMessage() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const welcomeHTML = `
            <div class="welcome-message">
                <h4>👋 Welcome!</h4>
                <p>${CHATBOT_CONFIG.welcomeMessage}</p>
            </div>
        `;
        messagesContainer.innerHTML = welcomeHTML;
    }

    addMessage(message, isUser = false) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const time = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        const messageHTML = `
            <div class="chatbot-message ${isUser ? 'user' : 'bot'}">
                <div class="message-bubble">${this.escapeHtml(message)}</div>
                <div class="message-time">${time}</div>
            </div>
        `;

        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingHTML = `
            <div class="chatbot-message bot">
                <div class="chatbot-typing active" id="typing-indicator">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.closest('.chatbot-message').remove();
        }
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const sendBtn = document.getElementById('chatbot-send');
        const message = input.value.trim();

        if (!message) return;

        // Disable input while processing
        input.disabled = true;
        sendBtn.disabled = true;

        // Add user message
        this.addMessage(message, true);

        // Add to conversation history
        this.conversationHistory.push({
            role: 'user',
            content: message
        });

        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Send to n8n webhook with conversation history
            const response = await fetch(CHATBOT_CONFIG.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    history: this.conversationHistory
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Hide typing indicator
            this.hideTypingIndicator();

            // Add bot response
            if (data.response) {
                this.addMessage(data.response, false);

                // Add assistant response to conversation history
                this.conversationHistory.push({
                    role: 'assistant',
                    content: data.response
                });

                // Limit conversation history to last 10 messages (5 exchanges)
                if (this.conversationHistory.length > 10) {
                    this.conversationHistory = this.conversationHistory.slice(-10);
                }
            } else {
                throw new Error('No response from chatbot');
            }

        } catch (error) {
            console.error('Chatbot error:', error);
            this.hideTypingIndicator();
            this.addMessage(
                'Sorry, I\'m having trouble connecting right now. Please contact us directly at glondi03@gmail.com or call +39 389 496 6973.',
                false
            );
        } finally {
            // Re-enable input
            input.disabled = false;
            sendBtn.disabled = false;
            input.focus();
        }
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new WebbieCraftChatbot();
    });
} else {
    new WebbieCraftChatbot();
}
