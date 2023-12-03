import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/auth.module.css';

const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    
    router.push('/');
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <form>
        <label htmlFor="email">
          Email:
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
