import { useState } from 'react';
import { Login } from './pages/LoginPage';
import { Register } from './pages/RegisterPage';

// 1. Тип сторінки (змінна)
// 2. Головний метод (виконується при старті один раз, а потім при змнні даних проходиться по коду ще раз)
// 3. Методи, які показують вигляд сторінки логіну чи реєстрації
// Методи мають щось повертати (повертають свою "дію з сайтом"/вигляд сайту)

type ScreenType = 'register' | 'login';

function App() {
  const [screen, setScreen] = useState<ScreenType>('login');

  if(screen == 'login'){
    return <Login onChange={() => setScreen('register')}/>
  }

  return <Register onChange={() => setScreen('login')}/>;
}

export default App