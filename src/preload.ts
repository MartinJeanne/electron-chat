import { contextBridge, ipcRenderer } from 'electron'

declare global {
    interface Window {
        chatAPI: {
            send: (msg: string) => void;
            onMsgReceived: (callback: (n: string) => void) => void;
        };
    }
}

contextBridge.exposeInMainWorld('chatAPI', {
    send: (msg: string) => ipcRenderer.invoke('send', msg),

    onMsgReceived: (callback: (msg: string) => void) => {
        ipcRenderer.on('msg-received', (_event, msg) => callback(msg))
    }
});
