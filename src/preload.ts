import { contextBridge, ipcRenderer } from 'electron'

declare global {
    interface Window {
        chat: {
            send: (msg: string) => void;
        };
    }
}

contextBridge.exposeInMainWorld('chat', {
    send: (msg: string) => ipcRenderer.invoke('send', msg)
});
