import { useFormContext } from 'react-hook-form';

import { hotelTypes } from '../../config/hotel-options-config';
import { HotelFormData } from './manage-hotel-form';

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch('type');

  return (
    <div className="lg:w-[55%]">
      <h2 className="text-2xl font-bold mb-3">Type</h2>

      <div className="flex flex-wrap gap-2 w-fit">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={
              typeWatch === type
                ? 'cursor-pointer bg-sky-300 text-sm rounded-full px-4 py-2 font-semibold'
                : 'cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold'
            }
          >
            <input
              type="radio"
              value={type}
              {...register('type', {
                required: 'This field is required',
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-thin">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
