import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import './Navbar.css'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="link">
          <h1>Clinic</h1>
        </Link>
      </div>
      <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="links-ui">
          <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/doctors" className="link">
              Doctors
            </Link>
          </li>
          <li>
            <Link to="/appointment" className="link">
              Appointment
            </Link>
          </li>
          <li>
            <Link to="/appointments" className="link">
              All Appointments
            </Link>
          </li>
        </ul>
      </div>
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        <MenuIcon /> {/* Use the MenuIcon from Material-UI */}
      </div>
    </nav>
  )
}

export default Navbar
