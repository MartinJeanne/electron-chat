import { BrowserWindow } from 'electron';
import { WebSocket } from 'ws';

export default class WSClient {
    private wsURL: string;
    private ws: WebSocket;
    private name: string;

    constructor(url?: string) {
        this.wsURL = url ? url : 'ws://localhost:8080';
    }

    connect(window: BrowserWindow) {
        const ws = new WebSocket(this.wsURL);
        ws.on('error', console.error);
        this.ws = ws;

        this.ws.on('open', () => {
            console.log('Connected!');
        });

        this.ws.on('message', data => {
            console.log(data.toString());
            if (!this.name || this.name === '') {
                const regex = /Your name is: ([\w\s]+)/;
                const match = data.toString().match(regex);
                if (match) this.name = match[1];
                else this.name = 'unamed';
                window.webContents.send('name-set', this.name);
                return;
            }
            window.webContents.send('msg-received', data.toString());
        });
    }

    disconnect() {
        this.ws.terminate();
        this.name = '';
    }

    send(msg: string) {
        this.ws.send(msg);
    }

    stop() {
        this.ws.terminate();
    }
}
