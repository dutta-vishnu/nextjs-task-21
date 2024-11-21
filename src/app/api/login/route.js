import { connectToDatabase1 } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async ( req ) =>
{
    try
    {
        const { email, password } = await req.json();

        const db = await connectToDatabase1();
        const user = await db.collection( 'user' ).findOne( { email } );
        if ( !user ) return NextResponse.json( { status: false, message: "user not found" } );
        const matched = await bcrypt.compare( password, user.password );

        if ( email !== user.email || !matched )
        {
            return NextResponse.json( { status: false, message: "Invalid email or password" } );
        }

        return NextResponse.json( { status: true, message: "succesfully login", user:user._id } );

        // await createSession( user._id );

        // redirect( `/user/${user._id}` );

    } catch ( error )
    {
        console.log( error );
        return NextResponse.json( { status: false, message: "error in login" } );
    }
};