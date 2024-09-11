import { contextBridge, ipcRenderer } from 'electron'

declare global {
    interface Window {
        chatAPI: {
            send: (msg: string) => void;
            onMsgReceived: (callback: (msg: string) => void) => void;
            onNameSet: (callback: (name: string) => void) => void;
        };
    }
}

contextBridge.exposeInMainWorld('chatAPI', {
    send: (msg: string) => ipcRenderer.invoke('send', msg),

    onMsgReceived: (callback: (msg: string) => void) => {
        ipcRenderer.on('msg-received', (_event, msg) => callback(msg))
    },
    
    onNameSet: (callback: (name: string) => void) => {
        ipcRenderer.on('name-set', (_event, name) => callback(name))
    }
});
