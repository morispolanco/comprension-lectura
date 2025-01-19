import { useState } from 'react';
import useStore from '../store';
import { materiales } from '../data/lecturas';

export default function MaterialLectura() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [lecturaCompletada, setLecturaCompletada] = useState(false);
  
  const nivelLectura = useStore((state) => state.nivelLectura);
  const lecturaActual = useStore((state) => state.lecturaActual);
  const setLecturaActual = useStore((state) => state.setLecturaActual);
  const actualizarProgreso = useStore((state) => state.actualizarProgreso);

  // Asegurarse de que tenemos las lecturas disponibles
  const materialesNivel = materiales[nivelLectura] || [];
  const lecturaActualData = materialesNivel[lecturaActual] || materialesNivel[0];

  // Si no hay lectura actual, mostrar mensaje de error
  if (!lecturaActualData) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
        <p className="text-red-600">Error: No se encontraron lecturas disponibles.</p>
      </div>
    );
  }

  const preguntasActuales = lecturaActualData.preguntas;
  const preguntaActualData = preguntasActuales[preguntaActual];

  const handleRespuesta = (index) => {
    const esCorrecta = preguntaActualData.correcta === index;
    const nuevasRespuestas = [...respuestas, { 
      pregunta: preguntaActualData.pregunta,
      respuestaUsuario: preguntaActualData.opciones[index],
      correcta: esCorrecta,
      explicacion: preguntaActualData.explicacion
    }];
    
    setRespuestas(nuevasRespuestas);
    setMostrarFeedback(true);

    if (esCorrecta) {
      actualizarProgreso({ 
        comprension: Math.min(100, Math.random() * 20 + 80) 
      });
    }

    setTimeout(() => {
      setMostrarFeedback(false);
      if (preguntaActual < preguntasActuales.length - 1) {
        setPreguntaActual(preguntaActual + 1);
      } else {
        setLecturaCompletada(true);
      }
    }, 2000);
  };

  const calcularPuntuacion = () => {
    const correctas = respuestas.filter(r => r.correcta).length;
    return Math.round((correctas / preguntasActuales.length) * 100);
  };

  const intentarNuevaLectura = () => {
    const totalLecturas = materialesNivel.length;
    let nuevaLectura;
    do {
      nuevaLectura = Math.floor(Math.random() * totalLecturas);
    } while (nuevaLectura === lecturaActual && totalLecturas > 1);
    
    setLecturaActual(nuevaLectura);
    setPreguntaActual(0);
    setRespuestas([]);
    setMostrarFeedback(false);
    setLecturaCompletada(false);
  };

  if (lecturaCompletada) {
    const puntuacion = calcularPuntuacion();
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">¡Lectura Completada!</h2>
          
          <div className="mb-6">
            <div className="text-xl mb-4">
              Tu puntuación: <span className="font-bold text-blue-600">{puntuacion}%</span>
            </div>
            <div className={`text-lg ${puntuacion >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
              {puntuacion >= 70 
                ? '¡Excelente trabajo! Has demostrado una buena comprensión del texto.'
                : 'Buen intento. Te sugerimos releer el texto y volver a intentarlo.'}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Repaso de respuestas:</h3>
            {respuestas.map((respuesta, index) => (
              <div key={index} className={`p-4 rounded-lg ${
                respuesta.correcta ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <p className="font-bold mb-2">{respuesta.pregunta}</p>
                <p className="mb-2">Tu respuesta: {respuesta.respuestaUsuario}</p>
                <p className="text-sm">{respuesta.explicacion}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={intentarNuevaLectura}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Intentar otra lectura
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {lecturaActualData.titulo}
          </h2>
          <span className="text-sm text-gray-500">
            Lectura {lecturaActual + 1} de {materialesNivel.length}
          </span>
        </div>

        <div className="prose max-w-none mb-6">
          {lecturaActualData.contenido.split('\n\n').map((parrafo, i) => (
            <p key={i} className="mb-4">{parrafo}</p>
          ))}
        </div>
        
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="font-bold text-xl mb-4">
            Pregunta {preguntaActual + 1} de {preguntasActuales.length}:
          </h3>
          <p className="mb-4 text-lg">
            {preguntaActualData.pregunta}
          </p>
          <div className="space-y-3">
            {preguntaActualData.opciones.map((opcion, i) => (
              <button
                key={i}
                onClick={() => handleRespuesta(i)}
                className="w-full text-left p-3 rounded border hover:bg-blue-100 transition-colors duration-200"
                disabled={mostrarFeedback}
              >
                {opcion}
              </button>
            ))}
          </div>
          
          {mostrarFeedback && (
            <div className={`mt-4 p-4 rounded ${
              respuestas[respuestas.length - 1].correcta 
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              <p className="font-bold">
                {respuestas[respuestas.length - 1].correcta 
                  ? '¡Correcto!' 
                  : 'Incorrecto'}
              </p>
              <p>{preguntaActualData.explicacion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
