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
      genre:string;
      image:string;
    }

    const [matchedBooks ,setMatchedBooks] = useState<MatchedBook [] >([])

    useEffect(()=>{
      async function getMatchedData(){
        const response = await axios.get(`https://book-exchange-ya7s.onrender.com/books/matched/${user.id}`, {
          headers: {
              Authorization: `Bearer ${user.token}`
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
          <h1 className="md:text-[28px] text-[22px]">Matched by your preferences</h1>
          <div className="px-4 py-6 flex flex-wrap gap-4 items-center justify-center md:justify-start">

          { status === "loading" ? (
                   <div className="w-full text-center">Loading ...</div>
                 ) : matchedBooks?.length > 0 ? (
                  matchedBooks?.map((item : any) => (
                     <Card
                       key={item.id}
                       id={item.id}
                       title={item.title}
                       author={item.author}
                       image={item.image}
                       genre={item.genre}
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