import React, {useState, useEffect} from 'react'
import './DoctorDetails.css'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import {CircularProgress} from '@mui/material'

const DoctorDetails = () => {
  const {doctorId} = useParams()
  const [doctor, setDoctor] = useState(null)

  useEffect(() => {
    async function fetchDoctorDetails() {
      try {
        const response = await axios.get(
          `https://pearl-thoughts-assignment.vercel.app/api/doctors/${doctorId}`,
        )
        setDoctor(response.data)
      } catch (error) {
        console.error('Error fetching doctor details:', error)
      }
    }

    fetchDoctorDetails()
  }, [doctorId])

  return (
    <div className="custom-doctor-details-container">
      {doctor ? (
        <>
          <div>
            <img
              src={doctor.image}
              alt={doctor.name}
              className="custom-doctor-image"
            />
          </div>
          <div className="custom-doctor-details">
            <h1 className="custom-heading-1">Doctor Details</h1>
            <h2 className="custom-heading-2">Name: {doctor.name}</h2>
            <p className="custom-paragraph">
              Specialization: {doctor.specialization}
            </p>
            <p className="custom-paragraph">Location: {doctor.location}</p>
            <p className="custom-paragraph">Email: {doctor.email}</p>
            <p className="custom-paragraph">Phone: {doctor.phone}</p>
            <p className="custom-paragraph">
              Max Patients: {doctor.maxPatients}
            </p>
            <h3 className="custom-heading-3">Schedule</h3>
            <ul className="custom-list">
              {doctor.schedule.map((scheduleItem, index) => (
                <li key={index} className="custom-list-item">
                  {scheduleItem.dayOfWeek}: {scheduleItem.startTime} -{' '}
                  {scheduleItem.endTime}
                </li>
              ))}
            </ul>
            <h3 className="custom-heading-3">Additional Information</h3>
            <p className="custom-paragraph">Education: {doctor.education}</p>
            <p className="custom-paragraph">
              Experience: {doctor.experience} years
            </p>
            <p className="custom-paragraph">
              Languages Spoken:{' '}
              {doctor.languages ? doctor.languages.join(', ') : 'N/A'}
            </p>
            <Link to="/appointment" className="book-appointment-button-details">
              Book Appointment
            </Link>
          </div>
        </>
      ) : (
        <p className="custom-paragraph">
          {' '}
          <CircularProgress />
        </p>
      )}
    </div>
  )
}

export default DoctorDetails
