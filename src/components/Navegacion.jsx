import { Link } from 'react-router-dom';

export default function Navegacion() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Tutor de Lectura</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">Chat</Link>
          <Link to="/lectura" className="hover:text-blue-200">Lectura</Link>
          <Link to="/progreso" className="hover:text-blue-200">Progreso</Link>
        </div>
      </div>
    </nav>
  );
}
