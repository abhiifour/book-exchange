import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { useEffect } from "react";
import { fetchBooks } from "../store/slice/bookSlice";
// import { fetchExchange } from "../store/slice/exchangeSlice";
import { AppDispatch } from "../store/store"; // Import types

export default function Explore() {
  const dispatch: AppDispatch = useDispatch();
  const { books, status } = useSelector((state: any) => state.books);
  const user = useSelector((state:any) => state.userState.user)
  
  useEffect(() => {
    dispatch(fetchBooks({token: user.token}));
    // dispatch(fetchExchange()); // If needed
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("Updated books:", books);
  // }, [books]);

  return (
    <div className="w-full font-Inter">
      <h1 className="md:text-[28px] text-[22px]">Explore</h1>
      <div className="px-4 py-6 flex flex-wrap items-center justify-center md:justify-start gap-4 auto-rows-fr">
        {status === "loading" ? (
          <div className="w-full text-center py-[200px]">Loading ...</div>
        ) : books?.length > 0 ? (
          books?.map((item : any) => (
            <Card
              key={item.id}
              id={item.id}
              genre={item.genre}
              image={item.image}
              title={item.title}
              author={item.author}
              price={item.price}
              addedBy={item.user?.id ?? "Unknown"}
            />
          ))
        ) : (
          <div className="w-full text-center py-[200px]">No books found</div>
        )}
      </div>
    </div>
  );
}
