import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import { signInWithPopup } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { auth, Providers } from '../config/firebase';
import { User } from 'firebase/auth';

function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signOutOnClick = async () => {
    await signOut(auth);
    setUser(null);
  };

  const signInOnClick = async () => {
    const response = await signInWithPopup(auth, Providers.google);
    if (response.user) {
      setUser(response.user);
    }
  };

  const isHomeRoute = location.pathname === '/';

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-900 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="font-semibold text-xl tracking-tight">
          My Shelf
        </Link>
      </div>
      <div className="text-sm">
        {!isHomeRoute && (
          <Button className="p-3 m-1 justify-center">
            <div>
              <Link
                to="/"
                className="flex place-items-center lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Home
              </Link>
            </div>
          </Button>
        )}
        {user && (
          <Button className="p-3 m-1 justify-center">
            <div>
              <Link
                to="/dashboard"
                className="flex place-items-center lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Dashboard
              </Link>
            </div>
          </Button>
        )}
        {user ? (
          <Button className="p-3 m-1 justify-center" onClick={signOutOnClick}>
            <div>
              <Link
                to="/"
                className="flex place-items-center lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Sign Out
              </Link>
            </div>
          </Button>
        ) : (
          <Button className="p-3 m-1 justify-center" onClick={signInOnClick}>
            <div>
              <Link
                to="/"
                className="flex place-items-center lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Login
              </Link>
            </div>
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
