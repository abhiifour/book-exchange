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
                const book = yield prisma.book.create({
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
                    book
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
// export async function getMatchedBooks(req: Request, res: Response): Promise<any> {
//     try {
//         // First get the user's book genres
//         const user = await prisma.user.findFirst({
//             where: {
//                 id: req.params.id
//             },
//             include: {
//                 books: {
//                     select: {
//                         genre: true
//                     }
//                 }
//             }
//         });
//         console.log("User => ", user)
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         // Extract unique genres from user's books
//         const myPreferences = [...new Set(user.books.map(book => book.genre))];
//         console.log("User => ", myPreferences)
//         const allPreferences = [...new Set([...myPreferences, ...(user.preferences || [])])];
//         console.log("User => ", allPreferences)
//         // Get books that match preferences but aren't created by the user
//         const preferenceBooks = await prisma.book.findMany({
//             where: {
//                 genre: {
//                     in: allPreferences
//                 }
//             },
//             include: {
//                 user: true
//             }
//         });
//         console.log(preferenceBooks)
//         return res.json({
//             preferenceBooks
//         });
//     } catch (error) {
//         console.error('Error in getMatchedBooks:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// }
function getMatchedBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            // First get the user's book genres
            const userId = req.params.id;
            const user = yield prisma.user.findFirst({
                where: {
                    id: userId
                },
                include: {
                    books: {
                        select: {
                            genre: true
                        }
                    }
                }
            });
            console.log("Found user:", user === null || user === void 0 ? void 0 : user.id);
            console.log("User's books:", user === null || user === void 0 ? void 0 : user.books);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            // Extract unique genres from user's books
            const myPreferences = [...new Set(user.books.map(book => book.genre))];
            console.log("Extracted genres:", myPreferences);
            // Safely combine preferences
            const allPreferences = [
                ...myPreferences,
                ...(((_a = user.preferences) === null || _a === void 0 ? void 0 : _a.length) ? user.preferences : [])
            ];
            console.log("All preferences:", allPreferences);
            // Verify we have preferences to search with
            if (allPreferences.length === 0) {
                return res.json({
                    preferenceBooks: [],
                    message: "No preferences found to match against"
                });
            }
            // Get books that match preferences but aren't created by the user
            const preferenceBooks = yield prisma.book.findMany({
                where: {
                    AND: [
                        {
                            OR: allPreferences.map(genre => ({
                                genre: {
                                    equals: genre,
                                    mode: 'insensitive'
                                }
                            }))
                        },
                        {
                            userId: {
                                not: userId
                            }
                        }
                    ]
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
            console.log("Found matching books:", preferenceBooks.length);
            return res.json({
                preferenceBooks,
                matchedGenres: allPreferences
            });
        }
        catch (error) {
            console.error('Error in getMatchedBooks:', error);
            return res.status(500).json({
                error: 'Internal server error',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    });
}
