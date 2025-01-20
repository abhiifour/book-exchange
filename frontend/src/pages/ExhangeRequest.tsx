import { useSelector } from "react-redux";
import ExchangeCard from "../components/ExchangeCard";
// import axios from "axios";

export default function ExchangeRequest(){
  const user = useSelector((state:any) => state.userState.user)
  // const { books, status }= useSelector((state: any) => state.books);


//   async function updateExchangeStatus(status:any){
//     const response = await axios.get(`http://localhost:3000/exchange/${user.id}`,{
//         headers:{
//             Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlpZm91ckBnbWFpbC5jb20iLCJpYXQiOjE3MzcyNzczMzcsImV4cCI6MTczNzMxMzMzN30.PA4Yn8jtIeFwnsFt0tU3TKdTHsw4yoka772GALDLSVo"
//         }
//     })
// }


  
  // console.log(user)
    return (
        <div className="w-full font-Inter">
          <h1 className="md:text-[28px] text-[22px]">Exchange Requests</h1>
          <div className="px-4 py-6 flex flex-wrap gap-4">
            {
              user?.receivedExchanges?.length > 0 ?
              user?.receivedExchanges.slice().reverse().map((item : any) => <ExchangeCard key={item.id} id={item.id} message={item.message}  status ={item.status}/>) :
              <div className="text-center w-full flex items-center justify-center h-[300px]">
              No Exchange requests 
              </div>
            }
         
          </div>
        </div>
    )
}