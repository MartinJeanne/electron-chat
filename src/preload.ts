import { contextBridge } from 'electron'

declare global {
    interface Window {
        versions: {
            node: () => string;
            chrome: () => string;
            electron: () => string;
        };
    }
}

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
    // we can also expose variables, not just functions
});
