import img1 from './assets/2.jpg'
import img2 from './assets/3.jpg'
import img3 from './assets/4.jpg'
import img4 from './assets/5.jpg'
import img5 from './assets/6.jpg'
import img6 from './assets/7.jpg'
import img7 from './assets/8.jpg'
import img8 from './assets/9.jpg'
import img9 from './assets/10.jpg'
import img10 from './assets/11.jpg'
import img11 from './assets/12.jpg'
import img12 from './assets/13.jpg'
import img13 from './assets/14.jpg'
import img14 from './assets/15.jpg'
import img15 from './assets/16.jpg'
import img16 from './assets/17.jpg'
import img17 from './assets/18.jpg'
import img18 from './assets/19.jpg'
import img19 from './assets/20.jpg'
import img20 from './assets/21.jpg'
import img21 from './assets/22.jpg'
import img22 from './assets/23.jpg'
import img23 from './assets/stock1.jpg'
import img24 from './assets/24.jpg'
import { useEffect, useState } from 'react'
import Login from './components/Login'
import axios from 'axios'

const topData = [
  { url: img1 },
  { url: img2 },
  { url: img3 },
  { url: img4 },
  { url: img5 },
  { url: img6 },
  { url: img7 },
  { url: img8 },
  { url: img9 },
  { url: img10 },
  { url: img11 },
  { url: img12 },
];

const bottomData = [
{ url: img13 },
{ url: img14 },
{ url: img15 },
{ url: img16 },
{ url: img17 },
{ url: img18 },
{ url: img19 },
{ url: img20 },
{ url: img21 },
{ url: img22 },
{ url: img23 },
{ url: img24 },
]


const AuthButton = ({ children, primary = false }:{children:string,primary:boolean}) => (
  <button
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
    ${primary 
      ? 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl' 
      : 'bg-white text-black border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
    }`}
  >
    {children}
  </button>
);

const ProfileTile = ({ translateY = 0, rotate = 0 ,url}:{url:string,translateY:number,rotate:number}) => (
  
  <div 
    className="w-16 h-24 rounded-2xl bg-gray-200 shadow-lg hover:scale-105 transition-transform overflow-hidden"
    style={{
      transform: `translateY(${translateY}px) rotate(${rotate}deg)`
    }}
  >
    <img src={url} alt="books" className='w-full h-full object-fill' />
  </div>
);

const LandingPage = () => {
  // Calculate wave positions using sine function
  const [visible, setVisible] = useState(false)
  const getWavePosition = (index:any, amplitude = 20) => {
    return Math.sin(index * 0.5) * amplitude;
  };

  useEffect(()=>{
        async function wakeBackend(){
          await axios.get("http://localhost:3000/ping");
          console.log("Backend is Live")
        }
        wakeBackend()
  },[])

  return (
    <div className="min-h-screen bg-white flex flex-col md:justify-between  relative font-Inter w-full">
      {
        visible && <Login setVisible={setVisible}/>
      }
      {/* Top Row with Wave */}
      <div className="md:w-full p-8 hidden md:block ">
        <div className="flex justify-center gap-4 overflow-hidden py-[30px]">
          {bottomData.map((data, i) => (
            <ProfileTile 
              key={`top-${i}`} 
              url={data.url}
              translateY={getWavePosition(i)}
              rotate={Math.sin(i * 0.5) * 3}
            />
          ))}
        </div>
      </div>

      {/* Center Content */}
      <div className="md:flex-1 flex flex-col items-center py-[200px] md:py-0 justify-center px-4">
          
        <div className="text-center max-w-2xl md:w-[700px] w-full m-auto">
          <h1 className="md:text-6xl font-bold mb-6 text-gray-900 text-4xl md:tracking-[-4px] tracking-tighter">
            You will find yourself among us
          </h1>
          <p className="md:text-md text-gray-600 md:w-[340px] m-auto tracking-tighter text-[14px]">
            Dive into a dynamic community where readers and buyers seamlessly merge.
          </p>
        </div>
          {/* New Auth Buttons */}
          <div className="flex justify-center gap-4 md:mt-2">
            <div onClick={()=>setVisible(true)}>
            <AuthButton primary>Join now</AuthButton>
            </div>
          </div>
        
      </div>

      {/* Bottom Row with Inverse Wave */}
      <div className="w-full p-8 md:block hidden" >
        <div className="flex justify-center gap-4 overflow-hidden py-[30px]">
        {topData.map((data, i) => (
            <ProfileTile 
              key={`top-${i}`} 
              url={data.url}
              translateY={getWavePosition(i)}
              rotate={Math.sin(i * 0.5) * 3}
            />
          ))}
        </div>
      </div>

      {/* Subtle Background Elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-20" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20" />
    </div>
  );
};




export default LandingPage;




