"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./session";
// import { z } from "zod";
// import { connectToDatabase2 } from "./connectMDB";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

// const loginSchema = z.object( {
//     email: z.string().email( { message: "Invalid email address" } ).trim(),
//     password: z
//         .string()
//         .min( 8, { message: "Password must be at least 8 characters" } )
//         .trim(),
// } );

// export async function login( prevState, formData )
// {
//     const result = loginSchema.safeParse( Object.fromEntries( formData ) );
//     if ( !result.success )
//     {
//         return {
//             errors: result.error.flatten().fieldErrors,
//         };
//     }

//     const { email, password } = result.data;

//     const db2 = await connectToDatabase2();

//     const user = await db2.collection( "User" ).findOne( { email } );

//     const matched = await bcrypt.compare( password, user.password );

//     if ( email !== user.email || !matched )
//     {
//         return {
//             errors: {
//                 email: [ "Invalid email or password" ],
//             },
//         };
//     }

//     await createSession( user._id );

//     redirect( "/admin/user" );
// }

export async function logout()
{
    await deleteSession();
    redirect( "/login" );
}

export const getSession = async () =>
{
    const session = ( await cookies() ).get( 'session_testing' )?.value;
    return session;
};