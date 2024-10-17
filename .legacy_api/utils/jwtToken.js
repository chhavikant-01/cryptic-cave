
const sendToken = (user, statusCode, res) => {

    const token = user.getJwtToken();
    const { password, ...rest } = user._doc

    // Options for cookies
    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };
    
      if(statusCode === 201){
        res.status(statusCode).cookie("token", token, options).json({
          success: true,
          message: "User created successfully"
        });
      }
      if(statusCode === 200){
        res.status(statusCode).cookie("token", token, options).json({
          success: true,
          message: "User logged in successfully",
          rest
        });
      }
    };

    export default sendToken;