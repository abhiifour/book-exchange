import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import * as z from "zod";


import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

// ✅ Updated validation schema with genre
const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.string().min(1, "Genre is required"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().positive("Price must be greater than 0").min(1, "Price is required")
  ),
  image: z
    .custom<File>((val) => val instanceof File, "Image file is required")
});

type BookFormData = z.infer<typeof bookSchema>;

function AddBooks() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });
  const user = useSelector((state:any) => state.userState.user)
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const genres = [
    "Fiction",
    "Non-fiction",
    "Mystery",
    "Science Fiction",
    "Fantasy",
    "Romance",
    "Thriller",
    "Horror",
    "Historical Fiction",
    "Biography",
    "Self-help",
    "Poetry",
    "Drama",
    "Adventure",
    "Children's Literature"
  ];

  const navigate = useNavigate()
  // ✅ Handle Drag & Drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ✅ Handle File Selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async(data: BookFormData) => {
    const imgData = new FormData();
    
    imgData.append("file", data.image);
    imgData.append("upload_preset", "first_time");
    
    const res = await fetch("https://api.cloudinary.com/v1_1/djn8q3ywh/upload", {
      method: "POST",
      body: imgData,
    });

    
    const imageData = await res.json();
    const imageUrl = imageData.secure_url;
    
    console.log("Image URL:", imageUrl);
    console.log("Book Data:", data);

    const response = await axios.post("http://localhost:3000/books",{
      title:data.title,
      author:data.author,
      price:JSON.stringify(data.price),
      imageUrl: imageUrl,
      userId: user.id,
      genre: data.genre
    },{
      headers:{
        Authorization:`Bearer ${user.token}`
      }
    })
    console.log(response.data)
    navigate('/explore')
    // alert("Book added successfully!");
};

  return (
    <div className="font-Inter">
      <h1 className="text-[28px]">Add a book</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[700px] flex flex-col gap-6 mt-6">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="block font-semibold">Title</label>
          <input 
            {...register("title")} 
            className="border p-2 w-full rounded-lg" 
            placeholder="Enter book title" 
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Author */}
        <div className="flex flex-col gap-2">
          <label className="block font-semibold">Author</label>
          <input 
            {...register("author")} 
            className="border p-2 w-full rounded-lg" 
            placeholder="Enter author name" 
          />
          {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
        </div>

        {/* Genre Select */}
        <div className="flex flex-col gap-2">
          <label className="block font-semibold">Genre</label>
          <select
            {...register("genre")}
            className="border p-2 w-full rounded-lg bg-white"
          >
            <option value="">Select a genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre.toLowerCase()}>
                {genre}
              </option>
            ))}
          </select>
          {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label className="block font-semibold">Price</label>
          <input
            {...register("price")}
            type="number"
            className="border p-2 w-full rounded-lg"
            placeholder="Enter price"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Drag and Drop Image Upload */}
        <div
          className="border-2 border-dashed p-6 text-center rounded-md cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <p className="text-gray-500">Drag & drop an image here, or click to select one</p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-24 mx-auto rounded-lg shadow-md" />}
        </div>
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

        {/* Submit Button */}
        <button type="submit" className="bg-black text-white px-4 py-2 rounded-full w-[150px]">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddBooks;



