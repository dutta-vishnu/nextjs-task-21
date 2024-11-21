import mongoose from "mongoose";

const userSchema = mongoose.Schema( {
    name: {
        type: String
    },
    email: {
        type: String,
        required: [ true, "Must provide a username." ],
        unique: [ true, "Must be unique." ]
    },
    password: {
        type: String,
        required: [ true, "Must provide a password." ],
        select: false
    },
    otp: {
        type: String,
    }
}, {
    timestamps: true
} );

const User = mongoose.models.User || mongoose.model( 'User', userSchema );

export default User;