import { PrismaClient } from "@prisma/client";
import { Request,Response } from "express";


const prisma = new PrismaClient()


export async function createExchange(req:Request,res:Response):Promise<any>{

    const exchange = await prisma.exchange.findFirst({
        where:{
            fromUser : req.body.fromUserId,
            toUser:req.body.toUserId,
            bookId:req.body.bookId
        }
    })
    try {
        if(!exchange){
        await prisma.exchange.create({
            data:{
                from: {
                    connect: { id: req.body.fromUserId }, 
                },
                to:{
                    connect: { id: req.body.toUserId },
                },
                book:{
                    connect: { id: req.body.bookId },
                },
                message: req.body.message,
                status:'Pending'
                
            }
        })
        return res.json({
            msg:"exchange created "
        })
        }
        return res.json({
            msg:"exchange already exists"
        })
    } catch (error) {
        return res.json(error)
    }
   
}

export async function editExhange(req:Request,res:Response):Promise<any>{

   const exchange = await prisma.exchange.findFirst({
    where:{
        id:req.params.id
    }
   })

   if(exchange){
    try {
        const exchange = await  prisma.exchange.update({
            where:{
                id:req.params.id
            },
            data:{
                status:req.body.status
            }
        })
        return res.json({
            msg:"exchange Updated"
        })    
    } catch (error) {
        return res.json({
            error
        })
    }
   }
   return res.json({
    msg:"exchange does not exists "
   })
}

export async function getExchanges(req:Request,res:Response):Promise<any>{
     try {
        const exchanges = await prisma.exchange.findMany({
            where:{
                toUser:req.params.id
            },
            include:{
                from:true,
                to:true,
                book:true
            }
         })

         return res.json({
            exchanges
         })
     } catch (error) {
        return res.json({
            error
        })
     }
}


export async function getAExchange(req:Request,res:Response):Promise<any>{
    try {
       const exchange = await prisma.exchange.findFirst({
           where:{
               bookId:req.params.id
           },
           include:{
               from:true,
               to:true,
               book:true
           }
        })

        return res.json({
           exchange
        })
    } catch (error) {
       return res.json({
           error
       })
    }
}

export async function getExchangeBody(req:Request,res:Response):Promise<any>{
    try {
       const exchange = await prisma.exchange.findFirst({
           where:{
               id:req.body.id
           },
           include:{
               from:true,
               to:true,
               book:true
           }
        })

        return res.json({
           exchange
        })
    } catch (error) {
       return res.json({
           error
       })
    }
}