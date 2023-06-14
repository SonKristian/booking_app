import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();

    try {
      //push è un metodo che ci permette di inserire  qualsiasi item nell'array
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom)
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next)=>{
    try{
        //senza il new:true quando si effettua update darà come output il risultato non aggiornato
        //quindi non quello updatedHotel
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set : req.body}, { new : true})
        res.status(200).json(updatedRoom)
    }catch (err){
      next(err)
    }
}

export const deleteRoom = async (req, res, next)=>{
    const hotelId = req.params.hotelId;
    try{
        await Room.findByIdAndDelete(req.params.id)
        try {
            //push è un metodo che ci permette di inserire  qualsiasi item nell'array
            await Hotel.findByIdAndUpdate(hotelId, {
              $pull: { rooms: req.params.id },
            });
          } catch (err) {
            next(err);
          }
        res.status(200).json("Room has been deleted")
      }catch (err){
      next(err)
    }
}

export const getRoom = async (req, res, next)=>{
    try{
        const room = await Room.findById(req.params.id)
          res.status(200).json(room)
      }catch (err){
      next(err)
    }
}

export const getRooms = async (req, res, next)=>{
    // const failed= true
    // if(failed) return next(createError(401, "You're not authenticated"))
    try{ 
        const rooms = await Hotel.find()
        res.status(200).json(rooms)
    }catch (err){
      next(err)
    }
}
