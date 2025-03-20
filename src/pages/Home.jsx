import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Carousel from '../components/Carousel/Carousel'
import Ticket from '../components/tickets/Tickets'
import Blank from '../components/Blank'
import Footer from '../components/footer/Footer'

import { useAuth } from '../context/AuthProvider'
function Home() {
  const { user } = useAuth();
  console.log("home",user);
  return (
    <div>
      {/* <Navbar /> */}
      <Carousel/>
      {/* <Blank/> */}
      <Ticket/>
      {/* <Footer/> */}
    </div>
  )
}

export default Home
