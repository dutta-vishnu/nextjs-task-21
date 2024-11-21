import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";


export const ses = new SESClient( {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
} );



export default async function POST( req, res )
{
    if ( req.method !== "POST" )
    {
        return res.status( 405 ).json( { message: "Method not allowed" } );
    }

    const { to, subject, message } = req.body;

    console.log( to, subject, message, "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii" );

    if ( !to || !subject || !message )
    {
        return res.status( 400 ).json( { message: "Missing required fields" } );
    }

    try
    {
        const params = {
            Destination: {
                ToAddresses: [ to ],
            },
            Message: {
                Body: {
                    Text: { Data: message },
                },
                Subject: { Data: subject },
            },
            Source: "vishnu@medigence.com", // Replace with your verified sender email
        };

        const command = new SendEmailCommand( params );
        await ses.send( command );

        return res.status( 200 ).json( { message: "Email sent successfully" } );
    } catch ( error )
    {
        console.error( "Error sending email:", error );
        return res.status( 500 ).json( { message: "Failed to send email", error } );
    }
}
