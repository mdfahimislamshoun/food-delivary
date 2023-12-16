import { Outlet } from "react-router-dom"
import Navbar from "./component/Navbar"


function App() {


  return (
  <div className="w-[99%] justify-center mx-auto bg-white pb-10">
    <Navbar></Navbar>
    <Outlet></Outlet>
  </div>
  )
}

export default App
