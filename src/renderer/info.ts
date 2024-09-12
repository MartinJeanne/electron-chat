const chatAPI = window.chatAPI;

const connectBtn = document.querySelector('.btn.connect') as HTMLButtonElement;
const disconnectBtn = document.querySelector('.btn.disconnect') as HTMLButtonElement;
const statusTxt = document.querySelector('#status') as HTMLParagraphElement;
const namePlaceholder = document.getElementById('namePlaceholder') as HTMLParagraphElement;
const chatbox = document.querySelector('#chatbox') as HTMLInputElement;

export default function setUpInfo() {
    chatAPI.onNameSet((name) => {
        if (!namePlaceholder) throw new Error('namePlaceholder not found');

        console.log('renderer trigered:' + name);
        namePlaceholder.innerText = name;
    });

    connectBtn.addEventListener('click', () => {
        chatAPI.connectToWS();
        statusTxt.textContent = 'connected';
        connectBtn.disabled = true;
        disconnectBtn.disabled = false;
        chatbox.disabled = false;
    });

    disconnectBtn.addEventListener('click', () => {
        chatAPI.disconnectToWS();
        statusTxt.textContent = 'offline';
        namePlaceholder.innerText = '';
        connectBtn.disabled = false;
        disconnectBtn.disabled = true;
        chatbox.disabled = true;
    });
}
