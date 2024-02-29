import React, { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import styles from './login.module.scss';
import HomeHeader from '../../components/Layout/HomeHeader';

const Login = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <>
      <HomeHeader />
      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <h1>Login</h1>
          <div className={styles.formContent}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
              />
            </div>
            <button
              type="submit"
              className={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <a href="#" className={styles.forgotPassword}>
              Forgot Username or Password
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
