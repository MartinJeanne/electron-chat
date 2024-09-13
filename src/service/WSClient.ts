import { BrowserWindow } from 'electron';
import { WebSocket } from 'ws';

export default class WSClient {
    private wsURL: string;
    private ws: WebSocket | null;
    private name: string;

    constructor(url?: string) {
        this.wsURL = url ? url : 'ws://linkstart.club:8080';
        this.ws = null;
        this.name = '';
    }

    connect(window: BrowserWindow) {
        if (this.ws) this.ws.terminate();
        this.ws = new WebSocket(this.wsURL);
        
        this.ws.on('error', console.error);

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
        if (this.ws) this.ws.terminate();
        this.ws = null;
        this.name = '';
    }

    send(msg: string) {
        if (this.ws) this.ws.send(msg);
    }

    stop() {
        if (this.ws) this.ws.terminate();
    }
}
