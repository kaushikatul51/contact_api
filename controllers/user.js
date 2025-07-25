import { User } from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config({path:'.env'})


export const register=async (req, res) => {
    const { name, email, password } = req.body;


    if (name == "" || email == "" || password == "") {
        return res.json({
            message: 'all feild are required'
        })
    }
    let user = await User.findOne({ email })
    if (user) {
        return res.json({
            message: 'User already exist',
            success: false
        })


    }
    const hashPassword= await bcrypt.hash(password,10)
    user = await User.create({ name, email, password:hashPassword })
    res.json({
        message: 'user created successfully',
        success: true,
        user
    })

}
 export const login= async(req,res)=>{
    const {email,password}=req.body;
    let user=await User.findOne({email});
    if(!user){
        return res.json({
            message: 'User not exist',
            success: false
        })
    }
    const validPass= await bcrypt.compare(password,user.password)
    if(!validPass){
        return res.json({
            message: 'Invalid password',
            success: false
        })

    }
    const token=jwt.sign({userId:user._id},process.env.JWT);
    
        res.json({
            message: `welcome ${user.name}`,
            token,
            success: true
        })
    
    
 }