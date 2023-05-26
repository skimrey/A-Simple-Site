import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { signInWithPopup } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { auth, Providers } from '../config/firebase';

function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signOutOnClick = async () => {
    signOut(auth);
    location.reload();
  };

  const signInOnClick = async () => {
    await signInWithPopup(auth, Providers.google);
    location.reload();
  };

  const clicked = () => {
    setIsVisible(false);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-900 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="font-semibold text-xl tracking-tight">
          My Shelf
        </Link>
      </div>
      {user ? (
        <div className="block">
          <div className="text-sm">
            <Button className="p-3 m-1 justify-center">
              <div>
                <Link
                  to="/"
                  onClick={clicked}
                  className="flex place-items-center lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                >
                  Home
                </Link>
              </div>
            </Button>
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
            <Button className="p-3 m-1 justify-center">
              <div>
                <Link
                  to="/"
                  onClick={() => {
                    signOutOnClick();
                  }}
                  className="flex place-items-center lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                >
                  Sign Out
                </Link>
              </div>
            </Button>
          </div>
        </div>
      ) : (
        <div className="block">
          <Button className="p-3 m-1">
            <div>
              <Link
                to="/"
                onClick={() => {
                  signInOnClick();
                }}
                className="flex place-items-center lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Login
              </Link>
            </div>
          </Button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
