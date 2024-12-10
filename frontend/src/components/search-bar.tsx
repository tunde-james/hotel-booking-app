import { FormEvent, useState } from 'react';
import { MdTravelExplore } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

import { useSearchContext } from '../contexts/search-context';

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );

    navigate('/search');
  };

  const minDate = new Date();
  const maxDate = new Date();

  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-slate-300 rounded-md shadow-md grid grid-cols-2 items-center gap-2 lg:grid-cols-3 2xl:grid-cols-5"
    >
      <div className="flex flex-row items-center flex-1 rounded-md bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          type="text"
          placeholder="Where are you going?"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          className="text-sm w-full focus:outline-none md:text-base"
        />
      </div>

      <div className="flex bg-white px-2 py-1 gap-2 rounded-md">
        <label className="flex items-center">
          Adults:
          <input
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
            className="w-full p-1 font-semibold focus:outline-none"
          />
        </label>

        <label className="flex items-center">
          Children:
          <input
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
            className="w-full p-1 font-semibold focus:outline-none"
          />
        </label>
      </div>

      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 rounded-md focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>

      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 rounded-md focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>

      <div className="flex gap-1 justify-center items-center">
        <button className="w-2/3 rounded-md bg-sky-600 text-white h-full p-2 font-semibold text-sm hover:bg-sky-500 md:text-base">
          Search
        </button>

        <button className="w-1/3 rounded-md bg-red-600 text-white h-full p-2 font-semibold text-sm hover:bg-red-500 md:text-base">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
