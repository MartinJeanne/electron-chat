import './index.css';

const chatAPI = window.chatAPI;

//const debug = document.getElementById("debug");
const button = document.getElementById("connect");
const chatbox = document.querySelector("#chatbox") as HTMLInputElement;
chatbox.addEventListener("keydown", (e) => {
    if (e.code !== 'Enter') return;
    if (chatbox.value) chatAPI.send(chatbox.value);
    appendNewMsg(chatbox.value, true);
    chatbox.value = '';
});

chatAPI.onMsgReceived((msgReceived) => {
    appendNewMsg(msgReceived);
});

const msgList = document.getElementById("msg");
function appendNewMsg(msg: string, fromUser?: boolean) {
    const newMsg = document.createElement("p");
    newMsg.innerText = msg;
    if (fromUser) newMsg.classList.add('fromUser');
    msgList.appendChild(newMsg);
}
