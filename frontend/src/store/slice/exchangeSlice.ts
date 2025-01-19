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


type Exchange = {
    id : string;
    fromuser : string;
    toUser : string ;
    message : string ;
    status : string ;
    book : Book ;
}



// actions

export const fetchExchange = createAsyncThunk("fetchExchange", async () =>{
    const response = await axios.get("http://localhost:3000/exchange",{
        headers:{
            Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlpZm91ckBnbWFpbC5jb20iLCJpYXQiOjE3MzczMTM2NzcsImV4cCI6MTczNzM0OTY3N30.DzVfOvZdeWrCCW1Hi5qLOK2r6iyxn6uCoRyXEqiY_FI"
        }
    })
    return  response.data;
})

const initialState  = {
    exchanges: [] as Exchange[] 
}

export const exchangeSlice = createSlice({
    name:"Exchanges",
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{
        builder.addCase(fetchExchange.fulfilled,(state,action)=>{
            state.exchanges.push(action.payload);
        })
    }
})

export default exchangeSlice.reducer;