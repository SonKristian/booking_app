import User from "../models/User.js";

export const updateUser = async (req, res, next)=>{
    try{
        //senza il new:true quando si effettua update darà come output il risultato non aggiornato
        //quindi non quello updatedUser
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set : req.body}, { new : true})
        res.status(200).json(updatedUser)
    }catch (err){
      next(err)
    }
}

export const deleteUser = async (req, res, next)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
          res.status(200).json("User has been deleted")
      }catch (err){
      next(err)
    }
}

export const getUser = async (req, res, next)=>{
    try{
        const user = await user.findById(req.params.id)
          res.status(200).json(user)
      }catch (err){
      next(err)
    }
}

export const getUsers = async (req, res, next)=>{
    // const failed= true
    // if(failed) return next(createError(401, "You're not authenticated"))
    try{ 
        const users = await User.find()
        res.status(200).json(users)
    }catch (err){
      next(err)
    }
}