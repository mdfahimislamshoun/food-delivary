import { Outlet } from "react-router-dom"
import Navbar from "./component/Navbar"
import Home from "./component/Home"


function App() {


  return (
  <div className="w-[95%] justify-center mx-auto bg-white">
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Home></Home>
  </div>
  )
}

export default App
