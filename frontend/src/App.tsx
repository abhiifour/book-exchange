import  {Routes,Route} from "react-router-dom";
import LandingPage from "./Landing";
import AddBooks from "./pages/AddBooks";
import ExchangeRequest from "./pages/ExhangeRequest";
import Explore from "./pages/Explore";
import Matching from "./pages/Matching";
import MyBooks from "./pages/MyBooks";
// import NavBar from "./components/Navbar";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import SetPreferences from "./pages/SetPreferences";

export default function App(){

  
  return (
    <div className="md:px-[200px] px-[10px] ">
      
      
     
      
      <Routes>
       <Route path="/" element={ <LandingPage/>}/>
       <Route element={<ProtectedRoutes />}>
       <Route  path="explore" element={<Explore/>}/>
       <Route  path="matched" element={<Matching/>}/>
       <Route  path="request" element={<ExchangeRequest/>}/>
       <Route  path="mybooks" element={<MyBooks/>}/>
       <Route  path="addbook" element={<AddBooks/>}/>
       <Route path="preferences" element={<SetPreferences/>}/>
       </Route>
       
      </Routes>
    </div>
  )
}

