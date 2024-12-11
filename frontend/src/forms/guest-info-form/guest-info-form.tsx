import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSearchContext } from '../../contexts/search-context';
import { useAppContext } from '../../contexts/app-context';

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      '',
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate('/sign-in', { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      '',
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );

    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-sky-200 gap-4 rounded-md">
      <h3 className="text-sm font-bold">₦{pricePerNight}</h3>

      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 items-center gap-4">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue('checkIn', date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full rounded-md bg-white p-2 focus: outline-none"
              wrapperClassName="min-w-full"
            />
          </div>

          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue('checkOut', date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full rounded-md bg-white p-2 focus: outline-none"
              wrapperClassName="min-w-full"
            />
          </div>

          <div className="flex bg-white rounded-md px-2 py-1 gap-2">
            <label className="flex items-center">
              Adults:
              <input
                type="number"
                min={1}
                max={20}
                className="w-full p-1 font-bold focus:outline-none"
                {...register('adultCount', {
                  required: 'This field is required',
                  min: {
                    value: 1,
                    message: 'There must be at least one adult',
                  },
                  valueAsDate: true,
                })}
              />
            </label>

            <label className="flex items-center">
              Children:
              <input
                type="number"
                min={0}
                max={20}
                className="w-full p-1 font-bold focus:outline-none"
                {...register('childCount', {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 text-sm font-thin">
                {errors.adultCount.message}
              </span>
            )}
          </div>

          {isLoggedIn ? (
            <button className="text-sm rounded-md bg-sky-600 text-white h-full p-2 font-bold hover:bg-sky-500 md:text-xl">
              Book Now
            </button>
          ) : (
            <button className="text-sm rounded-md bg-sky-600 text-white h-full p-2 font-bold hover:bg-sky-500 md:text-xl">
              Sign In to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
