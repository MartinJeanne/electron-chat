import { BrowserWindow } from 'electron';
import { WebSocket } from 'ws';

export default class WSClient {
    private ws: WebSocket;

    constructor(url?: string) {
        const wsUrl = url ? url : 'ws://localhost:8080';

        const ws = new WebSocket(wsUrl);
        ws.on('error', console.error);
        this.ws = ws;
    }

    connect(window: BrowserWindow) {
        this.ws.on('open', () => {
            console.log('Connected!');
        });

        this.ws.on('message', data => {
            console.log(data.toString());
            window.webContents.send('msg-received', data.toString());
        });
    }

    send(msg: string) {
        this.ws.send(msg);
    }

    stop() {
        this.ws.terminate();
    }
}
