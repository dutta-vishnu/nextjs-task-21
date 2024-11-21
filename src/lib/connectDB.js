import { MongoClient } from "mongodb";

const url = process.env.DATABASE_URL;

// Global client variables to prevent reconnecting in serverless
let client1;

// Ensure cached client across hot reloads in dev environment
global._mongoClient1 = global._mongoClient1 || null;

export async function connectToDatabase1()
{
    if ( !global._mongoClient1 )
    {
        client1 = new MongoClient( url );
        global._mongoClient1 = await client1.connect();
    }
    return global._mongoClient1.db();
}