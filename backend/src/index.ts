const express = require("express");
import { getUserData, login, signup , setPreferences} from './auth';
import { verifyToken } from './middleware/auth';
import bookRoutes from './routes/bookRoutes'
import exchangeRoutes from './routes/exchangeRoutes'
import { Request,Response } from "express"
import cors from "cors"
const app = express()
app.use(cors({ origin: "*" }));

app.use(express.json())

app.get('/ping',(req :Request,res: Response) =>{
    res.json({
        msg:"Backend is Healthy"
    })
})


app.post('/login',login)
app.post('/signup',signup)
app.post('/setPreferences',verifyToken,setPreferences)
app.post('/',verifyToken,getUserData)
app.use('/books',verifyToken,bookRoutes)
app.use('/exchange',verifyToken,exchangeRoutes)


app.listen(3000,()=>{
    console.log("Server is OK")
})