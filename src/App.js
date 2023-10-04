import React from 'react'
import './App.css'
import LandingPage from './Pages/LandingPage/LandingPage'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import DoctorList from './Pages/DoctorList/DoctorList'
import Appointment from './Pages/Appointment/Appointment'
import DoctorDetails from './Pages/Doctor-datails/DoctorDetails'
import Navbar from './components/Navbar/Navbar'
import Appointments from './Pages/Appointments/Appointments'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/doctors/:doctorId" element={<DoctorDetails />} />
      </Routes>
    </Router>
  )
}

export default App
