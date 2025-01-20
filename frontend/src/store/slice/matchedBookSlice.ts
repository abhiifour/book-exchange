import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios';

type Book = {
    id : string;
    title : string;
    author : string ;
    price : string ;
    image : string ;
    genre : string ;
    userId : string;
    user : {
        id: string;
        name : string
    }
    exchanges : string;
}


// actions

export const fetchMatchedBooks = createAsyncThunk("fetchMatchedBooks", async ({id}:{id:string}) =>{
   
    const response = await axios.get(`https://book-exchange-ya7s.onrender.com/books/matched/${id}`, {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlpZm91ckBnbWFpbC5jb20iLCJpYXQiOjE3MzczMTM2NzcsImV4cCI6MTczNzM0OTY3N30.DzVfOvZdeWrCCW1Hi5qLOK2r6iyxn6uCoRyXEqiY_FI"
        }
    });
    // console.log(response.data)
    return response.data;
})

const initialState  = {
    matchedBooks: [] as Book[] ,
    status:''
}

export const matchedBooks = createSlice({
    name:"matchedBooks",
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{
        builder
        .addCase(fetchMatchedBooks.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchMatchedBooks.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            state.matchedBooks = action.payload.preferenceBooks;
        })
    }
})

export default matchedBooks.reducer;