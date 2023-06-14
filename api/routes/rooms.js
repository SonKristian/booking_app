import express from "express"
import { verifyAdmin } from "../utils/verifyToken.js"
import { getRoom, createRoom, getRooms, updateRoom, deleteRoom } from "../controllers/room.js"
const router = express.Router()

//create
router.post("/", verifyAdmin, createRoom)
//update
router.put("/:id", verifyAdmin, updateRoom)
//delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)
//get
router.get("/:id", getRoom)
//get all
router.get("/", getRooms)


export default router