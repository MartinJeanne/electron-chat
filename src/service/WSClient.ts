import { BrowserWindow } from 'electron';
import { WebSocket } from 'ws';

export default class WSClient {
    private ws: WebSocket;
    private name: string;

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
            console.log(this.name);
            if (!this.name) {
                const regex = /Your name is: (\w+)/;
                const match = data.toString().match(regex);
                if (match) this.name = match[1];
                else this.name = 'unamed';
                window.webContents.send('name-set', this.name);
            }
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
