import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Appointments.css'

function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':')
  const parsedHours = parseInt(hours, 10)
  const amOrPm = parsedHours >= 12 ? 'PM' : 'AM'
  const formattedHours = parsedHours > 12 ? parsedHours - 12 : parsedHours
  const formattedMinutes = minutes.padStart(2, '0')

  return `${formattedHours}:${formattedMinutes} ${amOrPm}`
}

const Appointments = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'https://pearl-thoughts-assignment.vercel.app/api/appointments',
        )

        // Sort the appointments in reverse order by creation time
        const sortedAppointments = response.data.reverse()

        setAppointments(sortedAppointments)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      }
    }

    fetchData()
  }, [])

  const updateStatus = async (appointmentId, newStatus) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment._id === appointmentId
          ? {...appointment, status: newStatus}
          : appointment,
      ),
    )

    try {
      await axios.put(
        `https://pearl-thoughts-assignment.vercel.app/api/appointments/${appointmentId}`,
        {
          status: newStatus,
        },
      )
    } catch (error) {
      console.error('Error updating appointment status:', error)
    }
  }

  const deleteAppointment = async appointmentId => {
    // Remove the appointment from the local state
    setAppointments(prevAppointments =>
      prevAppointments.filter(appointment => appointment._id !== appointmentId),
    )

    try {
      // Send a request to delete the appointment on the server
      await axios.delete(
        `https://pearl-thoughts-assignment.vercel.app/api/appointments/${appointmentId}`,
      )
    } catch (error) {
      console.error('Error deleting appointment:', error)
    }
  }

  return (
    <div>
      <h1>Appointments</h1>
      {loading ? (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment._id}>
                <td>{appointment.patientName}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.patientPhone}</td>
                <td>{appointment.patientAddress}</td>
                <td>
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </td>
                <td>{formatTime(appointment.appointmentTime)}</td>

                <td className={`status-${appointment.status}`}>
                  {appointment.status}
                </td>
                <td className="action-buttons">
                  {appointment.status === 'scheduled' && (
                    <>
                      <button
                        className="cancel-button"
                        onClick={() =>
                          updateStatus(appointment._id, 'canceled')
                        }
                      >
                        Cancel
                      </button>
                      <button
                        className="complete-button"
                        onClick={() =>
                          updateStatus(appointment._id, 'completed')
                        }
                      >
                        Complete
                      </button>
                    </>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => deleteAppointment(appointment._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Appointments
