import { Link } from 'react-router-dom';

import { useAppContext } from '../contexts/app-context';
import SignOutButton from './sign-out-button';

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="bg-sky-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-xl text-white font-bold tracking-tight md:text-3xl">
          <Link to="/">chillax.com</Link>
        </span>

        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-bookings"
                className="text-sm text-center flex items-center text-white px-3 font-bold hover:bg-sky-600 md:text-base"
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="text-sm text-center flex items-center text-white px-3 font-bold hover:bg-sky-600 md:text-base"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="text-sm flex bg-white rounded-md items-center text-sky-600 px-3 font-bold hover:bg-gray-100 md:text-base"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </header>
  );
};

export default Header;
