import { useNavigate, useParams } from "react-router-dom";

export function WaitRoom() {
    const navigate = useNavigate();

    const { roomCode = "?????" } = useParams();

    async function StartGame() {
        navigate('/game/activegame');
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
                        {/* Тут буде динамічний список гравців */}
                        <li data-nickname="Гравець 1">
                            Гравець 1 (Ви) (Хост) 
                            <span className="status-ready">&nbsp; Готовий</span>
                        </li>
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