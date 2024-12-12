import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Layout from './layouts/layout';
import Register from './pages/register';
import SignIn from './pages/sign-in';
import AddHotel from './pages/add-hotel';
import { useAppContext } from './contexts/app-context';
import MyHotels from './pages/my-hotels';
import EditHotel from './pages/edit-hotel';
import Search from './pages/search';
import HotelDetail from './pages/hotel-detail';
import Booking from './pages/booking';
import MyBookings from './pages/my-bookings';
import HomePage from './pages/home';

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />

        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />

        <Route
          path="/hotel-detail/:hotelId"
          element={
            <Layout>
              <HotelDetail />
            </Layout>
          }
        />

        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />

        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />

            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />

            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />

            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />

            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
