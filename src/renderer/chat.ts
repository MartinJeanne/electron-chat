const chatAPI = window.chatAPI;

const chatbox = document.querySelector('#chatbox') as HTMLInputElement;
const msgList = document.querySelector('#msgList');

export default function setUpChat() {
    window.addEventListener('keydown', (e) => {
        chatbox.focus();
    });

    chatbox.addEventListener('keydown', (e) => {
        if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
        if (chatbox.value) chatAPI.sendMsg(chatbox.value);
        appendNewMsg(chatbox.value, 'fromUser');
        chatbox.value = '';
        chatbox.focus();
    });

    chatAPI.onMsgReceived((msgReceived) => {
        appendNewMsg(msgReceived, 'fromOther');
    });

    function appendNewMsg(msg: string, from: string) {
        if (!msgList) throw new Error('msgList not found');

        const newMsg = document.createElement('p');
        newMsg.innerText = msg;
        newMsg.classList.add('msg');
        newMsg.classList.add(from);
        msgList.appendChild(newMsg);
        msgList.scrollTop = msgList.scrollHeight;
    }
}
