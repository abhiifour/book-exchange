import { PrismaClient } from "@prisma/client";
import { Request,Response } from "express";

const jwt = require("jsonwebtoken")

const secret_key = "12345678"


const prisma = new PrismaClient()


export async function login(req:Request,res:Response){

    const user = await prisma.user.findFirst({
        where:{
            email:req.body.email
        },
        include:{
            books:true,
            sentExchanges:true,
            receivedExchanges:true
        }
    })
    if(user){
        if(user.password != req.body.password){
            return res.json({
                msg:'incorrect password'
            })
        }

        const token = jwt.sign({email:req.body.email},secret_key,{
            expiresIn: "10h"
        })
        return res.json({
            user,
            token
        })
    }
    return res.json({
        msg:"user does not exists"
    })
   
}

export async function signup(req:Request,res:Response){
    const user = await prisma.user.findFirst({
        where:{
            email:req.body.email
        }
    })

    if(!user){
        try {
            await prisma.user.create({
                data:{
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                  
                }
            })

            return res.status(200).json({
                msg:"user created successfully"
            })
        } catch (error) {
            return res.status(400).json({
                msg:error
            })
        }
    }
    return res.json({
        msg:"user already exists"
    })
  
}

export async function getUserData(req:Request,res:Response){
   
   try {
    const user = await prisma.user.findFirst({
        where:{
            id:req.body.id
        },
        include:{
            books: true
        }
    })

    if(user) return res.json({
        user
    })

    return res.json({
        msg:"user does not exist"
    })
   } catch (error) {
    res.json({
        error
    })
   }
}