import bcrypt from "bcryptjs"
import User from "../models/user.model.js"

export const signup = async (req, res)=> {
    const {firstname, lastname, password, email} = req.body;
    console.log(req.body);

    if(!firstname || !password || !email){
        return res.status(400).json({msg: "Please enter all fields"})
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync("password", salt);

    const username = email.split("@")[0];

    const newUser = new User(
        {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword,
            username: username,
        }
    );

    try{
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch(e){
        res.status(400).json({msg: e})
    }


}