"use client";

import { logout } from '@/lib/actions';
import { compareSessionWithUserId } from '@/lib/session';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function User()
{
    const [ session, setSession ] = useState( null );
    const [ products, setProducts ] = useState( [] ); // Initialize as an empty array
    const params = useParams();
    const router = useRouter();
    const { id } = useParams();


    const getProducts = async () =>
    {
        try
        {
            const { data } = await axios.get( "https://fakestoreapi.com/products" );
            setProducts( data );
        } catch ( error )
        {
            console.log( error );
        }
    };

    useEffect( () =>
    {
        async function fetchSession()
        {
            const isValid = await compareSessionWithUserId( params.id );
            console.log( isValid );
            if ( !isValid )
            {
                router.push( '/login' );
            } else
            {
                setSession( true ); // Update session state when valid
                getProducts();
            }
        }
        fetchSession();
    }, [ params.id ] );

    return (
        <>
            <nav className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
                <div className="text-lg font-semibold">
                    <Link href={`/user/${params.id}`}>
                        <span className="hover:text-gray-200">Home</span>
                    </Link>
                </div>
                <div>
                    <ul className="flex space-x-6">

                        <li>
                            <Link href={`/profile/${params.id}`} className="hover:text-gray-200">
                                <span className="hover:text-gray-200">Profile</span>
                            </Link>
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

            <div className='grid grid-cols-4 border drop-shadow gap-5'>
                {products.length === 0 ? (
                    <div>No products available</div>
                ) : (
                    products.map( ( item, i ) => (
                        <div key={i}>
                            <div className="max-w-sm h-[500px] rounded overflow-hidden shadow-lg">
                                <Image className="" src={item.image} alt={item.title} width={100} height={100} />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{item.title}</div>
                                    <p className="text-gray-700 text-base">
                                        {item.description}
                                    </p>
                                </div>
                                {/* <div className="px-6 pt-4 pb-2">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                </div> */}
                            </div>
                            {/* <div key={item.id} className='bg-blue-300'>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <img src={item.image} alt={item.title} width={100} />
                            </div> */}
                        </div>
                    ) )
                )}
            </div>
        </>
    );
}
