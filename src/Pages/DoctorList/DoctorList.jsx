import React, {useState, useEffect} from 'react'
import './DoctorList.css'
import {Link} from 'react-router-dom'
import axios from 'axios'

const DoctorList = () => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true) // Added loading state

  useEffect(() => {
    // Fetch user data from your API or MongoDB
    async function fetchData() {
      try {
        const response = await axios.get(
          'https://pearl-thoughts-assignment.vercel.app/api/doctors',
        )
        setDoctors(response.data)
        setLoading(false) // Set loading to false when data is fetched
      } catch (error) {
        console.error(error)
        setLoading(false) // Set loading to false in case of an error
      }
    }

    fetchData()
  }, [])

  return (
    <div className="dl-container">
      <div className="doctor-list-container">
        <h1 className="DL-Title">Doctor Listing</h1>
        {loading ? (
          // Display a loading message while data is being fetched
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="doctor-list">
            {doctors.map((doctor, index) => (
              <div className="doctor-card" key={index}>
                <img src={doctor.image} alt={doctor.name} />
                <h2 className="docName">{doctor.name}</h2>
                <p className="DL-Text">{doctor.specialization}</p>
                <p className="DL-Text">{doctor.location}</p>
                <Link
                  to={{
                    pathname: `/appointment`,
                    state: {doctorId: doctor._id, doctorName: doctor.name},
                  }}
                  className="book-appointment-button"
                >
                  Book Appointment
                </Link>
                <Link
                  to={`/doctors/${doctor._id}`}
                  className="get-details-button"
                >
                  Get Dr. Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorList
