import '../styles/globals.css'; 
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <html lang="es">
      <head />
      <body>
        <header>
          <h1>Clínica de Citas Médicas</h1>
          <nav>
            <ul>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/reservar">Reservar Cita</Link></li>
              <li><Link href="/citas">Ver Citas Agendadas</Link></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <br></br>
          <p>&copy; 2025 Clínica de Citas Médicas</p>
        </footer>
      </body>
    </html>
  );
}
