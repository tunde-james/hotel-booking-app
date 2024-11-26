import { useFormContext } from 'react-hook-form';

import { HotelFormData } from './manage-hotel-form';
import { hotelFacilities } from '../../config/hotel-options-config';

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="lg:w-[55%]">
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>

      <div className="flex flex-wrap gap-3 w-fit">
        {hotelFacilities.map((facility) => (
          <label key={facility} className="text-sm flex gap-1 text-gray-700">
            <input
              type="checkbox"
              value={facility}
              {...register('facilities', {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return 'At least one facility is required';
                  }
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-thin">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
