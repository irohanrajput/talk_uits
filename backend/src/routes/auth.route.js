import express from "express";

const router = express.Router()

router.get("/", ()=>{
    return "hello"
})

export default router; 