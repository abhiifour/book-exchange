import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {  updateUser } from '../store/slice/userSlice';
import { useNavigate } from 'react-router';
import axios from 'axios';

interface AuthProps {
  setVisible: (visible: boolean) => void;
}

interface LoginInputs {
  email: string;
  password: string;
}

interface SignupInputs extends LoginInputs {
  name: string;
}

const AuthForms = ({ setVisible }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(true);
  
  return isLogin ? 
    <Login setVisible={setVisible} toggleForm={() => setIsLogin(false)} /> : 
    <Signup setVisible={setVisible} toggleForm={() => setIsLogin(true)} />;
};

function Login({ setVisible, toggleForm }: AuthProps & { toggleForm: () => void }) {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInputs>();

  const dispatch = useDispatch()

  const onSubmit = async(data: LoginInputs) => {
    console.log(data);
    try {
        const response = await axios.post("http://localhost:3000/login", {
            email:data.email,
            password:data.password
        });
        console.log (response.data)
        dispatch(updateUser({
            email : response.data.user.email,
            books : response.data.user.books,
            name : response.data.user.name,
            id : response.data.user.id,
            token : response.data.token,
            sentExchanges: response.data.user.sentExchanges,
            receivedExchanges : response.data.user.receivedExchanges
        }))
    } catch (error) {
       console.log(error)
    }
    navigate("/explore")
   
    
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10 ">
      <div className="bg-white p-8 rounded-xl w-96 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Login</h1>
          <button 
            onClick={() => setVisible(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className="w-full p-2 border rounded-lg"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              className="w-full p-2 border rounded-lg"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={toggleForm}
              className="text-black hover:underline"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

function Signup({ setVisible, toggleForm }: AuthProps & { toggleForm: () => void }) {
  const [ isVisible ,setIsVisible ] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupInputs>();

  const onSubmit = async(data: SignupInputs) => {
    console.log(data);
    try {
        const response = await axios.post("http://localhost:3000/signup", {
            name:data.name,
            email:data.email,
            password:data.password
        });
        console.log (response.data)
        if(response)
        setIsVisible(true)
      
    } catch (error) {
       console.log(error)
    }
   
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
      <div className="bg-white p-8 rounded-xl w-96 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold ">Sign Up</h1>
         
          <button 
            onClick={() => setVisible(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        {
            isVisible && <h1 className='text-[18px] text-start py-6 text-blue-600'>User Added . Please Login with the Same Credentials</h1>
          }
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              {...register("name", { 
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters"
                }
              })}
              className="w-full p-2 border rounded-lg"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className="w-full p-2 border rounded-lg"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              className="w-full p-2 border rounded-lg"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={toggleForm}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AuthForms;