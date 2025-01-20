import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios';
// import { useSelector } from "react-redux";


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

export const fetchBooks = createAsyncThunk("fetchBooks", async ({token}:{token:string}) =>{
    const response = await axios.get("https://book-exchange-ya7s.onrender.com/books",{
        headers:{
            Authorization:`Bearer ${token}`
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