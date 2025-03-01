'use client'; 
import { useState, useEffect } from 'react';

export default function Citas() {
  const [citas, setCitas] = useState([]);

  
  useEffect(() => {
    const citasGuardadas = JSON.parse(localStorage.getItem('citas'));
    if (citasGuardadas) {
      setCitas(citasGuardadas);
    }
  }, []);

  return (
    <div>
      
      <br></br>
      <br></br>
      <div className="container">
        <h2>Citas Agendadas</h2>

        
        <form className="form">
          
          {citas.length > 0 ? (
            <ul>
              {citas.map((cita, index) => (
                <li key={index}>
                  {cita.fecha} - {cita.hora} - {cita.especialidad}
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
