import './index.css';

const chatAPI = window.chatAPI;

//const debug = document.getElementById("debug");
const statusTxt = document.querySelector("#status");
const connectBtn = document.querySelector(".btn.connect") as HTMLButtonElement;
connectBtn.addEventListener("click", () => {
    chatAPI.connectToWS();
    statusTxt.textContent = 'connected';
    connectBtn.disabled = true;
    disconnectBtn.disabled = false;
});

const disconnectBtn = document.querySelector(".btn.disconnect") as HTMLButtonElement;
disconnectBtn.addEventListener("click", () => {
    chatAPI.disconnectToWS();
    statusTxt.textContent = 'offline';
    namePlaceholder.innerText = '';
    connectBtn.disabled = false;
    disconnectBtn.disabled = true;
});

const chatbox = document.querySelector("#chatbox") as HTMLInputElement;
chatbox.addEventListener('keydown', (e) => {
    if (e.code !== 'Enter') return;
    if (chatbox.value) chatAPI.sendMsg(chatbox.value);
    appendNewMsg(chatbox.value, true);
    chatbox.value = '';
});

chatAPI.onMsgReceived((msgReceived) => {
    appendNewMsg(msgReceived);
});

const msgList = document.getElementById('msg');
function appendNewMsg(msg: string, fromUser?: boolean) {
    const newMsg = document.createElement("p");
    newMsg.innerText = msg;
    if (fromUser) newMsg.classList.add('fromUser');
    msgList.appendChild(newMsg);
}

const namePlaceholder = document.getElementById("namePlaceholder");
chatAPI.onNameSet((name) => {
    console.log('renderer trigered:' + name);
    namePlaceholder.innerText = name;
});
