import express from "express"
import { getHotel, createHotel, getHotels, updateHotel, deleteHotel} from "../controllers/hotel.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

//create
router.post("/", verifyAdmin, createHotel)
//update
router.put("/:id", verifyAdmin, updateHotel)
//delete
router.delete("/:id", verifyAdmin, deleteHotel)
//get
router.get("/:id", getHotel)
//get all
router.get("/", getHotels)



export default router