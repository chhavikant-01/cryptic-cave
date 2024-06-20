import User from "../models/user.model.js"

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
       const user = await User.findById(req.params.userId).select("+password")
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