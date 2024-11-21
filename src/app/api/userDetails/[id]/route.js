import { connectToDatabase1 } from '@/lib/connectDB';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export const GET = async ( req, { params } ) =>
{
    try
    {
        const { id } = await params;

        const db = await connectToDatabase1();

        const user = await db.collection( 'user' ).findOne( { _id: new ObjectId( id ) } );

        return NextResponse.json( {
            status: true,
            message: 'User details found',
            user,
        } );
    } catch ( error )
    {
        console.error( error );
        return NextResponse.json( {
            status: false,
            message: 'Error retrieving user data',
        } );
    }
};
