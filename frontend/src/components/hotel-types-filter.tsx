import { hotelTypes } from '../config/hotel-options-config';

type Props = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-sm font-semibold mb-2 md:text-base">Hotel Type</h4>

      {hotelTypes.map((hotelType, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={hotelType}
            checked={selectedHotelTypes.includes(hotelType)}
            onChange={onChange}
            className="rounded"
          />
          <span>{hotelType}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypesFilter;
