import { useQuery } from 'react-query';

import * as apiClient from '../api-client';
import LatestDestinationCard from '../components/latest-destination-card';

const HomePage = () => {
  const { data: hotels } = useQuery('fetchQuery', () =>
    apiClient.fetchHotels()
  );

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <div className="space-y-3">
      <h2 className="font-bold md:text-3xl">Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>

      <div className="grid gap-4 ">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
