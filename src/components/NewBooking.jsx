import React, {useContext, useEffect, useState} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../style.css";
import {UserContext} from "../contexts/userContext";
import {API_BASE_URL, REQUEST_OPTIONS_GET, REQUEST_OPTIONS} from "../utils/const";
import {Alert, Form, Row, Col, Container} from "react-bootstrap";
import Loader from "./Loader";

const NewBooking = () => {
    
    // Estado para el servicio seleccionado
    const [selectedService, setSelectedService] = useState(null);
    // Estado para la fecha seleccionada
    const [selectedDate, setSelectedDate] = useState(null);
    // Estado para los horarios disponibles
    const [availableTimes, setAvailableTimes] = useState([]);
    // Estado para el horario seleccionado
    const [selectedTime, setSelectedTime] = useState(null);
    // Estado para mostrar la ventana de confirmación
    const [showConfirmation, setShowConfirmation] = useState(false);
    // Estado para las fechas disponibles
    const [availableDates, setAvailableDates] = useState([]);
    // Estado para los servicios disponibles
    const [services, setServices] = useState([]);

    // Obtener el usuario y la validez del token del contexto
    const {user, isTokenValid} = useContext(UserContext);
    // Estado para mostrar el loader
    const [isLoading,setIsLoading] = useState(true);

    // Petición para obtener los servicios y horarios disponibles
    useEffect(() => {
        fetch(`${API_BASE_URL}/services`, REQUEST_OPTIONS_GET).then((response) => response.json()).then((result) => {
            // Guardar todos los servicios
            setServices(result.services);
            setIsLoading(false);
        }).catch((error) => console.error("Error al obtener los servicios:", error));
    }, []);

    // Función para convertir los días de trabajo en fechas dentro del período de reserva
    const convertWorkDaysToDates = (workDays, reservationPeriod) => {
      // Obtener la fecha de hoy
      const today = new Date(); 
      // Crear una nueva fecha para el máximo período de reserva
      const maxDate = new Date(); 
      // Establecer la fecha máxima sumando el período de reserva
      maxDate.setDate(today.getDate() + reservationPeriod - 1); 

      // Array para almacenar las fechas disponibles
      const dates = []; 
      // Mapeo de los días de la semana a sus valores numéricos
      const dayMapping = { "lunes": 1, "martes": 2, "miércoles": 3, "jueves": 4, "viernes": 5, "sábado": 6, "domingo": 0 };

      // Iterar desde hoy hasta la fecha máxima
      for (let day = today; day <= maxDate; day.setDate(day.getDate() + 1)) {
        const weekday = day.getDay(); // Obtener el día de la semana actual
        
        // Verificar si el día de la semana actual está en los días de trabajo
        if (workDays.some(workDay => dayMapping[workDay.toLowerCase()] === weekday)) {
          // Si el día de la semana actual está en los días de trabajo, agregar la fecha al array

          //Some se utiliza para verificar si al menos uno de los elementos en el array workDays cumple con una condición específica. En este caso, la condición es que el día de la semana actual (weekday) coincida con uno de los días de trabajo (workDay) después de haber sido mapeado a su valor numérico correspondiente.

          // Agregar la fecha en formato ISO
          dates.push(new Date(day).toISOString().slice(0, 10)); 
        }
      }
      return dates; // Devolver el array de fechas disponibles
    };

    // Maneja el cambio de servicio seleccionado
    const handleServiceChange = (serviceId) => {
      // Encuentra el servicio seleccionado en la lista de servicios
      const selectedService = services.find((s) => s.service.id === parseInt(serviceId));
      // Actualiza el estado con el servicio seleccionado
      setSelectedService(selectedService);

      // Si hay un servicio seleccionado
      if (selectedService) {

        // Obtiene los días de trabajo del servicio
        // Ejemplo ["lunes", "miércoles", "viernes"];
        const workDays = selectedService.workDays.map(day => day.name);

        // Obtiene el período de reserva del servicio
        const reservationPeriod = selectedService.service.reservation_period;
        
        // Convierte los días de trabajo en fechas concretas y disponibles a mostrar en el calendario
        const serviceDates = convertWorkDaysToDates(workDays, reservationPeriod);

        // Objeto para almacenar los horarios disponibles
        const times = {};

        // Para cada fecha disponible
        serviceDates.forEach((dateStr) => {

            // Obtiene los horarios de trabajo del servicio
            const timesForDay = selectedService.workSchedules.map((schedule) => schedule.time);

            // Elimina horarios duplicados y los asigna a la fecha correspondiente
            times[dateStr] = [...new Set(timesForDay)];
              /*
              timesForDay: Es un array que contiene los horarios de trabajo del servicio para una fecha específica. Por ejemplo, ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"].

              new Set(timesForDay): El constructor Set en JavaScript crea una colección de valores únicos. Al pasar timesForDay al constructor Set, se eliminan automáticamente los valores duplicados del array.

              [...new Set(timesForDay)]: El operador de propagación (...) se utiliza para convertir el Set de nuevo en un array. Esto es necesario porque Set no es un array, y necesitamos un array para almacenar los horarios en el objeto times.

              times[dateStr]: times es un objeto que almacena los horarios disponibles para cada fecha. dateStr es una cadena que representa una fecha específica en formato ISO (por ejemplo, "2024-11-15"). Al asignar el array de horarios únicos a times[dateStr], estamos asociando esos horarios con la fecha correspondiente.
            */
        });

        // Actualiza el estado con las fechas disponibles, eliminando duplicados
        setAvailableDates([...new Set(serviceDates)]);
      }
      // Resetea la fecha seleccionada
      setSelectedDate(null);
      // Resetea los horarios disponibles
      setAvailableTimes([]);
      // Resetea el horario seleccionado
      setSelectedTime(null);
    };

    
    // Función para verificar si un día está disponible para la reserva
    const isDayAvailable = (date) => {
      // Convertir la fecha a una cadena en formato ISO (YYYY-MM-DD)
      const dateStr = date.toISOString().slice(0, 10);
      // Verificar si la fecha está en las fechas disponibles y dentro del período de reserva permitido
      return availableDates.includes(dateStr) && isWithinReservationPeriod(date);
    };

  // Función para verificar si la fecha está dentro del período de reserva permitido
  const isWithinReservationPeriod = (date) => {
    // Si no hay un servicio seleccionado, devolver false
    if (!selectedService) return false;

    // Obtener el período de reserva del servicio seleccionado
    const reservationPeriod = parseInt(selectedService.service.reservation_period, 10);

    // Obtener la fecha de hoy
    const today = new Date();

    // Crear una nueva fecha para el máximo período de reserva
    const maxDate = new Date();

    // Establecer la fecha máxima sumando el período de reserva
    maxDate.setDate(today.getDate() + reservationPeriod - 1);

    // Verificar si la fecha está dentro del período de reserva permitido
    return date >= today && date <= maxDate;
  };

    // Maneja el cambio de fecha seleccionada
    const handleDateChange = (date) => {
      // Convertir la fecha a una cadena en formato ISO (YYYY-MM-DD)
      const dateStr = date.toISOString().slice(0, 10);
      // Actualizar el estado con la fecha seleccionada
      setSelectedDate(dateStr);

      // Realizar una petición para obtener los horarios disponibles para la fecha seleccionada
      fetch(`${API_BASE_URL}/services/${selectedService.service.id}/available-times?date=${dateStr}`, REQUEST_OPTIONS_GET)
        .then((response) => response.json())
        .then((result) => {
          // Si hay horarios disponibles, actualizar el estado con los horarios
          if (result.availableTimes) setAvailableTimes(result.availableTimes);
          // Si no hay horarios disponibles, actualizar el estado con un array vacío
          else setAvailableTimes([]);
        })
        // Manejar errores
        .catch((error) => console.error("Error al obtener los horarios disponibles:", error));

      // Resetea el horario seleccionado
      setSelectedTime(null);
    };

    // Función para confirmar la reserva
    const handleConfirmReservation = () => {
      // Ocultar la ventana de confirmación
      setShowConfirmation(false);

      // Crear el cuerpo de la solicitud con los datos de la reserva
      const raw = JSON.stringify({
        id_client: user.id, 
        id_service: selectedService.service.id, 
        date: selectedDate, 
        time: selectedTime
      });

      // Realizar la solicitud para crear la reserva
      fetch(`${API_BASE_URL}/bookings`, {...REQUEST_OPTIONS, body: raw})
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          setShowConfirmation(false);
          // Redirigir o mostrar mensaje de éxito
        })
        .catch((error) => {
          console.error(error);
          // Manejar error
        });
    };

    // Maneja el cierre de la ventana de confirmación
    const handleClosePopup = () => setShowConfirmation(false);

    // Maneja la selección de un horario
    const handleTimeSelect = (time) => setSelectedTime(time);

    // Maneja el clic en el botón de reserva
    const handleReserveClick = () => setShowConfirmation(true);

    return ( <> {
        isLoading
            ? (<Loader/>)
            : !isTokenValid
                ? (
                    <Alert variant="danger" className="text-center">
                        Token inválido. Redirigiendo a la página de inicio de sesión...
                    </Alert>
                )
                : (
                    <Container className="mt-5">
                        <header className="bg-primary text-white text-center py-4 mb-4 rounded">
                            <h1>Reserva tu Servicio</h1>
                        </header>

                        <Row className="justify-content-center">
                            <Col md={6}>
                                <h3>Selecciona un servicio y una fecha:</h3>
                                <Form.Group controlId="service-select">
                                    <Form.Label>Servicio</Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange={(e) => handleServiceChange(e.target.value)}
                                        value={selectedService
                                        ? selectedService.service.id
                                        : ""}>
                                        <option value="" disabled>Selecciona un servicio</option>
                                        {services.map((service) => (
                                            <option key={service.service.id} value={service.service.id}>{service.service.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <div className="mt-4">
                                    <Calendar
                                        onChange={handleDateChange}
                                        tileDisabled={({date}) => !isDayAvailable(date)}/> {selectedDate && (
                                        <div className="times-container">
                                            <h4>Horarios disponibles para el {selectedDate}:</h4>
                                            <div className="times-grid">
                                                {availableTimes.length > 0
                                                    ? (availableTimes.map((time) => (
                                                        <div
                                                            key={time}
                                                            className={`time-card ${selectedTime === time
                                                            ? "selected"
                                                            : ""}`}
                                                            onClick={() => handleTimeSelect(time)}>
                                                            {time}
                                                        </div>
                                                    )))
                                                    : (
                                                        <p>No hay horarios disponibles para esta fecha.</p>
                                                    )}
                                            </div>
                                            <button
                                                className="reserve-button"
                                                disabled={!selectedTime}
                                                onClick={handleReserveClick}>
                                                Reservar ahora
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {showConfirmation && (
                                    <div className="confirmation-popup">
                                        <div className="popup-content">
                                            <h4 className="text-center">Confirmar Reserva</h4>
                                            <p>Servicio: {selectedService.service.name}</p>
                                            <p>Día seleccionado: {selectedDate}</p>
                                            <p>Hora seleccionada: {selectedTime}</p>
                                            <div className="popup-buttons">
                                                <button onClick={handleConfirmReservation} className="confirm-button">
                                                    Confirmar reserva
                                                </button>
                                                <button onClick={handleClosePopup} className="cancel-button">
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </Container>
                )
    } 
    </>
  );
};

export default NewBooking;