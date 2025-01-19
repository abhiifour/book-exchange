import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios';
import { useSelector } from "react-redux";


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

export const fetchBooks = createAsyncThunk("fetchBooks", async () =>{
    const response = await axios.get("http://localhost:3000/books",{
        headers:{
            Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlpZm91ckBnbWFpbC5jb20iLCJpYXQiOjE3MzczMTM2NzcsImV4cCI6MTczNzM0OTY3N30.DzVfOvZdeWrCCW1Hi5qLOK2r6iyxn6uCoRyXEqiY_FI"
        }
    })
    return  response.data;
})

const initialState  = {
    books: [] as Book[] ,
    status:''
}

export const bookSlice = createSlice({
    name:"Books",
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{
        builder
        .addCase(fetchBooks.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchBooks.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            state.books = action.payload.book;
        })
    }
})

export default bookSlice.reducer;