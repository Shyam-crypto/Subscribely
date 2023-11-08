// components/app.js

import { useRouter } from 'next/router';
import Link from 'next/link';

const App = () => {
  const router = useRouter();

  const handleToggle = () => {
    // Toggle between login and register pages
    if (router.pathname === '/login') {
      router.push('/register');
    } else {
      router.push('/login');
    }
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <button onClick={handleToggle}>Toggle</button>
    </div>
  );
};

export default App;
