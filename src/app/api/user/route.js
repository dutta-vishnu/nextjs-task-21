import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase1 } from "@/lib/connectDB";
import axios from "axios";
import { ses } from "../send-email/route";
import { SendEmailCommand } from "@aws-sdk/client-ses";


export const POST = async ( req ) =>
{
    try
    {
        const { name, email, password } = await req.json();

        const db = await connectToDatabase1();
        const existed = await db.collection( 'user' ).findOne( { email } );

        if ( existed ) return NextResponse.json( { status: false, message: "user already existed !!!" } );

        const salt = await bcrypt.genSalt( 10 );
        const hash = await bcrypt.hash( password, salt );

        const randomNum = Math.random() * 9000;
        const formattedRandomNum = Math.floor( randomNum );

        const saved = await db.collection( 'user' ).insertOne( { name, email, password: hash, createdAt: new Date().toISOString(), otp: formattedRandomNum } );

        if ( saved )
        {
            const params = {
                Destination: {
                    ToAddresses: [ email ],
                },
                Message: {
                    Body: {
                        Text: { Data: String( formattedRandomNum ) },
                    },
                    Subject: { Data: "otp" },
                },
                Source: "vishnu@medigence.com", // Replace with your verified sender email
            };

            try
            {
                const command = new SendEmailCommand( params );
                const send = await ses.send( command );
            } catch ( error )
            {
                console.log( error );
            }
        }

        return NextResponse.json( {
            status: true,
            message: "signup succesfully!!!",
            user: saved.insertedId
        } );
    } catch ( error )
    {
        return NextResponse.json( {
            status: false,
            message: "error in registration",
            error
        } );
    }
};