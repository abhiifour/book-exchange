import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { GiCardExchange } from "react-icons/gi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/slice/userSlice";

export default function NavBar(){
    const navigate = useNavigate()
    const [openModal,setOpenModal] = useState(false)
    const dispatch = useDispatch()

    function handleLogout (){
        dispatch(updateUser({
            email : "",
            books : "",
            name :"",
            id : "",
            token : "",
            sentExchanges: [],
            receivedExchanges : []
        }))
    }
    return (
        <div className="w-full font-Inter ">
        {/* nav */}
        <div className="flex justify-between py-4 ">
            <div className="md:flex gap-8 items-center">
            <h1 className="md:text-[32px] font-bold tracking-tighter text-[24px]">Rebooked</h1>
            <div className="flex gap-2 items-center text-[16px] tracking-tighter">
                <button onClick={() => navigate("/explore")} className="hover:underline">Explore</button>
                <button onClick={() => navigate("/matched")} className="hover:underline ">Matched</button>

            </div>
            </div>
             <div className="flex gap-4 items-center">
                <input type="text" className="text-18px placeholder:text-gray-600 rounded-full px-6 py-3 bg-gray-200 placeholder:font-thin w-[400px] hidden md:block" placeholder="Search by title, author" />
                <div className="text-[20px] cursor-pointer" onClick={() => navigate("/request")}>
                    <GiCardExchange />
                </div>
                
                <div className="text-[32px] cursor-pointer relative  "  onClick={() => setOpenModal(!openModal)}>
                    <RxAvatar  />
                    {openModal && (
                    <div className="text-[18px] bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 absolute  z-10 top-9 right-0 w-[180px]">
                        <ul>
                            <li className="py-1 cursor-pointer hover:bg-gray-100 rounded-md px-2" onClick={() => navigate('/addbook')}>Add Book</li>
                            <li className="py-1 cursor-pointer hover:bg-gray-100 rounded-md px-2" onClick={() => navigate('/preferences')}>Preferences</li>
                           
                            <li className="py-1 cursor-pointer hover:bg-gray-100 rounded-md px-2" onClick={() => navigate('/mybooks')}>My Book</li>
                            <li className="py-1 cursor-pointer hover:bg-gray-100 rounded-md px-2" onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                    )}
                </div>

               
             </div>
        </div>
       
        </div>
    )
}