import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../../socket";

type Player = {
    id: string,
    username: string,
    isHost: boolean,
    isReady: boolean
}

export function WaitRoom() {
    const navigate = useNavigate();

    const { roomCode = "?????" } = useParams();
    const [maxPlayers, setMaxPlayers] = useState('2');
    const [players, setPlayers] = useState<Player[]>([]);
    
    const myUsername = sessionStorage.getItem('username')!;
    let sessionMaxPlayers = '2';

    useEffect(() => {
        if (!socket) 
        {
            console.log(`Сокет не підключено`);
            return ;
        }

        if(roomCode == "?????") 
        {
            socket.emit('menu:createWaitRoom', {}, (response: { status: string, roomCode: string }) => {
                if(response.status == 'ok') 
                {
                    navigate(`waitroom/${response.roomCode}`, { replace: true });
                } 
                else 
                {
                    console.log(`error: ${response.status}`);
                }
            });

            return;
        }

        socket.emit('waitroom:createdWaitRoom', {}, (response: { status: string, data: { roomCode: string, players: Player[] } }) => {
            if(response.status === 'ok') 
            {
                setPlayers(response.data.players);
            }
        });

    }, [navigate]);

    useEffect (() => {
        if (!socket) 
        {
            console.log(`Сокет не підключено`);
            return ;
        }

        socket.on('wait:readychanged', (data) => ReadyChanged(data));

        return () => {
            socket?.off('wait:readychanged', (data) => ReadyChanged(data));
        };
    }, []);

    async function StartGame() {
        navigate('/game/activegame');
    }

    async function ReadyChange() {
        if(!socket) 
        {
            console.log(`Сокет не підключено`);
            return; 
        }

        socket.emit('wait:readychange');
    }

    async function MaxPlayersChanged() {
        if (sessionMaxPlayers == maxPlayers) {
            return;
        }

        if (!socket){
            console.log(`Сокет не підключено`);
            return;
        }

        console.log('Максимальна кількість гравців змінюється...');
        sessionMaxPlayers = maxPlayers;
        socket.emit('wait:max-players-change', { data: { sessionMaxPlayers } });
    }

    function ClientOrNo(username: string): string {
        if(username === myUsername)
        {
            return '(Ви) ';
        }

        return '';
    }

    function ReadyChanged(data: { userId: string, isReady: boolean }) {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                (player.id === data.userId) ? { ...player, isReady: data.isReady } : player
        ));
    }

     return (
        <div className="game-page">
            <div className="lobby-card">
                <h2>Кімната очікування</h2>
                
                <div className="room-code-display">
                    <span>КОД:</span>
                    <strong>{roomCode}</strong> 
                </div>

                <div className="players-list-container">
                    <h3>Гравці:</h3>
                    <ul id="players-list">
                        {players.map((player) => (
                            <li key={player.id} data-nickname={player.username} >
                                {player.username} { ClientOrNo(player.username) }{player.isHost && "(Хост)"}
                                <span className={player.isReady ? 'status-ready' : 'status-waiting'}>
                                    &nbsp; {player.isReady ? 'Готовий' : 'Очікування'}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lobby-actions">
                    <button id="btn-cheats-select" className="secondary-btn hidden" style={{marginTop: "10px", borderColor: "#ff9800", color: "#ff9800"}}>
                        Чит Меню (WIP)
                    </button>

                    <div id="lobby-settings"> 
                        <label className="slider-label">
                            Кількість гравців: <span id="lobby-slider-val">{maxPlayers}</span>
                        </label>
                        <input type="range" id="lobby-slider" min="2" max="4" defaultValue="2" className="styled-slider" onChange={ e => setMaxPlayers(e.target.value) } onPointerUp={ MaxPlayersChanged }/>
                    </div>

                    <button id="btn-start-game" className="primary-btn hidden" onClick={ StartGame }>Почати гру</button>
                    
                    <p id="waiting-text" className="hidden">Очікуємо готовність гравців...</p>

                    <button id="btn-ready" className="ready-btn" onClick={ ReadyChange }>Я ГОТОВИЙ</button>

                    <button id="btn-back-lobby" className="secondary-btn" style={{marginTop: "10px"}}>Назад в меню</button>
                </div>
            </div>
        </div>
    );
}