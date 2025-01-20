import { useEffect, useState } from 'react'
import image from '../assets/10.jpg'
// import axios from 'axios';
import { useSelector } from 'react-redux';
import axios from 'axios';
// import { title } from 'process';

export default function ExchangedBooks({bookId}:{bookId:string}){
    // const [interested , setInterested] = useState(false);
    const user = useSelector((state:any) => state.userState.user)
    // const [textMessage,setTextMessage] = useState("")

    type BookData = {
        title: string ,
        author: string;
        price : string;
        genre: string;
        image:string;
    }

    type ExchangeData = {
        status: string ,
        byUser: string;
       
    }
    const [bookData , setBookData] =  useState<BookData | null>(null)
    const [exchangeData , setExchangeData] = useState<ExchangeData | null>(null)

    useEffect(()=>{
         async function BookDetails(){
            const res = await axios.get(`http://localhost:3000/books/${bookId}`,{
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            })
            setBookData({
                image : res.data.book.image,
                title: res.data.book.title,
                author:res.data.book.author,
                price:res.data.book.price,
                genre : res.data.book.genre
            })
            
         }

         async function ExchangeDetails(){
            const res = await axios.get(`http://localhost:3000/exchange/${bookId}`,{
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            })
            setExchangeData({
                status: res.data.exchange.status,
                byUser:res.data.exchange.to.name,
               
            })
            
         }
         BookDetails()
         ExchangeDetails()
         console.log(bookData)
         console.log(bookId)
    },[])
    
    return (
        <div className="font-Inter w-[258px] border rounded-xl  overflow-hidden py-4 shadow-lg">
            <div className='w-full h-[200px] m-auto relative'>
                <img src={bookData?.image} alt="" className='w-full h-full object-contain'/>
                <span className='text-[13px] border rounded-full px-2 py-1 absolute top-1 right-4 bg-white bg-opacity-70 backdrop-blur-sm'>{bookData?.genre}</span>
            </div>
            <div className='mt-4 px-4'>
              <h2 className=' text-[18px] font-medium'>{bookData?.title}</h2>
              <p className='text-[16px] font-Inter text-gray-500'>{bookData?.author}</p>
            </div>
            <div className='flex items-center justify-between px-4 py-1'>
            <div className='text-[14px]'>₹ {bookData?.price}</div>
           
        </div>
        <div className='px-4 py-2 tracking-tighter'>{exchangeData?.status}</div>
        <div className='px-4 text-[14px] text-gray-500 tracking-tighter'>Book owned by {exchangeData?.byUser.toUpperCase()}</div>
             
        </div>
    )
} 