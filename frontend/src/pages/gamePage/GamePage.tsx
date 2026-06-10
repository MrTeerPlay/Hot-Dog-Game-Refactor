import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Game() {
    const navigate = useNavigate();

    const [roomCode, setRoomCode] = useState('');

    // Заглушка
    async function createRoom() {
        navigate('waitroom');
    }

    // Заглушка
    async function joinRoom() {
        navigate(`waitroom/${roomCode}`);
    }

    return (
        <div className="game-page">
            <div className="menu-card">
                <h1> HOT-DOG GAME</h1>
                <h2> Мультиплеєр</h2>
                <button className="primary-btn" onClick={ createRoom }> Створити кімнату </button>
                <div className="divider"> або </div>
                <div className="join-section">
                    <input 
                        placeholder="КОД КІМНАТИ"
                        value={ roomCode }
                        onChange={ e => setRoomCode(e.target.value) }
                    />
                    <button className="secondary-btn" onClick={ joinRoom }> Приєднатися </button>
                </div>
            </div>
        </div>
    );
}