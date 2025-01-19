import { Router } from "express";
import { createExchange, editExhange,   getAExchange,getExchangeBody} from "../controllers/exchangeController";

const route = Router()

// route.get('/:id',getExchanges)
route.post('/',createExchange)
route.put('/:id',editExhange)
route.get("/:id",getAExchange)
route.put("/",getExchangeBody)


export default route;