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