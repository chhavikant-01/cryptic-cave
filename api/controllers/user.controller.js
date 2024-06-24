import mongoose from "mongoose"
import User from "../models/user.model.js"
import Post from "../models/post.model.js"

export const logout = (req,res,next)=>{
    try{
        res
            .clearCookie("token")
            .status(200)
            .json({message: "Logout successfully!"})
    }catch(e){
        res.status(500).json({message: e.message})
    }
}

export const updateUser = async (req, res, next) => {

    try{
       const user = await User.findById(req.user.id).select("+password")
       if(!user){
        res
            .status(400)
            .json({message: "User does not exist!"})
       }
       const isPasswordValid = user.comparePassword(req.body.password)
       if(!isPasswordValid){
        res
            .status(400)
            .json({message: "Incorrect Password!"})
       }

        if(req.body.password){
            try{
                user.password = req.body.password;
                await user.save();

                res.status(201).json({
                    success: true,
                    message: "Password updated"
                })
            } catch(e){
                res.status(500).json({message: e.message})
            }
        }       
        if(req.body.profilePicture){
            try{
                user.profilePicture = req.body.profilePicture;
                await user.save();

                res.status(201).json({
                    success: true,
                    message: "Profile Picture updated"
                })
            } catch(e){
                res.status(500).json({message: e.message})
            }
        }       
        if(req.body.yearOfGraduation){
            try{
                user.yearOfGraduation = req.body.yearOfGraduation;
                await user.save();

                res.status(201).json({
                    success: true,
                    message: "Profile updated"
                })
            } catch(e){
                res.status(500).json({message: e.message})
            }
        }       
    } catch(e){
        res.status(500).json({message: e.message})
    }
}

export const deleteUser = async (req,res,next) => {
    
    try{
        const user = await User.findById(req.user.id).select("+password")
        
        if(!user){
            res
                .status(400)
                .json({message: "User does not exist!"})
           }

        const isPasswordValid = user.comparePassword(req.body.password)
        if(!isPasswordValid){
            res
                .status(400)
                .json({message: "Incorrect Password!"})
           }
        
        try{
            await User.findByIdAndDelete(req.user.id);
            res.status(200).json('User has been deleted');
        } catch(e){
            res.status(500).json({message: e.message})
        }
        
    }catch(e){
        res.status(500).json({message: e.message})
    }
}

export const getUser = async (req,res,next) => {
    try{
        const user = await User.findById(req.params.userId);

        const { password, updatedAt, createdAt, savedPosts, ...other } = user._doc;

        res.status(200).json(other)
    } catch(e){
        res.status(500).json({message: e.message})
    }
}

export const followUser = async (req,res,next) => {
    try{
        if(req.user.id!==req.params.userId){ //user can't follow itself!

            const session = await mongoose.startSession();
            session.startTransaction();
            try{
                const user = await User.findById(req.params.userId).session(session);
                const currentUser = await User.findById(req.user.id).session(session);

                if (!user || !currentUser) {
                    await session.abortTransaction();
                    session.endSession();
                    return res.status(404).json("User not found");
                  }

                if(!currentUser.followings.includes(req.params.userId)){
                    await currentUser.updateOne({ $addToSet:{ followings:req.params.userId } }, { session });
                    await user.updateOne({ $addToSet:{ followers:req.user.id } }, { session });
                    await session.commitTransaction();
                    res.status(201).json({message: "User has been followed"})
                }else {
                    await session.abortTransaction();
                    res.status(400).json("You already follow this user");
                  }
            }catch(e){
                await session.abortTransaction();
                res.status(500).json({message: e.message});
            } finally{
                session.endSession();
            }
        
        } else{
            res.status(400).json({message: "You can't follow yourself"})
        }
    }catch(e){
        res.status(500).json({message: e.message})
    }
}

export const unfollowUser = async (req,res,next) => {
    try{
        if(req.user.id!==req.params.userId){ //user can't unfollow itself!

            const session = await mongoose.startSession();
            session.startTransaction();
            try{
                const user = await User.findById(req.params.userId).session(session);
                const currentUser = await User.findById(req.user.id).session(session);

                if (!user || !currentUser) {
                    await session.abortTransaction();
                    session.endSession();
                    return res.status(404).json("User not found");
                  }
            

                if(currentUser.followings.includes(req.params.userId)){
                    await currentUser.updateOne({ $pull:{ followings:req.params.userId } }, { session });
                    await user.updateOne({ $pull:{ followers:req.user.id } }, { session });
                    await session.commitTransaction();
                    res.status(201).json({message: "User has been unfollowed"})
                }else {
                    await session.abortTransaction();
                    res.status(400).json("You do not follow this user");
                  }
            }catch(e){
                await session.abortTransaction();
                res.status(500).json({message: e.message});
            } finally{
                session.endSession();
            }
        
        } else{
            res.status(400).json({message: "You can't unfollow yourself"})
        }
    }catch(e){
        res.status(500).json({message: e.message})
    }
}

export const allUsers = async (req,res,next) => {
    
    try {
        const data = await User.find();
        res.status(200).json(data);
      } catch (err) {
        res.status(404).json({message: err.message});
      }
}

export const userPosts = async (req,res,next) => {
    try{
        const user = await User.findById(req.params.userId);
        if(!user){
            return res.status(404).json({message: "User doesn't exist!"})
        }

        const posts = await Post.find({userId: user._id})

        res.status(200).json(posts)

    }catch(e){
        res.status(500).json({message: e.message})
    }
}