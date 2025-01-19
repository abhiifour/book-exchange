"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooks = getBooks;
exports.getABook = getABook;
exports.createBook = createBook;
exports.editBook = editBook;
exports.deleteBook = deleteBook;
exports.getMatchedBooks = getMatchedBooks;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield prisma.book.findMany({
                include: {
                    user: true
                }
            });
            return res.json({
                book
            });
        }
        catch (error) {
            return res.json({
                error
            });
        }
    });
}
function getABook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield prisma.book.findUnique({
                where: {
                    id: req.params.id
                },
                include: {
                    user: true
                }
            });
            return res.json({
                book
            });
        }
        catch (error) {
            return res.json({
                error
            });
        }
    });
}
function createBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield prisma.book.findFirst({
            where: {
                title: req.body.title,
            }
        });
        console.log(book);
        if (!book) {
            try {
                yield prisma.book.create({
                    data: {
                        title: req.body.title,
                        author: req.body.author,
                        price: req.body.price,
                        image: req.body.imageUrl,
                        genre: req.body.genre,
                        user: {
                            connect: { id: req.body.userId }, // Link book to user
                        },
                    },
                });
                return res.json({
                    msg: "book added "
                });
            }
            catch (error) {
                return res.json({
                    error
                });
            }
        }
        return res.json({
            msg: "book already posted"
        });
    });
}
function editBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield prisma.book.findFirst({
            where: {
                id: req.body.id
            }
        });
        if (book) {
            try {
                yield prisma.book.update({
                    where: {
                        id: req.body.id,
                    },
                    data: {
                        title: req.body.title,
                        author: req.body.author,
                        price: req.body.price,
                        image: req.body.imageUrl,
                    }
                });
                return res.json({
                    msg: "book edited sucessfully!!"
                });
            }
            catch (error) {
                return res.json(error);
            }
        }
        return res.json({
            msg: "Book does not exist"
        });
    });
}
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.params.id);
        const book = yield prisma.book.findUnique({
            where: {
                id: req.params.id
            }
        });
        if (book) {
            try {
                yield prisma.exchange.deleteMany({
                    where: {
                        bookId: req.params.id
                    }
                });
                yield prisma.book.delete({
                    where: {
                        id: req.params.id,
                    }
                });
                return res.json({
                    msg: "book deleted !!"
                });
            }
            catch (error) {
                return res.json(error);
            }
        }
        return res.json({
            msg: "Book does not exist"
        });
    });
}
// export async function getMatchedBooks(req:Request,res:Response):Promise<any>{
//     const user = await prisma.user.findFirst({
//         where:{
//             id:req.params.id
//         },
//         include:{
//             books:true
//         }
//     })
//     let myPreferences : any[] = []
//     user?.books.forEach((item)=>{
//         myPreferences.push(item.genre)
//     })
//     const allBooks = await prisma.book.findMany({
//         where: {
//             userId: {
//                 not: req.body.id
//             }
//         },
//         include:{
//             user:true
//         }
//     })
//     const preferenceBooks = allBooks.filter((book) => {
//         return myPreferences.includes(book.genre);
//     })
//     return res.json({
//         preferenceBooks
//     })
// }
function getMatchedBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // First get the user's book genres
            const user = yield prisma.user.findFirst({
                where: {
                    id: req.params.id
                },
                include: {
                    books: {
                        select: {
                            genre: true
                        }
                    }
                }
            });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            // Extract unique genres from user's books
            const myPreferences = [...new Set(user.books.map(book => book.genre))];
            // Get books that match preferences but aren't created by the user
            const preferenceBooks = yield prisma.book.findMany({
                where: {
                    AND: [
                        {
                            genre: {
                                in: myPreferences
                            }
                        },
                        {
                            userId: {
                                not: req.params.id
                            }
                        }
                    ]
                },
                include: {
                    user: true
                }
            });
            return res.json({
                preferenceBooks
            });
        }
        catch (error) {
            console.error('Error in getMatchedBooks:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });
}
