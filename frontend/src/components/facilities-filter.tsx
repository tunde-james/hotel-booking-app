import { hotelFacilities } from '../config/hotel-options-config';

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="border-b boder-slate-300 pb-5">
      <h4 className="text-sm font-semibold mb-2 md:text-base">Facilities</h4>

      {hotelFacilities.map((facility, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={facility}
            checked={selectedFacilities.includes(facility)}
            onChange={onChange}
            className="rounded"
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
