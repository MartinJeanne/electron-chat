import { contextBridge, ipcRenderer } from 'electron'

declare global {
    interface Window {
        chatAPI: {
            connectToWS: () => void;
            disconnectToWS: () => void;
            sendMsg: (msg: string) => void;
            onMsgReceived: (callback: (msg: string) => void) => void;
            onNameSet: (callback: (name: string) => void) => void;
        };
    }
}

contextBridge.exposeInMainWorld('chatAPI', {
    connectToWS: () => ipcRenderer.invoke('connect-to-ws'),

    disconnectToWS: () => ipcRenderer.invoke('disconnect-to-ws'),

    sendMsg: (msg: string) => ipcRenderer.invoke('send-msg', msg),

    onMsgReceived: (callback: (msg: string) => void) => {
        ipcRenderer.on('msg-received', (_event, msg) => callback(msg))
    },
    
    onNameSet: (callback: (name: string) => void) => {
        ipcRenderer.on('name-set', (_event, name) => callback(name))
    }
});
