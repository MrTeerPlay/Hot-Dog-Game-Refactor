import { io, Socket } from 'socket.io-client';

export let socket: Socket | null = null;

export const connectSocket = (token: string) => {
    if (socket?.connected) {
        return;
    }

    socket = io('http://localhost:3000', {
        auth: { token } // Передаємо токен для твого WsAuthGuard
    });

    socket.on('connect', () => {
        console.log('Підключено до WebSocket сервера. ID:', socket?.id);
    });

    socket.on('disconect', (reason) => {
        console.log('Відключено:', reason);
    });
}

export const disconectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}