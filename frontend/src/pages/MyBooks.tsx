import { useNavigate } from "react-router-dom";
import MyBookCard from "../components/MyBookCard";
import { GoPlusCircle } from "react-icons/go";
import { useSelector } from "react-redux";
import ExchangedBooks from "../components/ExchangedBooks";

export default function MyBooks(){
    const navigate = useNavigate()
    const {user,status} = useSelector((state: any) => state.userState);

    console.log(user)
    return (
        <div className="w-full font-Inter">
            <div className="flex items-center justify-between">
            <h1 className="md:text-[28px] text-[22px]"> Books Added </h1>
            <div className="flex items-center gap-2">
                <div className="text-[22px] cursor-pointer" onClick={() => navigate('/addbook')}>
                    <GoPlusCircle/>
                </div>
                <button className="text-[16px] tracking-tight hover:underline underline-offset-2"  >Add a book</button>
            </div>
           
            </div>
            <div className="px-4 py-6 flex flex-wrap gap-4 justify-center items-center md:justify-start">
              {user.books?.length > 0 ? (
                user.books?.map((item : any) => (
                    <MyBookCard
                    imageUrl={item.image}
                    genre={item.genre}
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    author={item.author}
                    price={item.price}

                    />
                ))
                ) : (
                <div className="w-full text-center h-[300px] flex items-center justify-center">No books added</div>
                )}
            </div>
            <div className="flex items-center justify-between mt-4">
            <h1 className="md:text-[28px] text-[22px]"> Exchanges </h1>
            <button className="cursor-pointer text-[16px] hover:underline underline-offset-2" onClick={() => navigate('/explore')} >Explore more</button>
            </div>
            <div className="px-4 py-6 flex flex-wrap gap-4 justify-center items-center md:justify-start">
            {user.sentExchanges?.length > 0 ? (
                user.sentExchanges?.map((item : any) => (
                    <ExchangedBooks
                    key={item.id}
                    bookId={item.bookId}
                    />
                ))
                ) : (
                <div className="w-full text-center h-[300px] flex items-center justify-center">No exchanges</div>
            )}
            </div>
        </div>
    )
}