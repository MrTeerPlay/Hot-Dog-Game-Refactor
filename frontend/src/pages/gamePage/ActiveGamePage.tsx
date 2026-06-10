

export function ActiveGame() {


    return (
        <div className="game-page">
            <div id="game-board">
                {/* Модалка переможця */}
                <div id="game-over-modal" className="hidden">
                    <div className="modal-content">
                        <h2 id="game-over-title">Гру завершено!</h2>
                        <p id="game-over-winner" className="winner-text"></p>
                        <button id="btn-exit-to-menu" className="primary-btn" style={{marginTop: "20px"}}>Повернутися в меню</button>
                    </div>
                </div>

                <button id="btn-back-game" className="exit-btn">Вийти</button>

                {/* Місця опонентів */}
                <div id="seat-left" className="opponent-seat" style={{display: 'none'}}></div>
                <div id="seat-top" className="opponent-seat" style={{display: 'none'}}></div>
                <div id="seat-right" className="opponent-seat" style={{display: 'none'}}></div>

                {/* Модалка інформації */}
                <div id="info-modal" className="hidden">
                    <div className="modal-content">
                        <span id="modal-close" className="close-btn">&times;</span>
                        <h2 id="modal-title">Заголовок</h2>
                        <ul id="modal-list"></ul>
                    </div>
                </div>

                <div id="score-board">
                    🌭 Рахунок: <span id="score-value">0</span>
                </div>

                <div id="discard-pile">🗑️ Скинути</div>
                <div id="deck">КОЛОДА</div>
                <div id="player-hand"></div>
            </div>

            {/* Модалка вибору */}
            <div id="selection-modal" className="hidden">
                <div className="modal-content">
                    <span id="selection-close" className="close-btn">&times;</span>
                    <h2 id="selection-title">Зробіть вибір</h2>
                    <ul id="selection-list"></ul>
                </div>
            </div>
        </div>
    );
}