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
    const [players, setPlayers] = useState<Player[]>([]);
    
    const myUsername = sessionStorage.getItem('username')!;

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

        socket.emit('waitroom:createdWaitRoom', {}, (response: { status: string, data: { roomCode: string, players: Player[] }}) => {
            if(response.status === 'ok') 
            {
                setPlayers(response.data.players);
            }
        });

    }, [navigate]);

    async function StartGame() {
        navigate('/game/activegame');
    }

    function ClientOrNo(username: string): string {
        if(username === myUsername)
        {
            return '(Ви) ';
        }

        return '';
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
                                {player.username} {ClientOrNo(player.username)}{player.isHost && "(Хост)"}
                                <span>
                                    &nbps; {player.isReady ? 'Готовий' : 'Очікування'}
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
                            Кількість гравців: <span id="lobby-slider-val">2</span>
                        </label>
                        <input type="range" id="lobby-slider" min="2" max="4" defaultValue="2" className="styled-slider" />
                    </div>

                    <button id="btn-start-game" className="primary-btn hidden" onClick={ StartGame }>Почати гру</button>
                    
                    <p id="waiting-text" className="hidden">Очікуємо готовність гравців...</p>

                    <button id="btn-ready" className="ready-btn" onClick={ StartGame }>Я ГОТОВИЙ</button>

                    <button id="btn-back-lobby" className="secondary-btn" style={{marginTop: "10px"}}>Назад в меню</button>
                </div>
            </div>
        </div>
    );
}