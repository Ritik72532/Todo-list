
import {Routes,Route} from "react-router-dom"
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import PageNotFound from './components/PageNotFound'
import  { Toaster } from 'react-hot-toast';
import { Navigate } from "react-router-dom";
function App() {
  
  const token = localStorage.getItem("jwt")
  return (
   <div>
   <Routes>
      <Route path ="/" element={token?<Home/> : <Navigate to = {"/login"}/> }/>
        <Route path ="/login" element={<Login/>}/>
          <Route path ="/signup" element={<Signup/>}/>
          <Route path="*" element={<PageNotFound/>} />
   </Routes>
    <Toaster />
   </div>
  )
}

export default App
