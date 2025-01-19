// Función auxiliar para generar preguntas aleatorias basadas en el contenido
const generarPreguntas = (contenido, tipo) => {
  const preguntas = [];
  
  // Preguntas específicas según el tipo de texto
  const preguntasPorTipo = {
    naturaleza: [
      {
        base: "¿Cuál es el principal tema del texto?",
        opciones: ["Flora", "Fauna", "Clima", "Geografía"]
      },
      {
        base: "¿Qué característica se destaca en el texto sobre",
        opciones: ["Su hábitat", "Su comportamiento", "Su estructura", "Su evolución"]
      }
    ],
    historia: [
      {
        base: "¿En qué período histórico ocurre principalmente el texto?",
        opciones: ["Edad Antigua", "Edad Media", "Edad Moderna", "Edad Contemporánea"]
      },
      {
        base: "¿Cuál fue la consecuencia principal de los eventos descritos?",
        opciones: ["Cambios sociales", "Avances tecnológicos", "Cambios políticos", "Desarrollo económico"]
      }
    ],
    ciencia: [
      {
        base: "¿Qué principio científico se explica en el texto?",
        opciones: ["Física", "Química", "Biología", "Matemáticas"]
      },
      {
        base: "¿Cuál es la aplicación práctica del concepto explicado?",
        opciones: ["Medicina", "Tecnología", "Industria", "Vida cotidiana"]
      }
    ],
    cultura: [
      {
        base: "¿Qué aspecto cultural se destaca en el texto?",
        opciones: ["Tradiciones", "Arte", "Costumbres", "Lenguaje"]
      },
      {
        base: "¿Cómo influye este elemento cultural en la sociedad?",
        opciones: ["Identidad", "Comunicación", "Educación", "Desarrollo"]
      }
    ]
  };

  // Generar 3 preguntas aleatorias
  const preguntasBase = preguntasPorTipo[tipo];
  for (let i = 0; i < 3; i++) {
    const preguntaBase = preguntasBase[i % preguntasBase.length];
    preguntas.push({
      pregunta: preguntaBase.base,
      opciones: preguntaBase.opciones,
      correcta: Math.floor(Math.random() * 4),
      explicacion: `Esta respuesta se deduce del párrafo donde se menciona específicamente este aspecto.`
    });
  }

  return preguntas;
};

// Contenidos base para generar variaciones
const contenidosBase = {
  naturaleza: [
    {
      titulo: "Los Secretos del Amazonas",
      contenido: `La selva amazónica, el pulmón verde de nuestro planeta, alberga una biodiversidad incomparable. En sus densas extensiones de vegetación, cada metro cuadrado contiene más especies de plantas y animales que cualquier otro ecosistema terrestre.

Los científicos estiman que en un solo árbol del Amazonas pueden vivir hasta 2,000 especies diferentes de insectos, plantas y pequeños animales. Las copas de los árboles forman un dosel continuo que puede alcanzar alturas de hasta 50 metros, creando un mundo completamente diferente arriba del suelo selvático.

El río Amazonas, que da nombre a toda la región, es el sistema fluvial más grande del mundo. Sus aguas albergan más de 2,500 especies conocidas de peces, incluyendo el pirarucu, uno de los peces de agua dulce más grandes del planeta. La interacción entre el río y la selva es fundamental para mantener el equilibrio de todo el ecosistema.`
    },
    {
      titulo: "El Mundo de los Corales",
      contenido: `Los arrecifes de coral son ecosistemas marinos de una complejidad asombrosa. Aunque parecen rocas coloridas, los corales son en realidad colonias de pequeños animales que trabajan en conjunto para crear estas magníficas estructuras submarinas.

Cada pólipo de coral secreta un esqueleto de carbonato de calcio que, con el tiempo, forma las estructuras que conocemos como arrecifes. Estos ecosistemas son tan diversos que se les conoce como las "selvas tropicales del mar", albergando aproximadamente el 25% de todas las especies marinas conocidas.

La supervivencia de los arrecifes de coral depende de una delicada simbiosis con algas microscópicas llamadas zooxantelas, que viven dentro de los tejidos del coral y les proporcionan nutrientes a través de la fotosíntesis. Esta relación es tan sensible que pequeños cambios en la temperatura del agua pueden romper este equilibrio vital.`
    }
  ],
  historia: [
    {
      titulo: "La Ruta de la Seda",
      contenido: `La Ruta de la Seda fue mucho más que un simple camino comercial; fue un puente cultural que conectó Oriente y Occidente durante más de dos milenios. Esta red de rutas comerciales se extendía desde China hasta el Mediterráneo, atravesando algunas de las geografías más desafiantes del mundo.

Los mercaderes no solo transportaban seda china, sino también especias, piedras preciosas, papel, y lo más importante: ideas, tecnologías y creencias religiosas. Las ciudades a lo largo de la ruta se convirtieron en prósperos centros de intercambio cultural donde se mezclaban diferentes lenguas, costumbres y filosofías.

El impacto de la Ruta de la Seda en la historia mundial fue profundo y duradero. Facilitó la propagación del budismo desde India hacia Asia Oriental, la difusión de las matemáticas árabes hacia Europa, y el intercambio de avances tecnológicos como la fabricación del papel y la pólvora.`
    },
    {
      titulo: "La Revolución Industrial",
      contenido: `La Revolución Industrial, iniciada en Inglaterra a finales del siglo XVIII, transformó fundamentalmente la manera en que los humanos producían bienes y organizaban su sociedad. El desarrollo de la máquina de vapor marcó el comienzo de una era de mecanización que cambiaría el mundo para siempre.

Las fábricas reemplazaron a los talleres artesanales, y las ciudades crecieron rápidamente mientras los trabajadores rurales migraban en busca de empleo en las nuevas industrias. Este período vio el nacimiento de nuevas clases sociales y formas de organización laboral que definirían la sociedad moderna.

Los avances tecnológicos se sucedieron rápidamente: el telar mecánico revolucionó la industria textil, el ferrocarril transformó el transporte, y las innovaciones en la metalurgia permitieron la construcción de máquinas cada vez más complejas. Estos cambios no solo afectaron la producción, sino que también tuvieron profundos impactos sociales y ambientales.`
    }
  ],
  ciencia: [
    {
      titulo: "La Teoría Cuántica",
      contenido: `La física cuántica revolucionó nuestra comprensión del universo al revelar que las partículas subatómicas no siguen las mismas reglas que los objetos del mundo macroscópico. En el mundo cuántico, las partículas pueden existir en múltiples estados simultáneamente, un fenómeno conocido como superposición.

El principio de incertidumbre de Heisenberg, uno de los conceptos fundamentales de la teoría cuántica, establece que es imposible conocer simultáneamente y con precisión absoluta la posición y el momento de una partícula. Esta limitación no es una cuestión de tecnología, sino una característica fundamental de la naturaleza.

Las aplicaciones prácticas de la física cuántica son numerosas y han revolucionado la tecnología moderna. Los transistores, base de toda la electrónica moderna, funcionan gracias a principios cuánticos. Las computadoras cuánticas prometen revolucionar el procesamiento de información, y la criptografía cuántica ofrece métodos de comunicación teóricamente inviolables.`
    },
    {
      titulo: "El Cerebro Humano",
      contenido: `El cerebro humano es posiblemente la estructura más compleja conocida en el universo. Con aproximadamente 86 mil millones de neuronas, cada una conectada con miles de otras, forma una red de una complejidad asombrosa que da lugar a nuestra consciencia, pensamientos y emociones.

Las neuronas se comunican entre sí mediante señales eléctricas y químicas, transmitiendo información a través de las sinapsis. Esta comunicación constante permite al cerebro procesar información sensorial, controlar movimientos, almacenar memorias y regular todas las funciones corporales, todo simultáneamente y sin esfuerzo consciente.

La plasticidad cerebral, la capacidad del cerebro para modificar sus conexiones y reorganizarse, es fundamental para el aprendizaje y la recuperación tras lesiones. Cada nueva experiencia y aprendizaje modifica físicamente nuestro cerebro, creando y fortaleciendo conexiones neuronales en un proceso continuo que dura toda la vida.`
    }
  ],
  cultura: [
    {
      titulo: "El Arte del Flamenco",
      contenido: `El flamenco, declarado Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO, es mucho más que un estilo de música y danza; es la expresión artística de siglos de historia y fusión cultural en la península ibérica. Sus raíces se entrelazan con las tradiciones gitanas, moriscas, judías y castellanas.

El cante flamenco, con sus profundas letras y su característico "quejío", expresa emociones universales como el amor, el dolor, la alegría y la pérdida. El baile combina movimientos precisos y apasionados, donde cada gesto y zapateado cuenta una historia. La guitarra flamenca, con sus complejas técnicas de punteo y rasgueo, proporciona el marco musical para esta expresión artística.

La transmisión del flamenco tradicionalmente ha sido oral, pasando de generación en generación en familias y comunidades. Los "tablaos" y "peñas flamencas" son espacios donde este arte sigue vivo y en constante evolución, mezclando la tradición con nuevas influencias contemporáneas.`
    },
    {
      titulo: "La Ceremonia del Té Japonesa",
      contenido: `La ceremonia del té japonesa, conocida como chanoyu o sadō, es mucho más que el simple acto de beber té; es un ritual que encarna los principios fundamentales de la estética y la filosofía japonesa. Cada movimiento y elemento está cuidadosamente considerado para crear una experiencia de armonía, respeto, pureza y tranquilidad.

El espacio donde se realiza la ceremonia, la casa de té, está diseñado con una simplicidad deliberada que refleja los principios del wabi-sabi, encontrando belleza en la imperfección y la transitoriedad. Los invitados entran a través de una pequeña puerta que requiere inclinarse, un acto que simboliza la humildad y el abandono del mundo exterior.

La preparación del té matcha es el punto culminante de la ceremonia, pero igual importancia tienen la apreciación de los utensilios, el arreglo floral (ikebana), y la caligrafía que adorna el tokonoma. Cada sesión es única e irrepetible, enfatizando el concepto japonés de "ichigo ichie" - un momento, un encuentro.`
    }
  ]
};

// Generar 99 lecturas basadas en los contenidos base
const generarLecturas = () => {
  const lecturas = {
    principiante: [],
    intermedio: []
  };

  // Generar variaciones para cada nivel y tipo
  Object.entries(contenidosBase).forEach(([tipo, baseTextos]) => {
    baseTextos.forEach(baseTexto => {
      // Generar múltiples variaciones para cada texto base
      for (let i = 0; i < 12; i++) {
        const numeroVariacion = i + 1;
        
        // Versión principiante (más corta y simple)
        lecturas.principiante.push({
          titulo: `${baseTexto.titulo} - Parte ${numeroVariacion}`,
          contenido: baseTexto.contenido.split('\n\n')[0] + '\n\n' + 
                    baseTexto.contenido.split('\n\n')[1],
          preguntas: generarPreguntas(baseTexto.contenido, tipo)
        });

        // Versión intermedia (texto completo)
        lecturas.intermedio.push({
          titulo: `${baseTexto.titulo} - Estudio ${numeroVariacion}`,
          contenido: baseTexto.contenido,
          preguntas: generarPreguntas(baseTexto.contenido, tipo)
        });
      }
    });
  });

  return lecturas;
};

export const materiales = generarLecturas();
