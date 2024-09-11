import { contextBridge, ipcRenderer } from 'electron'

declare global {
    interface Window {
        versions: {
            node: () => string;
            chrome: () => string;
            electron: () => string;
            send: (msg: string) => void;
        };
    }
}

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    send: (msg: string) => ipcRenderer.invoke('send', msg)
});
