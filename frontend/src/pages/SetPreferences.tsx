import  { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router';

const SetPreferences = () => {
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

  const user = useSelector((state: any) => state.userState.user)


  const [selectedGenres, setSelectedGenres] = useState([...user.preferences]);

  const toggleGenre = (genre : any) => {
    setSelectedGenres((prev : any) => 
      prev.includes(genre)
        ? prev.filter((g:any) => g !== genre)
        : [...prev, genre]
    );
  };

  const navigate = useNavigate()

  async function handleUpdate(){
    
    const response = await axios.post("https://book-exchange-ya7s.onrender.com/setPreferences",{
        id:user.id,
        preferences : selectedGenres
      },{
        headers:{
          Authorization:`Bearer ${user.token}`
        }
      })

    console.log(response.data)

    navigate('/explore')
    }

    

  return (
    <div className="w-full max-w-2xl p-6 space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Select Your Preferred Genres</h2>
        <p className="text-gray-600">Choose as many as you like</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {genres.map((genre : string) => (
          <button
            key={genre}
            onClick={() => toggleGenre(genre)}
            className={`
              flex items-center justify-between p-3 rounded-lg border transition-all
              ${selectedGenres.includes(genre)
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            <span className="font-medium">{genre}</span>
            {selectedGenres.includes(genre) ? (
              <Check size={18} className="text-blue-500" />
            ) : (
              <X size={18} className="text-gray-400" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="font-medium">Selected ({selectedGenres.length}):</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedGenres.map(genre => (
            <span
              key={genre}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      <button className='px-6 rounded-lg py-2 bg-black text-white ' onClick={handleUpdate}>Save</button>
    </div>
  );
};

export default SetPreferences;