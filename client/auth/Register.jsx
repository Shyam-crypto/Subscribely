import { useState } from 'react';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
  
    router.push('/');
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default Register;
