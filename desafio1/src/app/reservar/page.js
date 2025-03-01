'use client'; 

import { useState, useEffect } from 'react';
import styles from '../../styles/reservar.css';

export default function Reservar() {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [citas, setCitas] = useState([]);
  const [mensaje, setMensaje] = useState('');

  
  const esFechaValida = (fecha) => {
    const fechaActual = new Date();
    const fechaSeleccionada = new Date(fecha);
    return fechaSeleccionada >= fechaActual;
  };

  
  const handleReserva = (e) => {
    e.preventDefault();

    if (!esFechaValida(fecha)) {
      setMensaje('La fecha seleccionada ya ha pasado. Por favor, elige una fecha futura.');
      return;
    }

    const citaExistente = citas.find(
      (cita) => cita.fecha === fecha && cita.hora === hora && cita.especialidad === especialidad
    );

    if (citaExistente) {
      setMensaje('Este horario ya está ocupado. Por favor elige otro.');
    } else {
      const nuevaCita = { fecha, hora, especialidad };
      const nuevasCitas = [...citas, nuevaCita];
      setCitas(nuevasCitas);
      setMensaje('Cita reservada con éxito.');
      
      localStorage.setItem('citas', JSON.stringify(nuevasCitas));
    }
  };

  
  const handleCancelar = (citaACancelar) => {
    const citaPasada = new Date(citaACancelar.fecha) < new Date();

    if (citaPasada) {
      setMensaje('No puedes cancelar una cita pasada.');
      return;
    }

    const citasRestantes = citas.filter((cita) => cita !== citaACancelar);
    setCitas(citasRestantes);
    setMensaje('Cita cancelada con éxito.');
   
    localStorage.setItem('citas', JSON.stringify(citasRestantes));
  };


  useEffect(() => {
    const citasGuardadas = JSON.parse(localStorage.getItem('citas'));
    if (citasGuardadas) {
      setCitas(citasGuardadas);
    }
  }, []);

  return (
    <div>
    <div className="container">
      <h2>Reservar una Cita</h2>
      <form className="form" onSubmit={handleReserva}>
        <div>
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="hora">Hora:</label>
          <input
            type="time"
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="especialidad">Especialidad:</label>
          <select
            id="especialidad"
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
            required
          >
            <option value="">Seleccione una especialidad</option>
            <option value="Cardiología">Cardiología</option>
            <option value="Pediatría">Pediatría</option>
            <option value="Odontología">Odontología</option>
            <option value="Dermatología">Dermatología</option>
          </select>
        </div>
        <button type="submit">Reservar Cita</button>
      </form>

      {mensaje && <p>{mensaje}</p>}

      <h3>Resumen de Citas Agendadas</h3>
      <form className="form resumen">
        {citas.length > 0 ? (
          <ul>
            {citas.map((cita, index) => (
              <li key={index}>
                {cita.fecha} - {cita.hora} - {cita.especialidad}
                <button className="cancel" onClick={() => handleCancelar(cita)}>
                  Cancelar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes citas agendadas.</p>
        )}
      </form>
    </div>
    </div>
  );
}
