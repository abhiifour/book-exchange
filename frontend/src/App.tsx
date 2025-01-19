import  {Routes,Route} from "react-router-dom";
import LandingPage from "./Landing";
import AddBooks from "./pages/AddBooks";
import ExchangeRequest from "./pages/ExhangeRequest";
import Explore from "./pages/Explore";
import Matching from "./pages/Matching";
import MyBooks from "./pages/MyBooks";
// import NavBar from "./components/Navbar";
import ProtectedRoutes from "./pages/ProtectedRoutes";

export default function App(){

  
  return (
    <div className="px-[200px]">
      
      
     
      
      <Routes>
       <Route path="/" element={ <LandingPage/>}/>
       <Route element={<ProtectedRoutes />}>
       <Route  path="explore" element={<Explore/>}/>
       <Route  path="matched" element={<Matching/>}/>
       <Route  path="request" element={<ExchangeRequest/>}/>
       <Route  path="mybooks" element={<MyBooks/>}/>
       <Route  path="addbook" element={<AddBooks/>}/>
       </Route>
       
      </Routes>
    </div>
  )
}

