import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Banknote, Building2, Hotel, Map, Star } from 'lucide-react';

import * as apiClient from '../api-client';

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    'fetchMyHotels',
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  if (!hotelData) {
    return <span>No hotels found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between items-center">
        <h1 className="font-bold md:text-3xl">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-sky-600 rounded-md text-white text-sm font-medium p-2 hover:bg-sky-500 md:text-xl"
        >
          Add Hotel
        </Link>
      </span>

      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div
            key={hotel._id}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="font-bold md:text-2xl">{hotel.name}</h2>

            <div className="whitespace-pre-line text-justify">
              {hotel.description}
            </div>

            <div className="grid grid-cols-2 text-xs gap-2 md:text-base md:grid-cols-5">
              <p className="border border-slate-300 rounded-md p-1 flex items-center">
                <Map className="mr-1" />
                {hotel.city}, {hotel.country}
              </p>

              <p className="border border-slate-300 rounded-md p-1 flex items-center">
                <Building2 className="mr-1" />
                {hotel.type}
              </p>

              <p className="border border-slate-300 rounded-md p-1 flex items-center">
                <Banknote className="mr-1" />₦{hotel.pricePerNight} per night
              </p>

              <p className="border border-slate-300 rounded-md p-1 flex items-center">
                <Hotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </p>

              <p className="border border-slate-300 rounded-md p-1 flex items-center">
                <Star className="mr-1 fill-[#FFE234] stroke-none" />
                {hotel.starRating} Star Rating
              </p>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-sky-600 rounded-md text-white text-sm p-2 hover:bg-sky-500 md:text-base md:font-medium"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
