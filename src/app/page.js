'use client';

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home()
{

  const [ name, setName ] = useState( '' );
  const [ email, setEmail ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  const [ status, setStatus ] = useState( false );
  const [ otp, setOtp ] = useState( "" );
  const [ userId, setUserId ] = useState( "" );

  const router = useRouter();

  const handleSubmit = async ( e ) =>
  {
    try
    {
      e.preventDefault();
      const { data } = await axios.post( '/api/user', { name, email, password } );
      console.log( data );
      if ( data.status ) setStatus( data.status ); setUserId( data.user );
    } catch ( error )
    {
      console.log( error );
    }
  };

  const handleSubmitOTP = async ( e ) =>
  {
    try
    {
      e.preventDefault();
      const res = await axios.post( '/api/verifyEmail', { otp, userId } );
      if ( res.data.status )
      {
        router.push( '/login' );
      }
    } catch ( error )
    {
      console.log( error );
    }
  };


  return (
    <div className="flex justify-center w-full h-screen items-center">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {!status ? (

            <form onSubmit={handleSubmit} method="POST" className="space-y-6">

              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    onChange={( e ) => setName( e.target.value )}
                    value={name}
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onChange={( e ) => setEmail( e.target.value )}
                    value={email}
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                 
                </div>
                <div className="mt-2">
                  <input
                    onChange={( e ) => setPassword( e.target.value )}
                    value={password}
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          ) : ( <>
            <form onSubmit={handleSubmitOTP} method="POST" className="space-y-6">

              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  OTP
                </label>
                <div className="mt-2">
                  <input
                    onChange={( e ) => setOtp( e.target.value )}
                    value={otp}
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Confirm OTP
                </button>
              </div>
            </form>
          </> )}

         
        </div>
      </div>
    </div>
  );
}
