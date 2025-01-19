import { Request,Response } from "express"

const jwt = require("jsonwebtoken")


const secret_key = "12345678"

export function verifyToken(req:Request,res:Response,next:any){
    const token = req.headers["authorization"];

    if(!token?.startsWith("Bearer ") ){
        return res.status(403).json({
            msg:"Access denied"
        })
    }

    if(token){
        try {
            console.log(token.split(" ")[1])
            const verifiedToken = jwt.verify(token.split(" ")[1],secret_key);
            // req.email = verifiedToken.email
            if(verifiedToken){
                return next()
            }
        } catch (error) {
            return res.json({
                error
            })
        }
       
    }


    return res.json({
        msg:"invalid token"
    })
}

