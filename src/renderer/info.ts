const chatAPI = window.chatAPI;

const connectBtn = document.querySelector('.btn.connect') as HTMLButtonElement;
const disconnectBtn = document.querySelector('.btn.disconnect') as HTMLButtonElement;
const namePlaceholder = document.getElementById('namePlaceholder') as HTMLParagraphElement;
const chatbox = document.querySelector('#chatbox') as HTMLInputElement;

export default function setUpInfo() {
    chatAPI.onNameSet((name) => {
        if (!namePlaceholder) throw new Error('namePlaceholder not found');

        console.log('renderer trigered:' + name);
        namePlaceholder.innerText = `Your name is: ${name}`;
    });

    connectBtn.addEventListener('click', () => {
        chatAPI.connectToWS();
        switchStatus();
    });

    disconnectBtn.addEventListener('click', () => {
        chatAPI.disconnectToWS();
        switchStatus();
    });
}

function switchStatus() {
    const connected = disconnectBtn.disabled;

    connectBtn.disabled = connected;
    disconnectBtn.disabled = !connected;
    chatbox.disabled = !connected;
    if (!connected) {
        connectBtn.textContent = 'Connect';
        disconnectBtn.textContent = 'Disconnected';
        namePlaceholder.innerText = '';
    } else {
        connectBtn.textContent = 'Connected';
        disconnectBtn.textContent = 'Disconnect';
    }
}
