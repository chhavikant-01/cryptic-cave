import express from "express"
import { logout } from "../controllers/user.controller"

const router = express.Router()

router.post("logout", logout)