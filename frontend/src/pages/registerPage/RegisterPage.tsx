import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    const responce = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    const data = await responce.json();

    console.log('Відповідь від сервера:', data)
}

  return (
    <div className="auth-page">
      <div className="form-container">
        <h1>Реєстрація</h1>
        <input 
          placeholder="Нікнейм"
          value = { username }
          onChange={ e => setUsername(e.target.value) }
        />
        <input 
          placeholder="Email" 
          value = {email}
          onChange={ e => setEmail(e.target.value) }
        />
        <input 
          placeholder="Пароль" 
          type="password" 
          value = { password }
          onChange={ e => setPassword(e.target.value) }
        />
        <button onClick={ handleRegister }>Зареєструватись</button>
        <p>Вже є акаунт? <span onClick={ () => navigate('/login') }>Увійти</span></p>
      </div>
    </div>
  );
}