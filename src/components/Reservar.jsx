import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const availableDays = ["2024-11-01", "2024-11-03", "2024-11-05"];
  const timesByDay = {
    "2024-11-01": ["09:00", "11:00", "14:00"],
    "2024-11-03": ["10:00", "13:00", "15:00"],
    "2024-11-05": ["08:00", "12:00", "16:00"],
  };

  const handleDateChange = (date) => {
    const dateStr = date.toISOString().slice(0, 10);
    setSelectedDate(dateStr);
    setAvailableTimes(timesByDay[dateStr] || []);
    setSelectedTime(null);
  };

  const isDayAvailable = (date) => {
    const dateStr = date.toISOString().slice(0, 10);
    return availableDays.includes(dateStr);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleReserveClick = () => {
    setShowConfirmation(true); // Muestra el popup de confirmación
  };

  const handleConfirmReservation = () => {
    setShowConfirmation(false);
    alert(`Reserva confirmada para ${selectedDate} a las ${selectedTime}`);
  };

  const handleClosePopup = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="bg-breadcrumb">
        <h1>RESERVAR</h1>
      </div>

      <div className="booking-calendar-container mt-3 mb-5">
        <h3 className="mt-3 mb-5">Selecciona un día para reservar:</h3>
        <div className="calendar-times-wrapper">
          <Calendar
            onChange={handleDateChange}
            tileDisabled={({ date }) => !isDayAvailable(date)}
          />
          {selectedDate && (
            <div className="times-container">
              <h4>Horarios disponibles para el {selectedDate}:</h4>
              <div className="times-grid">
                {availableTimes.length > 0 ? (
                  availableTimes.map((time) => (
                    <div
                      key={time}
                      className={`time-card ${
                        selectedTime === time ? "selected" : ""
                      }`}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </div>
                  ))
                ) : (
                  <p>No hay horarios disponibles para esta fecha.</p>
                )}
              </div>
              <button
                className="reserve-button"
                disabled={!selectedTime}
                onClick={handleReserveClick}
              >
                Reservar ahora
              </button>
            </div>
          )}
        </div>

        {/* Popup de confirmación */}
        {showConfirmation && (
          <div className="confirmation-popup">
            <div className="popup-content">
              <h4 className="text-center">Confirmar Reserva</h4>
              <p>Día seleccionado: {selectedDate}</p>
              <p>Hora seleccionada: {selectedTime}</p>
              <div className="popup-buttons">
                <button
                  onClick={handleConfirmReservation}
                  className="confirm-button"
                >
                  Confirmar reserva
                </button>
                <button onClick={handleClosePopup} className="cancel-button">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingCalendar;
