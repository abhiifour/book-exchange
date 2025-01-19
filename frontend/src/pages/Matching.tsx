import {  useSelector } from "react-redux";
import Card from "../components/Card";
// import { fetchMatchedBooks } from "../store/slice/matchedBookSlice";
import { useEffect, useState } from "react";
import axios from "axios";
// import { string } from "zod";

export default function Matching(){
  // const dispatch : any= useDispatch();
    const user= useSelector((state:any) => state.userState.user)
    // const {matchedBooks , status} : any = useSelector((state:any) => state.matchedBookState)

    type MatchedBook ={
      id : string;
      title : string;
      author: string;
      price: string;
      addedBy : string;
    }

    const [matchedBooks ,setMatchedBooks] = useState<MatchedBook [] | null>(null)

    useEffect(()=>{
      async function getMatchedData(){
        const response = await axios.get(`http://localhost:3000/books/matched/${user.id}`, {
          headers: {
              Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlpZm91ckBnbWFpbC5jb20iLCJpYXQiOjE3MzczMTM2NzcsImV4cCI6MTczNzM0OTY3N30.DzVfOvZdeWrCCW1Hi5qLOK2r6iyxn6uCoRyXEqiY_FI"
          }
        });
        console.log(response.data)

        setMatchedBooks(response.data.preferenceBooks)
      }

      getMatchedData()
    },[])
    


    
    // useEffect(()=>{
    //   console.log(matchedBooks)
    // },[matchedBooks])
    return (
        <div className="w-full font-Inter">
          <h1 className="text-[28px]">Matched by your preferences</h1>
          <div className="px-4 py-6 flex flex-wrap gap-4">

          { status === "loading" ? (
                   <div className="w-full text-center">Loading ...</div>
                 ) : matchedBooks?.length > 0 ? (
                  matchedBooks?.map((item : any) => (
                     <Card
                       key={item.id}
                       id={item.id}
                       title={item.title}
                       author={item.author}
                       price={item.price}
                       addedBy={item.user?.name ?? "Unknown"}
                     />
                   ))
                 ) : (
                   <div className="w-full text-center h-[300px] flex items-center justify-center">No books found</div>
                 )}
          </div>
        </div>
    )
}