"use server"

import { SignJWT, jwtVerify } from "jose";
import { cookies as getCookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode( secretKey );

export async function createSession( userId )
{
    const expiresAt = new Date( Date.now() + 7 * 24 * 60 * 60 * 1000 ); // 1 week expiration
    const session = await encrypt( { userId, expiresAt } );

    // Create a cookies instance and set the session cookie
    try
    {
        const cookieHandler = await getCookies();
        cookieHandler.set( "session_testing", session, {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
        } );
    } catch ( error )
    {
        console.error( "Failed to set session cookie:", error );
    }
}

export async function deleteSession()
{
    try
    {
        const cookieHandler = await getCookies();
        cookieHandler.delete( "session_testing" ); // Await delete operation
    } catch ( error )
    {
        console.error( "Failed to delete session cookie:", error );
    }
}

export async function encrypt( payload )
{
    return new SignJWT( payload )
        .setProtectedHeader( { alg: "HS256" } )
        .setIssuedAt()
        .setExpirationTime( "7d" )
        .sign( encodedKey );
}

export async function decrypt( session )
{
    try
    {
        const { payload } = await jwtVerify( session, encodedKey, {
            algorithms: [ "HS256" ],
        } );
        return payload;
    } catch ( error )
    {
        console.log( "Failed to verify session:", error );
    }
}

// Compare session with userId
export async function compareSessionWithUserId(providedUserId) {
    try {
        const cookieHandler = getCookies();
        const sessionCookie = cookieHandler.get("session_testing");

        if (!sessionCookie) {
            throw new Error("No session cookie found");
        }

        const sessionData = await decrypt(sessionCookie.value);

        if (!sessionData) {
            throw new Error("Invalid or expired session");
        }

        // Compare the userId from the session with the provided userId
        return sessionData.userId === providedUserId;
    } catch (error) {
        console.error("Failed to compare session with userId:", error);
        return false; // Return false if comparison fails
    }
}
