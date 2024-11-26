import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../contexts/app-context';
import * as apiClient from '../api.client';

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: 'Registration Successful!', type: 'SUCCESS' });
      await queryClient.invalidateQueries('validateToken');
      navigate('/');
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Create an Account</h2>

      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register('firstName', { required: 'This field is required' })}
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm font-thin">
              {errors.firstName.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register('lastName', { required: 'This field is required' })}
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm font-thin">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
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
          className="border rounded w-full py-1 px-2 font-normal"
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

      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('confirmPassword', {
            validate: (val) => {
              if (!val) {
                return 'This field is required';
              } else if (watch('password') !== val) {
                return 'Your passwords do not match';
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm font-thin">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>

      <span>
        <button
          type="submit"
          className="text-sm rounded-md bg-sky-600 text-white p-2 font-bold hover:bg-sky-500 md:text-xl"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
