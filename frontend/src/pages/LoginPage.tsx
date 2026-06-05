export function Login({onClick_}: {onClick_: () => void}) {
  return (
    <div>
      <h1>Логін</h1>
      <input placeholder="Email" />
      <input placeholder="Пароль" type="password" />
      <button>Увійти</button>
      <p>Ще не має аккаунта? <span onClick={onClick_}>Зареєструватись</span></p>
    </div>
  )
}