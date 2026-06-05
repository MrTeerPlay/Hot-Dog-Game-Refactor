export function Register({onClick_}: {onClick_: () => void}) {
  return (
    <div>
      <h1>Реєстрація</h1>
      <input placeholder="Нікнейм" />
      <input placeholder="Email" />
      <input placeholder="Пароль" type="password" />
      <button>Зареєструватись</button>
      <p>Вже є акаунт? <span onClick={onClick_}>Увійти</span></p>
    </div>
  )
}