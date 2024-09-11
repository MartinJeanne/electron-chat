import './index.css';

const chat = window.chat;

//const debug = document.getElementById("debug");
const button = document.getElementById("connect");
const chatbox = document.querySelector("#chatbox") as HTMLInputElement;
chatbox.addEventListener("keydown", (e) => {
    if (e.code !== 'Enter') return;
    if (chatbox.value) chat.send(chatbox.value);
    chatbox.value = '';
});

console.log('👋 This message is being logged by "renderer.ts", included via Vite');
