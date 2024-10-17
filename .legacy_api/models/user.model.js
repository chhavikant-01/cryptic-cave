import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
            select: false,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
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

//  Hash password
userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  // jwt token
  userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET,{
      expiresIn: process.env.JWT_EXPIRES,
    });
  };

  // compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    const verdict = await bcrypt.compare(enteredPassword, this.password)
    return verdict;
  };

const User = mongoose.model("User", userSchema);

export default User;

// Create the Anonymous User
const createAnonymousUser = async () => {
    const existingUser = await User.findOne({ username: "anonymous" });
    
    if (!existingUser) {
        const anonymousUser = new User({
            username: "anonymous",
            firstname: "Anonymous",
            lastname: "User",
            email: "anonymous@yourdomain.com",
            password: "securepassword", 
            isAdmin: false,
            profilePicture: "", 
            program: "NA",
            yearOfGraduation: "NA",
        });
        
        await anonymousUser.save();
        console.log("Anonymous user created successfully.");
    } else {
        console.log("Anonymous user already exists.");
    }
};

createAnonymousUser();