import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import * as apiClient from '../api-client';
import { AiFillStar } from 'react-icons/ai';
import GuestInfoForm from '../forms/guest-info-form/guest-info-form';

const HotelDetail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    'fetchHotelById',
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotel.starRating }).map((_, index) => (
            <AiFillStar key={index} className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-sm font-bold md:text-3xl">{hotel.name}</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {hotel.imageUrls.map((image, index) => (
          <div key={index} className="h-[150px] md:h-[250px]">
            <img
              src={image}
              alt={hotel.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {hotel.facilities.map((facility) => (
          <div
            key={facility}
            className="border border-slate-300 rounded-sm p-2"
          >
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line mb-2 md:mb-0 md:mr-3">
          {hotel.description}
        </div>

        <div className="h-fit">
          <GuestInfoForm
            hotelId={hotel._id}
            pricePerNight={hotel.pricePerNight}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
