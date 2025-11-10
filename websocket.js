// websocket.js
export class WSClient {
  constructor(url, handlers) {
    this.socket = new WebSocket(url);
    this.handlers = handlers;

    this.socket.addEventListener('open', () => {
      console.log('[WS] Connected');
    });

    this.socket.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (this.handlers[msg.type]) this.handlers[msg.type](msg);
    });

    this.socket.addEventListener('close', () => console.log('[WS] Disconnected'));
  }

  send(type, payload) {
    this.socket.send(JSON.stringify({ type, ...payload }));
  }
}
