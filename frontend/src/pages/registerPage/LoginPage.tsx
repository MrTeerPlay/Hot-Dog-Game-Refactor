import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connectSocket } from '../../socket';

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    const responce = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await responce.json();

    console.log('Відповідь від сервера:', data.message)

    if (!data.error && responce.ok)
    {
      sessionStorage.setItem('authToken', data.token);
      sessionStorage.setItem('username', data.username);
      sessionStorage.setItem('userid', data.userid);

      connectSocket(data.token);

      navigate('/game');
    }
  }

  return (
    <div className="auth-page">
      <div className="form-container">
        <h1>Логін</h1>
        <input 
          placeholder="Email" 
          value = { email }
          onChange={ e => setEmail(e.target.value) }
        />
        <input 
          placeholder="Пароль" 
          type="password" 
          value = { password }
          onChange={ e => setPassword(e.target.value) }
        />
        <button onClick={ handleLogin }>Увійти</button>
        <p>Ще не має аккаунта? <span onClick={ () => navigate('/register') }>Зареєструватись</span></p>
        </div>
    </div>
  );
}