import axios from "axios"
import { updateReceivedExchanges } from "../store/slice/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

export default function ExchangeCard({id,message,status}:{message:string,id:string,status:any}){
    console.log(status)
    interface ExchangeData {
        from: { name: string };
        book: { title: string; author: string };
    }
    const user = useSelector((state:any) => state.userState.user)

    const [exchangeData , setExchangeData] = useState<ExchangeData | null>(null)
    const dispatch = useDispatch()
    async function updateExchangeStatus(status:any){
        const response = await axios.put(`https://book-exchange-ya7s.onrender.com/exchange/${id}`,{
            status: status
        },{
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        })

        dispatch(updateReceivedExchanges({id,status}))
        console.log(response.data)
    }


   

    useEffect(()=>{

        async function getExchangeData(){
            const response = await axios.put(`https://book-exchange-ya7s.onrender.com/exchange`,{id},{
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            })
    
            // dispatch(updateReceivedExchanges({id,status}))
    
            console.log(response.data)
            if(response.data){
                setExchangeData({
                    from: { name: response.data.exchange.from.name },
                    book: { title: response.data.exchange.book.title, author: response.data.exchange.book.author }
                })
            }
          
        }
        getExchangeData()
    },[])



    return (
        <div className="font-Inter w-full border rounded-md  overflow-hidden py-4 shadow-sm">
            {/* <div className='w-full h-[200px] m-auto relative'>
                <img src={image} alt="" className='w-full h-full object-contain'/>
                <span className='text-[13px] border rounded-full px-2 py-1 absolute top-1 right-4 bg-white bg-opacity-70 backdrop-blur-sm'>Fantasy</span>
            </div> */}
             <div className='mt-4 px-4'>
              <h2 className=' text-[16px] font-semibold'>{exchangeData?.from?.name.toUpperCase()}</h2>
              <p className='text-[15px] font-Inter w-[600px]'>{message}</p>
            </div>
            <div className='mt-4 px-4'>
              <h2 className=' text-[16px] font-semibold'>Book :</h2>
              <p>{exchangeData?.book?.title}</p>
              <p className=' font-Inter text-[14px]'><span>Author :</span>{exchangeData?.book?.author}</p>
            </div>
            <div className='flex items-center justify-end gap-4 px-4'>

             {
                status === "Pending" ? 
                
            <div className="flex items-center justify-end gap-6 px-4">
            <div className=' text-green-500 border-2 border-green-500 bg-green-100 text-center py-2 w-[100px] rounded-full text-[12px] cursor-pointer hover:text-green-700' onClick={() => {updateExchangeStatus("Accepted")
               
            }} >
                ACCEPT
            </div>
            <div className='text-red-500 border-2 border-red-500 bg-red-50  text-center py-2 w-[100px] rounded-full text-[12px] cursor-pointer hover:text-red-700' onClick={() => {updateExchangeStatus("Rejected")
              
            }} >
                DECLINE
            </div>
            </div>
             :
            <div className="text-[16px]">
                {status}
            </div>
             }   
           

            </div>
           
        </div>
    )
}