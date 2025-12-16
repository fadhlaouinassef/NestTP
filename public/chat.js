const socket = io('http://localhost:3001');

// Log de connexion pour debug
socket.on('connect', () => {
    console.log('✅ Connecté au serveur WebSocket');
});

socket.on('connect_error', (error) => {
    console.error('❌ Erreur de connexion:', error);
});

socket.on('receive_message', (msg) => {
    console.log('📩 Message reçu:', msg);
    const messagesDiv = document.getElementById('messages');
    const div = document.createElement('div');
    div.innerText = `${msg.content} (${new Date(msg.date).toLocaleString()})`;
    messagesDiv.appendChild(div);
});

document.getElementById('send').addEventListener('click', () => {
    const content = document.getElementById('content').value;
    if (content.trim()) {
        console.log('📤 Envoi du message:', content);
        socket.emit('send_message', { content });
        document.getElementById('content').value = '';
    }
});

// Permettre d'envoyer avec la touche Entrée
document.getElementById('content').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('send').click();
    }
});
