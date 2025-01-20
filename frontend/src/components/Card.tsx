import { useState } from 'react'
// import image from '../assets/10.jpg'
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Card({id,title,author,price,addedBy,image,genre}:{id:string,title:string,author:string,price:string,addedBy:string,image:string,genre:string}){
    const [interested , setInterested] = useState(false);
    const user = useSelector((state:any) => state.userState.user)
    const [textMessage,setTextMessage] = useState("")
    async function createExchange(){
        await axios.post("https://book-exchange-ya7s.onrender.com/exchange",{
            fromUserId:user.id,
            toUserId : addedBy,
            bookId : id,
            message: textMessage

        },{
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        })
    }
    return (
        <div className="font-Inter w-[258px] min-h-fit border rounded-xl  overflow-hidden py-4 shadow-lg">
            <div className='w-full h-[200px] m-auto relative'>
                <img src={image} alt="" className='w-full h-full object-contain'/>
                <span className='text-[13px] border rounded-full px-2 py-1 absolute top-1 right-4 bg-white bg-opacity-70 backdrop-blur-sm'>{genre}</span>
            </div>
            <div className='mt-4 px-4'>
              <h2 className=' text-[16px] font-medium '>{title}</h2>
              <p className='text-[14px] font-Inter  text-gray-500'>{author}</p>
            </div>
            <div className='flex items-center justify-between px-4 my-2'>
            <div className='text-[14px]'>₹ {price}</div>
            {   user.id !== addedBy && !interested ? <div className='bg-black text-white text-center py-2 w-[100px] rounded-full text-[12px] cursor-pointer hover:bg-gray-800' onClick={() => setInterested(!interested)}>
                 Interested
                 </div>: ""
                 
            }
            
            </div>
            {
            interested ?  
            <textarea placeholder='Send request with a message ..' className='mx-4 p-4 rounded-xl border my-2 resize-none text-[14px]' value={textMessage} onChange={(e) => setTextMessage(e.target.value)}></textarea>
             : ''
            }
            {
                interested ? <div className='bg-black text-white text-center py-2 w-[100px] rounded-full text-[12px] cursor-pointer hover:bg-gray-800 mx-4' onClick={() => {setInterested(!interested)
                    createExchange()
                }
                   
                }>
                    Send
                </div> : ""
            }
             
             
        </div>
    )
} 