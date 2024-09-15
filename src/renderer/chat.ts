const chatAPI = window.chatAPI;

const chatbox = document.querySelector('#chatbox') as HTMLInputElement;
const msgList = document.querySelector('#msgList');

export default function setUpChat() {
    window.addEventListener('keydown', () => {
        chatbox.focus();
    });

    chatbox.addEventListener('keydown', (e) => {
        if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
        if (!chatbox.value || chatbox.value.trim() === '') return;

        chatAPI.sendMsg(chatbox.value);
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

        const msgParent = document.createElement('div');
        msgParent.classList.add('msgParent');
        msgParent.appendChild(newMsg);
        msgParent.classList.add(from);

        msgList.appendChild(msgParent);
        msgList.scrollTop = msgList.scrollHeight;
    }
}
