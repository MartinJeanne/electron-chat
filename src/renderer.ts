import './index.css';

const information = document.getElementById('info');
if (information) {
    information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`;
}

//const debug = document.getElementById("debug");
const button = document.getElementById("connect");
const chatbox = document.querySelector("#chatbox") as HTMLInputElement;
chatbox.addEventListener("keydown", (e) => {
    if (e.code !== 'Enter') return;
    if (chatbox.value) window.versions.send(chatbox.value);
    chatbox.value = '';
});

console.log('👋 This message is being logged by "renderer.ts", included via Vite');
