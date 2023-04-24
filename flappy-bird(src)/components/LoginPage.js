import React from 'react';

const LoginPage = () => {
  return (
    <div>
      <h2>Вход</h2>
      <form>
        <label htmlFor="username">Имя пользователя:</label>
        <input type="text" id="username" name="username" required />
        <br />
        <label htmlFor="password">Пароль:</label>
        <input type="password" id="password" name="password" required />
        <br />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;
