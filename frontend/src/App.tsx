import { Login } from './pages/registerPage/LoginPage';
import { Register } from './pages/registerPage/RegisterPage';
import { Game } from './pages/gamePage/GamePage';
import { WaitRoom } from './pages/gamePage/WaitRoom';
import { ActiveGame } from './pages/gamePage/ActiveGamePage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// 1. Тип сторінки (змінна)
// 2. Головний метод (виконується при старті один раз, а потім при змнні даних проходиться по коду ще раз)
// 3. Методи, які показують вигляд сторінки логіну чи реєстрації
// Методи мають щось повертати (повертають свою "дію з сайтом"/вигляд сайту)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Navigate to="/login" replace/> }/>

        <Route path='/login' element={ <Login/> }/>
        <Route path='/register' element={ <Register/> }/>

        <Route path='/game' element={ <Game/> }/>

        <Route path='/game/waitroom/:roomCode' element={ <WaitRoom/> }/>
        <Route path='/game/waitroom' element={ <WaitRoom/> }/>

        <Route path='/game/activegame' element={ <ActiveGame/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App