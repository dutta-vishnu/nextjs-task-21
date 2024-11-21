"use client";

import { logout } from '@/lib/actions';
import { compareSessionWithUserId } from '@/lib/session';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Profile()
{
    const { id } = useParams();
    const params = useParams();

    const [ session, setSession ] = useState( null );
    const router = useRouter();
    const [ user, setUser ] = useState( '' );


    useEffect( () =>
    {
        async function fetchSession()
        {
            const isValid = await compareSessionWithUserId( id );
            console.log( isValid );
            if ( !isValid )
            {
                router.push( '/login' );
            } else
            {
                setSession( true ); // Update session state when valid
            }
        }
        fetchSession();
    }, [ id ] );

    const userdata = async () =>
    {
        try
        {
            console.log( 'hi' );
            const { data } = await axios.get( `/api/userDetails/${id}` );
            setUser( data.user );
        } catch ( error )
        {
            console.log( error );
        }
    };

    useEffect( () =>
    {
        userdata();

    }, [ id ] );

    return (
        <>
            <nav className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
                <div className="text-lg font-semibold">
                    <a href={`/user/${params.id}`} className="hover:text-gray-200">Home</a>
                </div>
                <div>
                    <ul className="flex space-x-6">
                        
                        <li>
                            <a href={`/profile/${params.id}`} className="hover:text-gray-200">Profile</a>
                        </li>
                        <li>
                            <button
                                onClick={logout}
                                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav >
            <div className='h-screen w-full justify-center items-center'>
                hi,  {user.name} this is your profile page
            </div>
        </>
    );
}
