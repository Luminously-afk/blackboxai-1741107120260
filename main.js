document.addEventListener('DOMContentLoaded', () => {
    const inboxId = getQueryParams().id;
    
    if (!inboxId) {
        showLandingView();
    } else {
        showInboxView(inboxId);
    }
});

// Utility Functions
function generateUniqueId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function getQueryParams() {
    const params = {};
    new URLSearchParams(window.location.search).forEach((value, key) => {
        params[key] = value;
    });
    return params;
}

function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.classList.remove('translate-y-full');
    
    setTimeout(() => {
        toast.classList.add('translate-y-full');
    }, duration);
}

// View Management
function showLandingView() {
    document.getElementById('landing-view').classList.remove('hidden');
    document.getElementById('inbox-view').classList.add('hidden');
    
    document.getElementById('create-inbox').addEventListener('click', () => {
        const newInboxId = generateUniqueId();
        window.location.href = `${window.location.pathname}?id=${newInboxId}`;
    });
}

function showInboxView(inboxId) {
    document.getElementById('landing-view').classList.add('hidden');
    document.getElementById('inbox-view').classList.remove('hidden');
    
    setupInboxUrl(inboxId);
    setupMessageForm(inboxId);
    loadAndRenderMessages(inboxId);
}

// Inbox Management
function setupInboxUrl(inboxId) {
    const inboxUrl = `${window.location.origin}${window.location.pathname}?id=${inboxId}`;
    const inboxUrlInput = document.getElementById('inbox-url');
    inboxUrlInput.value = inboxUrl;
    
    document.getElementById('copy-url').addEventListener('click', () => {
        inboxUrlInput.select();
        document.execCommand('copy');
        showToast('Inbox URL copied to clipboard!');
    });
}

function setupMessageForm(inboxId) {
    const form = document.getElementById('message-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const messageText = document.getElementById('message-text').value.trim();
        const spotifyUrl = document.getElementById('spotify-url').value.trim();
        
        if (!messageText) {
            showToast('Please enter a message');
            return;
        }
        
        const message = {
            text: messageText,
            timestamp: new Date().toISOString(),
            spotifyUrl: parseSpotifyUrl(spotifyUrl)
        };
        
        saveMessage(inboxId, message);
        form.reset();
        loadAndRenderMessages(inboxId);
        showToast('Message sent successfully!');
    });
}

function parseSpotifyUrl(url) {
    if (!url) return null;
    
    // Handle different Spotify URL formats
    const trackIdMatch = url.match(/track\/([a-zA-Z0-9]+)/);
    if (!trackIdMatch) {
        showToast('Invalid Spotify URL format');
        return null;
    }
    
    return `https://open.spotify.com/embed/track/${trackIdMatch[1]}`;
}

// Message Management
function saveMessage(inboxId, message) {
    try {
        const messages = loadMessages(inboxId);
        messages.unshift(message); // Add new message at the beginning
        localStorage.setItem(`inbox_${inboxId}`, JSON.stringify(messages));
    } catch (error) {
        console.error('Error saving message:', error);
        showToast('Error saving message. Please try again.');
    }
}

function loadMessages(inboxId) {
    try {
        const messages = localStorage.getItem(`inbox_${inboxId}`);
        return messages ? JSON.parse(messages) : [];
    } catch (error) {
        console.error('Error loading messages:', error);
        return [];
    }
}

function loadAndRenderMessages(inboxId) {
    const messages = loadMessages(inboxId);
    const container = document.getElementById('messages-container');
    
    if (messages.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-gray-500">
                <i class="fas fa-inbox text-4xl mb-4"></i>
                <p>No messages yet. Share your inbox URL to receive messages!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = messages.map((message, index) => `
        <div class="bg-white rounded-lg shadow-md p-6 mb-4 transform transition hover:scale-101">
            <div class="mb-4">
                <p class="text-gray-800 text-lg">${message.text}</p>
                <p class="text-gray-500 text-sm mt-2">
                    <i class="far fa-clock mr-1"></i>
                    ${new Date(message.timestamp).toLocaleString()}
                </p>
            </div>
            ${message.spotifyUrl ? `
                <div class="mt-4">
                    <iframe src="${message.spotifyUrl}" 
                            width="100%" 
                            height="80" 
                            frameborder="0" 
                            allowtransparency="true" 
                            allow="encrypted-media">
                    </iframe>
                </div>
            ` : ''}
        </div>
    `).join('');
}
