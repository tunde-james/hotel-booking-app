import { useFormContext } from 'react-hook-form';

import { HotelFormData } from './manage-hotel-form';

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guest</h2>

      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300 rounded-md lg:w-[50%]">
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            type="number"
            min={1}
            className="border rounded-md w-full py-2 px-3 font-normal"
            {...register('adultCount', { required: 'This field is required' })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm font-thin">
              {errors.adultCount.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-semibold">
          Children
          <input
            type="number"
            min={0}
            className="border  rounded-md w-full py-2 px-3 font-normal"
            {...register('childCount', { required: 'This field is required' })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm font-thin">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestSection;