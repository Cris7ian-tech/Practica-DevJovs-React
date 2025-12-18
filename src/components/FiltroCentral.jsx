import { useState, useEffect } from "react";


// CORRECCIÓN: Ahora solo recibe onFilterChange como prop principal
const FiltroCentral = ( {onFilterChange, currentFilters} ) => {
  //1-Estado local para el valor del input (para que sea instantáneo al escribir)
  const [inputValue, setInputValue] = useState(currentFilters.text);

  // 2- EFECTO: Sincronizar el input si el filtro global cambia
  useEffect(() => {
    setInputValue(currentFilters.text);
  }, [currentFilters.text]);

  //3- Efecto Debounce
  useEffect(() => {
    //si el valor local es igual al del filtro global, no hacemos nada
    if (inputValue === currentFilters.text) return;
    
    //creamos temporizador de 300ms
    const timeoutId = setTimeout(() => {
      onFilterChange("text", inputValue);
    }, 300);

    //funcion paralimpiar el temporizador
    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue, currentFilters.text, onFilterChange]);
  
  // 4- Manejador para el texto (solo actualiza el estado LOCAL)
  const handleLocalTextChange = (event) => {
    setInputValue(event.target.value); // Actualiza solo el estado LOCAL (rápido)
  };

  //5- Manejador para LIMPIAR el input (instantáneo)
  const handleClearInput = () => {
    // Limpiamos el estado local inmediatamente para feedback visual
    setInputValue(""); 
    // 🚨 IMPORTANTE: Al limpiar, enviamos el cambio DIRECTAMENTE al padre, 
    // saltándonos el debounce. Si el usuario quiere borrar, lo quiere YA.
    onFilterChange("text", ""); 
  };
  // 6- Manejador para los Selectores
  const handleSelectChange = (event) => {
    const {name, value} = event.target // obtiene el nombre del select: "technology", "location", "level"
    // a) Llama a App.jsx para actualizar el filtro especifico
    onFilterChange(name, value)
  };

  // Usaremos el handleSubmit (Botón Buscar) solo para forzar una búsqueda
  // pero es más común que los selectores filtren al instante.
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Filtros listos para ser aplicados/enviados.");
  }



  // Usaremos nombres claros para los selects, sin useId, ya que los usaremos en handleSelectChange

  return (
    <>

    <section className="jobs-search">
        <h1>Encuentra tu próximo trabajo</h1>
        <p>Explora miles de oportunidades en el sector tecnológico.</p>

        <form onSubmit={handleSubmit} id="empleos-search-form" role="search">
          <div className="search-bar" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-search">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
            
              <input 
                name="text" 
                id="empleos-search-input" required 
                type="text"
                placeholder="Buscar trabajos, empresas o habilidades"
                onChange={handleLocalTextChange} //filtro de texto instantaneo
                value={inputValue} //Conectado al estado local
              />

              {/*BOTÓN DE LIMPIAR (Condicional) */}
              {inputValue && (
                <button
                    type="button" // IMPORTANTE: type="button" evita que envíe el formulario
                    onClick={handleClearInput}
                    aria-label="Limpiar búsqueda"
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        position: 'absolute', // Lo posicionamos sobre el input
                        right: '10px',        // Pegado a la derecha
                        display: 'flex',
                        alignItems: 'center',
                        color: '#999' // Un color gris suave para que no compita con la lupa
                    }}
                >
                  {/* Icono de X (SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
          )}
          </div>

          <div className="search-filters">
            {/* El nombre del select debe coincidir con la clave del estado en App.jsx (technology) */}
            <select 
            name="technology" 
            id="filter-technology" 
            onChange={handleSelectChange}
            value={currentFilters.technology}
            >
              <option value="">Tecnología</option>
              <optgroup label="Tecnologías populares">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="react">React</option>
                <option value="nodejs">Node.js</option>
              </optgroup>
              <option value="java">Java</option>
              <hr />
              <option value="csharp">C#</option>
              <option value="c">C</option>
              <option value="c++">C++</option>
              <hr />
              <option value="ruby">Ruby</option>
              <option value="php">PHP</option>
            </select>

            {/* Nombre del select debe ser 'location' */}
            <select 
            name="location" 
            id="filter-location" 
            onChange={handleSelectChange}>
              <option value="">Ubicación</option>
              <option value="remoto">Remoto</option>
              <option value="cdmx">Ciudad de México</option>
              <option value="guadalajara">Guadalajara</option>
              <option value="monterrey">Monterrey</option>
              <option value="barcelona">Barcelona</option>
            </select>

            {/* Nombre del select debe ser 'level' */}
            <select 
            name="level" 
            id="filter-experience-level" 
            onChange={handleSelectChange}>
              <option value="">Nivel de experiencia</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
            </select>
          </div>
        </form>

        <span id="filter-selected-value" 
        style={{
          marginTop: "2rem", 
          color:" #6498ec",
          fontWeight: "bold",
          fontSize: "1.35rem"
        }}>

        </span>
      </section>
    </>
  )
}

export default FiltroCentral