import { useQuery } from 'react-query';
import * as apiClient from '../api-client';

const MyBookings = () => {
  const { data: hotelBookings } = useQuery(
    'fetchMyBookings',
    apiClient.fetchMyBookings
  );

  if (!hotelBookings || hotelBookings.length === 0) {
    return <span>No bookings found</span>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-sm font-bold lg:text-3xl">My Bookings</h1>
      {hotelBookings.map((hotelBooking) => (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
          <div className="lg:w-full lg:h-[250px]">
            <img
              src={hotelBooking.imageUrls[0]}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-sm font-bold md:text-2xl">
              {hotelBooking.name}
              <div className="text-xs font-normal">
                {hotelBooking.city}, {hotelBooking.country}
              </div>
            </div>

            {hotelBooking.bookings.map((booking) => (
              <div className="">
                <div className="">
                  <span className="font-bold mr-2">Dates: </span>
                  <span className="">
                    {new Date(booking.checkIn).toDateString()} -
                    {new Date(booking.checkOut).toDateString()}
                  </span>
                </div>

                <div>
                  <span className="font-bold mr-2">Guests: </span>
                  <span>
                    {booking.adultCount} adults, {booking.childCount} children
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
