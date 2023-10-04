import React from 'react'
import './LandingPage.css'
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button'

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-page-header">
        <h3>Welcome to Our Appointment System</h3>
        <p className="content">
          Book appointments with our experienced doctors.
        </p>
        <div className="doctor-image"></div>
        <div className="doctor-info">
          <h5>Dr. John Smith</h5>
          <p className="specialization">Cardiologist</p>
        </div>
        <div className="buttons">
          {/* Link to the DoctorList page */}
          <Link to="/doctors">
            <Button className="cta-button" variant="contained" color="primary">
              Doctor List
              <i className="material-icons">list</i>
            </Button>
          </Link>
          {/* Link to the Appointment page */}
          <Link to="/appointment">
            <Button className="cta-button" variant="contained" color="primary">
              Appointment
              <i className="material-icons">schedule</i>
            </Button>
          </Link>
        </div>
      </header>
    </div>
  )
}

export default LandingPage
