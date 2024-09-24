import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="w-[500px] flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg">
        <h1 className="bg-[#EAE6FF] text-[#494949] text-center font-roboto-flex text-[2rem] font-semibold leading-normal flex justify-center w-48 py-1 rounded-xl mb-10">
          SIGN IN
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-full items-center">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-md border-gray-200 w-11/12 mb-4"
            id="email"
            required={true}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded-md border-gray-200 w-11/12 mb-4"
            id="password"
            required={true}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-[#4C51BF] hover:opacity-95 disabled:opacity-80 text-white rounded-md p-2 w-11/12"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <div className="flex items-center w-11/12 my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
        </form>
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </div>
  );
}

export default SignIn