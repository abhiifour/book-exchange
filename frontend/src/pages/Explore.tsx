import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { useEffect } from "react";
import { fetchBooks } from "../store/slice/bookSlice";
// import { fetchExchange } from "../store/slice/exchangeSlice";
import { AppDispatch } from "../store/store"; // Import types

export default function Explore() {
  const dispatch: AppDispatch = useDispatch();
  const { books, status } = useSelector((state: any) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
    // dispatch(fetchExchange()); // If needed
  }, [dispatch]);

  useEffect(() => {
    console.log("Updated books:", books);
  }, [books]);

  return (
    <div className="w-full font-Inter">
      <h1 className="text-[28px]">Explore</h1>
      <div className="px-4 py-6 flex flex-wrap gap-4">
        {status === "loading" ? (
          <div className="w-full text-center">Loading ...</div>
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
          <div className="w-full text-center">No books found</div>
        )}
      </div>
    </div>
  );
}
