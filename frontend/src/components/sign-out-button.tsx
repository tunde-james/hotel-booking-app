import { useMutation, useQueryClient } from 'react-query';

import * as apiClient from '../api.client';
import { useAppContext } from '../contexts/app-context';

const SignOutButton = () => {
  const queryClient = useQueryClient();

  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      showToast({ message: 'Signed out!', type: 'SUCCESS' });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
    },
  });

  const handleSignOut = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-sky-600 px-3 font-bold bg-white hover:bg-gray-100"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
