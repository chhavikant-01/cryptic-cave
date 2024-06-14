import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        followers: {
            type: Array,
            default: [],
        },
        followings: {
            type: Array,
            default: [],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        posts: {
            type: Array,
            default: [],
        },
        program: {
            type: String,
            default:"",
            //required: true,
        },
        yearOfGraduation: {
            type: String,
            default:"",
            //required: true,
        },
        savedPosts: {
            type: Array,
            default: [],
        }
    }, 
    { 
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;
