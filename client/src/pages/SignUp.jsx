import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearError } from '../redux/user/userSlice'; // Assuming clearError is defined in the Redux slice
import OAuth from '../components/OAuth';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear any previous errors when the component mounts
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    if (id === 'password' || id === 'confirmPassword') {
      setPasswordMatch(
        id === 'confirmPassword' ? value === formData.password : formData.confirmPassword === value
      );
      if (id === 'password') {
        setPasswordStrength(checkPasswordStrength(value));
      }
    }
  };

  const checkPasswordStrength = (password) => {
    const lengthCriteria = /.{8,}/;
    const lowercaseCriteria = /[a-z]/;
    const uppercaseCriteria = /[A-Z]/;
    const numberCriteria = /\d/;
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/;

    if (
      password.length >= 8 &&
      lowercaseCriteria.test(password) &&
      uppercaseCriteria.test(password) &&
      numberCriteria.test(password) &&
      specialCharCriteria.test(password)
    ) {
      return 'Strong';
    } else if (
      password.length >= 6 &&
      lowercaseCriteria.test(password) &&
      uppercaseCriteria.test(password)
    ) {
      return 'Medium';
    } else {
      return 'Weak';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordMatch) {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        navigate('/signin');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Passwords do not match');
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-[500px] flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg">
        <h1 className="bg-[#EAE6FF] text-[#494949] text-center font-roboto-flex text-[2rem] font-semibold leading-normal flex justify-center w-48 py-1 rounded-xl mb-10">
          SIGN UP
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-full items-center">
          <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded-md border-gray-200 w-11/12 mb-4"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-md border-gray-200 w-11/12 mb-4"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded-md border-gray-200 w-11/12 mb-4"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          {formData.password && (
            <p className="text-sm mb-4">
              Password Strength: 
              <span
                className={`${
                  passwordStrength === 'Strong'
                    ? 'text-green-500'
                    : passwordStrength === 'Medium'
                    ? 'text-yellow-500'
                    : 'text-red-500'
                }`}
              >
                {passwordStrength}
              </span>
            </p>
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            className={`border p-2 rounded-md w-11/12 mb-4 ${
              passwordMatch ? 'border-gray-200' : 'border-red-500'
            }`}
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {!passwordMatch && (
            <p className="text-red-500 text-sm mb-4">Passwords do not match</p>
          )}
          <button
            type="submit"
            className="bg-[#4C51BF] hover:opacity-95 disabled:opacity-80 text-white rounded-md p-2 w-11/12"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
          <div className="flex items-center w-11/12 my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <OAuth />
        </form>
        {error && <p className="text-red-500 mt-3">{error}</p>}
        <div className="flex justify-center w-full mt-5">
          <p>Have an account?</p>
          <Link to={'/signin'}>
            <span className="text-blue-700 ml-2">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
