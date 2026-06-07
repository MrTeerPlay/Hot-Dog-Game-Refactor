import { useState } from 'react';

export function Login({onChange}: {onChange: () => void}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        const responce = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await responce.json();

        console.log('Відповідь від сервера:', data)
    }

  return (
    <div>
      <h1>Логін</h1>
      <input 
        placeholder="Email" 
        value = {email}
        onChange={e => setEmail(e.target.value)}
       />
      <input 
        placeholder="Пароль" 
        type="password" 
        value = {password}
        onChange={e => setPassword(e.target.value)}
       />
      <button onClick={handleLogin}>Увійти</button>
      <p>Ще не має аккаунта? <span onClick={onChange}>Зареєструватись</span></p>
    </div>
  )
}