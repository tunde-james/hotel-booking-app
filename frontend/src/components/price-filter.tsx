type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-2 md:text-base">Max Price</h4>

      <select
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
        className="p-2 border rounded-md w-full"
      >
        <option>
          Select Max Price
        </option>
        {[40000, 60000, 100000, 350000, 600000].map((price, index) => (
          <option key={index} value={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
