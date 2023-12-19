import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/auth.module.css';
import { axiosInstance } from '../../configs/axios'; 

const Register = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert('Please enter required fields');
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

    try {
      const userData = { name, email, password };
      const responseData = await axiosInstance({
        method: 'POST',
        url: '/api/auth/register',
        data: userData
      });

      console.log('Registration successful:', responseData);

      // Redirect to another page or perform other actions after successful registration
      //router.push('/');
    } catch (error) {
      // Handle registration error
      console.error('Registration error:', error);
      alert('Error registering user. Please try again.');
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <form>
        <label htmlFor='name'>
          Name:
          <input type='name' id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
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
