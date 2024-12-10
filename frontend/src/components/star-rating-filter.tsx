type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-sm font-semibold mb-2 md:text-base">
        Property Rating
      </h4>

      {['5', '4', '3', '2', '1'].map((star, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange}
            className="rounded"
          />
          <span className="">{star} Stars</span>
        </label>
      ))}
    </div>
  );
};
export default StarRatingFilter;
