import React from 'react'
import Banner from '../components/Banner'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
// import TopDoctors from '../components/TopDoctors'
import TopVehicles from '../components/TopVehicles'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      {/* <TopDoctors/> */}
        <TopVehicles/>
        
      <Banner/>
    </div>
  )
}

export default Home
