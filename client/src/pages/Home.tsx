import { useEffect, useState } from "react"
import Navbar1 from '../components/Navbar1'
import LibrarySide from '../components/LibrarySide'
import Navbar2 from "../components/Navbar2"
import Content from "../components/Content"

const Home = () => {
    return(
    <div className='flex bg-black h-screen'>
        <div className='w-1/5 flex flex-col m-2 gap-2'>
        <Navbar1 />
        <LibrarySide />
      </div>
      <div className='w-4/5 flex flex-col my-2'>
        <Navbar2 />
        <Content />
      </div>
      {/* <div className="absolute bottom-0 w-full bg-white p-2">Play Area</div> */}
    </div>
)}
  
  export default Home