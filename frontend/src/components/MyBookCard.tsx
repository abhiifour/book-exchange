// import { useState } from 'react'
import axios from 'axios';
import image from '../assets/10.jpg'
// import axios from 'axios';
// import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { removeMyBook } from '../store/slice/userSlice';

export default function MyBookCard({id,title,author,price}:{id:string,title:string,author:string,price:string}){
    // const [interested , setInterested] = useState(false);
    // const user = useSelector((state:any) => state.userState.user)
    // const [textMessage,setTextMessage] = useState("")
    const dispatch = useDispatch()
    async function handleDelete(){
        const res = await axios.post(`http://localhost:3000/books/${id}`,{},{
            headers:{
                Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlpZm91ckBnbWFpbC5jb20iLCJpYXQiOjE3MzcyNzczMzcsImV4cCI6MTczNzMxMzMzN30.PA4Yn8jtIeFwnsFt0tU3TKdTHsw4yoka772GALDLSVo`
            }
        })
        console.log(res.data)
        if(res){
            dispatch(removeMyBook({id}))
        }
    }

    return (
        <div className="font-Inter w-[258px] border rounded-xl  overflow-hidden py-4 shadow-lg">
            <div className='w-full h-[200px] m-auto relative'>
                <img src={image} alt="" className='w-full h-full object-contain'/>
                <span className='text-[13px] border rounded-full px-2 py-1 absolute top-1 right-4 bg-white bg-opacity-70 backdrop-blur-sm'>Fantasy</span>
            </div>
            <div className='mt-4 px-4'>
              <h2 className=' text-[18px] font-semibold'>{title}</h2>
              <p className='text-[16px] font-Inter'>{author}</p>
            </div>
            <div className='flex items-center justify-between px-4'>
            <div className='font-semibold'>${price}</div>
            <div className='text-[24px] cursor-pointer' onClick={handleDelete}><MdDelete/></div>
        </div>
        
             
        </div>
    )
} 