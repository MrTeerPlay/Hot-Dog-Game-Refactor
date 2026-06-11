import { Login } from './pages/registerPage/LoginPage';
import { Register } from './pages/registerPage/RegisterPage';
import { Game } from './pages/gamePage/GamePage';
import { WaitRoom } from './pages/gamePage/WaitRoom';
import { ActiveGame } from './pages/gamePage/ActiveGamePage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Navigate to="/login" replace/> }/>

        <Route path='/login' element={ <Login/> }/>
        <Route path='/register' element={ <Register/> }/>

        <Route path='/game' element={ <Game/> }/>

        <Route path='/game/waitroom' element={ <WaitRoom/> }>
          <Route path=':roomCode' element={ <WaitRoom/> }/>
        </Route>

        <Route path='/game/activegame' element={ <ActiveGame/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App