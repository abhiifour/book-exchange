import { Router } from "express";
import { createBook,getMatchedBooks, deleteBook, editBook, getABook, getBooks } from "../controllers/bookController";

const route = Router()


route.get('/:id',getABook)
route.get('/',getBooks)
route.get('/matched/:id',getMatchedBooks)

route.post('/',createBook)
route.post('/:id',deleteBook)
route.put('/:id',editBook)

export default route;




