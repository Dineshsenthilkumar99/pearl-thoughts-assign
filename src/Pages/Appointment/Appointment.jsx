import React, {useState, useEffect} from 'react'
import './Appointment.css'
import axios from 'axios'
import {useLocation} from 'react-router-dom'
import './Calendar.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const Appointment = () => {
  const [formData, setFormData] = useState({
    doctor: '',
    patientName: '',
    patientPhone: '',
    patientAddress: '',
    doctorName: '',
    appointmentDate: '',
    appointmentTime: '',
  })

  const [doctors, setDoctors] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [doctorSchedule, setDoctorSchedule] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)

  const isTimeWithinRange = time => {
    const selectedTime = new Date(`2000-01-01T${time}`)
    const startTime = new Date(`2000-01-01T17:00`)
    const endTime = new Date(`2000-01-01T20:00`)
    return selectedTime >= startTime && selectedTime <= endTime
  }

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          'https://pearl-thoughts-assignment.vercel.app/api/doctors',
        )
        setDoctors(response.data)
      } catch (error) {
        console.error('Error fetching doctors:', error)
      }
    }

    fetchDoctors()
  }, [])

  const location = useLocation()
  const {doctorName: selectedDoctorName} = location.state || {}

  useEffect(() => {
    // Set the selected doctor's name from location state
    if (selectedDoctorName) {
      setFormData({
        ...formData,
        doctorName: selectedDoctorName,
      })
    }
  }, [formData, selectedDoctorName])

  const handleDateChange = date => {
    // Calculate the next available date within the doctor's schedule
    const currentDate = date
    while (
      !doctorSchedule.includes(
        currentDate.toLocaleDateString('en-US', {weekday: 'long'}),
      )
    ) {
      currentDate.setDate(currentDate.getDate() + 1) // Move to the next day
    }

    // Set the selected date in the state
    setSelectedDate(currentDate)

    // Set the selected date in the formData
    setFormData({
      ...formData,
      appointmentDate: currentDate.toISOString(),
    })
  }

  const handleChange = e => {
    const {name, value} = e.target

    if (name === 'doctor') {
      const selectedDoctor = doctors.find(doc => doc._id === value)
      setFormData({
        ...formData,
        doctor: value,
        doctorName: selectedDoctor ? selectedDoctor.name : '',
      })

      // Extract the doctor's schedule for date validation
      const doctorSchedule = selectedDoctor
        ? selectedDoctor.schedule.map(item => item.dayOfWeek)
        : []
      setDoctorSchedule(doctorSchedule)
    } else {
      setFormData({...formData, [name]: value})
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!isTimeWithinRange(formData.appointmentTime)) {
      setErrorMessage('Appointment time must be between 5:00 PM and 8:00 PM.')
      return
    }

    try {
      const response = await axios.post(
        'https://pearl-thoughts-assignment.vercel.app/api/appointments',
        formData,
      )

      console.log('Created Appointment:', response.data)

      setSuccessMessage('Appointment created successfully!')
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)

      // Clear all form fields and reset selected date
      setFormData({
        doctor: '',
        patientName: '',
        patientPhone: '',
        patientAddress: '',
        doctorName: '',
        appointmentDate: '',
        appointmentTime: '',
      })
      setSelectedDate(null)
    } catch (error) {
      console.error('Error creating appointment:', error)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  return (
    <div className="fromBg">
      <h1 className="page-title">Schedule an Appointment</h1>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="doctor" className="label">
            Select Doctor:
          </label>
          <select
            id="doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            className="select-input"
            required
          >
            <option value="">Select a Doctor</option>
            {doctors.map(doc => (
              <option key={doc._id} value={doc._id} className="select-option">
                {doc.name} - {doc.specialization}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="patientName" className="label">
            Patient Name:
          </label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="text-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="patientPhone" className="label">
            Patient Phone:
          </label>
          <input
            type="text"
            id="patientPhone"
            name="patientPhone"
            value={formData.patientPhone}
            onChange={handleChange}
            className="text-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="patientAddress" className="label">
            Patient Address:
          </label>
          <input
            type="text"
            id="patientAddress"
            name="patientAddress"
            value={formData.patientAddress}
            onChange={handleChange}
            className="text-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="appointmentDate" className="label">
            Select Appointment Date:
          </label>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate || new Date()}
            tileDisabled={({date}) =>
              !doctorSchedule.includes(
                date.toLocaleDateString('en-US', {
                  weekday: 'long',
                }),
              )
            }
            className="custom-calendar"
          />
        </div>

        <div className="selected-date">
          {selectedDate && (
            <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="appointmentTime" className="label">
            Appointment Time (5:00 PM - 8:00 PM):
          </label>
          <input
            type="time"
            id="appointmentTime"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            className="time-input"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Schedule Appointment
        </button>
      </form>
    </div>
  )
}

export default Appointment
