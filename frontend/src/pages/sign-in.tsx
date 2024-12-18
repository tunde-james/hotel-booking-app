import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/app-context';

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {  
      showToast({ message: 'Sign in successful!', type: 'SUCCESS' });
      await queryClient.invalidateQueries('validateToken');
      navigate(location.state?.from?.pathname || '/');
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 max-w-xl">
      <h2 className="text-3xl font-bold">Sign In</h2>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border border-[#5F6363] rounded-md w-full py-1 px-2 font-normal"
          {...register('email', { required: 'This field is required' })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm font-thin">
            {errors.email.message}
          </span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border border-[#5F6363] rounded-md w-full py-1 px-2 font-normal"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm font-thin">
            {errors.password.message}
          </span>
        )}
      </label>

      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{' '}
          <Link
            to="/register"
            className="underline cursor-pointer text-blue-500"
          >
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="text-sm rounded-md bg-sky-600 text-white p-2 font-bold hover:bg-sky-500 md:text-xl"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
