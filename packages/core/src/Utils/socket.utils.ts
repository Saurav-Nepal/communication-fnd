const { io: SOCKET } = require('socket.io-client');

let socket: any;
const socketUrlMap: any = {};

export function ConnectSocket(url: string) {
    if (socketUrlMap[url] && socketUrlMap[url]?.connected) {
        return socketUrlMap[url].socket;
    }

    socket = SOCKET(url, { transports: ['websocket'] });
    socketUrlMap[url] = socket;
    return socket;
}

export function EmitEvent(eventName: any, data: any, Socket = socket) {
    return Socket && Socket.emit && Socket.emit(eventName, data);
}

export function ListenEvent(eventName: any, callback: any, Socket = socket) {
    return Socket.on(eventName, callback);
}

export function OnDisconnect(callback = () => {}) {
    socket.on('disconnect', callback);
}

export function Disconnect(Socket = socket) {
    return isConnected(Socket) && Socket.emit('disconnect');
}

export function DisconnectSocket(Socket = socket) {
    return Socket && Socket.disconnect();
}

/**
 * testing function
 * @param {*} Socket
 */
export function isConnected(Socket = socket) {
    return Socket?.connected;
}
