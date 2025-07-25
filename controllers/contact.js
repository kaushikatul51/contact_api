import { Contact } from "../models/contact.js";


export const getAllContact=async (req,res)=>{
        const userContact=await Contact.find();
        if(!userContact){
           return  res.json({
            message:"No Contact Exist",
            success:false
           })

        }
        res.json({
            message:"all data fetched successfully",
            userContact
        })
        
    }

export const getContactById=async (req,res)=>{
    const id=req.params.id;
    const userContact= await Contact.findById(id)
    if(userContact){
        return res.json({
            message:'data fetched successfully',
            userContact
        })
    }
    res.json({
        message:"No contact exist",
        success:false
    })
}
export const updateContactById=async(req,res)=>{
    const id=req.params.id;
    const { name, email, phone, type } = req.body;
    const updatedContact=await Contact.findByIdAndUpdate(id,{
        name,
        email,
        phone,
        type

    },{
        new:true
    })
    if(!updatedContact) return res.json({
        message:"no contact exist",
        success:true
    })
    res.json({
        message:'contact updated successfully',
        updatedContact,
        success:true
    })
}

export const deleteContactById=async (req,res)=>{
    const id=req.params.id;
    const deleteContact=await Contact.findByIdAndDelete(id)
    if(!deleteContact){
        return res.json({
            message:"No contact exist",
            success:false
        })
    }
    res.json({
        message:"contact delete successfully",
        deleteContact,
        success:true
    })
}

export const newContact = async (req, res) => {
    const { name, email, phone, type } = req.body;
    if (name == "" || email == "" || phone == "" || type == "") {
        return res.json({
            message: "all. feilds are required",
            success: false
        })
    }

    
    let saveContact = await Contact.create({
        name,
        email,
        phone,
        type,
        user:req.user

    })
    console.log(saveContact)
    res.json({
        message: "data saved successfully",
        saveContact,
        success: true

    })

}
export const getContactByUserId=async (req,res)=>{
    const id=req.params.id;
    const userContact= await Contact.find({user:id})
    if(userContact){
        return res.json({
            message:'data fetched successfully',
            userContact
        })
    }
    res.json({
        message:"No contact exist",
        success:false
    })
}