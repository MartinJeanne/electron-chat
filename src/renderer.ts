import './index.css';

const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`

console.log('👋 This message is being logged by "renderer.ts", included via Vite');
