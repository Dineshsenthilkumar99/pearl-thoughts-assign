import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const AppointmentCalendar = ({
  doctorAvailability,
  onDateSelect,
  onTimeSelect,
}) => {
  // Customize the calendar to display available dates and times based on doctorAvailability
  // You can use the doctorAvailability data to mark available dates and times

  return (
    <div>
      <Calendar
        onChange={onDateSelect} // Handle date selection
        value={new Date()} // Set the initial date (you can change this)
        minDetail="month" // Display the calendar by month
        tileContent={({date}) => {
          // Customize tile content to mark available dates
          const isAvailable = doctorAvailability.some(availableDate => {
            return (
              new Date(availableDate).toDateString() === date.toDateString()
            )
          })
          return isAvailable ? <p>Available</p> : null
        }}
      />
    </div>
  )
}

export default AppointmentCalendar
