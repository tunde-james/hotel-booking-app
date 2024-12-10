import { AiFillStar } from 'react-icons/ai';
import { HotelType } from '../../../backend/src/shared/types';
import { Link } from 'react-router-dom';

type Props = {
  hotel: HotelType;
};

const SearchResultCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          alt={hotel.description}
          className="w-full h-full rounded-lg object-cover object-center"
        />
      </div>

      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar key={Math.random()} className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-sm font-bold cursor-pointer md:text-2xl"
          >
            {hotel.name}
          </Link>
        </div>

        <p className="line-clamp-4">{hotel.description}</p>

        <div className="flex flex-col items-end whitespace-nowrap lg:flex-row">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility, index) => (
              <span
                key={index}
                className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap"
              >
                {facility}
              </span>
            ))}

            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>

          <div className="ml-auto flex mt-2 justify-between items-center gap-1 md:flex-col md:mt-0">
            <span className="font-bold text-sm">
              ₦{hotel.pricePerNight} per night
            </span>
            <Link
              to={`/detail/${hotel._id}`}
              className="text-sky-600 p-2 font-semibold text-sm max-w-fit hover:bg-sky-500 md:text-white md:rounded-md md:bg-sky-600 md:text-xl"
            >
              View more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
