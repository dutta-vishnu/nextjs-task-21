import { connectToDatabase1 } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';

export const POST = async ( req ) =>
{
    try
    {
        const { otp, userId } = await req.json();

        console.log( otp, userId );

        const db = await connectToDatabase1();
        const user = await db.collection( 'user' ).findOne( { _id: new ObjectId( userId ) } );

        console.log( user );

        if ( !user ) return NextResponse.json( { status: false, message: "user not found" } );

        if ( Number( user.otp ) === Number( otp ) )
        {
            console.log( 'hiiiiiii' );
            return NextResponse.json( { status: true, message: "otp matched" } );
        }

        return NextResponse.json( { status: false, message: "otp not matched" } );
    } catch ( error )
    {
        console.log( error );
        return NextResponse.json( {
            status: false,
            message: "error in otp verification"
        } );
    }
};