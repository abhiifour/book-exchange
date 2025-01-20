import { createSlice } from "@reduxjs/toolkit";

type Book = {
    id: string;
    title: string;
    author: string;
    price: string;
    image: string;
    genre: string;
    userId: string;
    user: {
        id: string;
        name: string;
    }
    exchanges: string;
}

type Exchange = {
    id : string;
    fromuser : string;
    toUser : string ;
    message : string ;
    status : string ;
    book : Book ;
}


type UserState = {
    user: {
        id: string;
        email: string;
        name: string;
        books: Book[];
        token: string;
        preferences : string [];
        sentExchanges : Exchange[];
        receivedExchanges: Exchange[]
    };
  
}

const initialState: UserState = {
    user: {
        id: '',
        email: '',
        name: '',
        books: [],
        token: '',
        preferences:[],
        sentExchanges:[],
        receivedExchanges:[]
    },
}



export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        updateUser:(state,action)=>{
          
            state.user.email = action.payload.email;
            state.user.books = action.payload.books;
            state.user.name = action.payload.name;
            state.user.id = action.payload.id;
            state.user.preferences = action.payload.preferences;
            state.user.token = action.payload.token;
            state.user.sentExchanges = action.payload.sentExchanges
            state.user.receivedExchanges = action.payload.receivedExchanges
            // console.log(state.user)
        },
        updateReceivedExchanges: (state,action) =>{
        // console.log("hit")
        const exchange = state.user.receivedExchanges.find(
            (exchange) => exchange.id === action.payload.id
          );
          if (exchange) {
            exchange.status = action.payload.status;
          }
        },
        removeMyBook : (state,action) => {
            state.user.books = state.user.books.filter((book) => book.id !== action.payload.id)
        },
        addMyBook :(state,action)=>{
            state.user.books.push(action.payload)
        },
        addPreferences : (state,action) => {
            state.user.preferences = action.payload
        }
  
    },
   
});

export const { updateUser,updateReceivedExchanges ,removeMyBook , addMyBook , addPreferences } = userSlice.actions;
export default userSlice.reducer;