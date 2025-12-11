// import { useId } from "react";


// CORRECCIÓN: Ahora solo recibe onFilterChange como prop principal
const FiltroCentral = ( {onFilterChange} ) => {



  // 1- Manejamos el input text de forma instantanea
    const handleTextChange = (event) => {
    const text = event.target.value
    //a) Envia el texto a la funcion principal y actualiza el filtro "Text"
    onFilterChange("text", text)
  };

  
  // 2- Manejar los Selectores (al cambiar un valor en un select)
  const handleSelectChange = (event) => {
    const name = event.target.name // obtiene el nombre del select: "technology", "location", "level"
    const value = event.target.value // obtiene el valor del select: "react", "javaScript"
    
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
          <div className="search-bar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-search">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
            
              <input 
                name="text" id="empleos-search-input" required type="text"
                placeholder="Buscar trabajos, empresas o habilidades"
                onChange={handleTextChange} //filtro de texto instantaneo
              />
          </div>

          <div className="search-filters">
            {/* El nombre del select debe coincidir con la clave del estado en App.jsx (technology) */}
            <select name="technology" id="filter-technology" onChange={handleSelectChange}>
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
            <select name="location" id="filter-location" onChange={handleSelectChange}>
              <option value="">Ubicación</option>
              <option value="remoto">Remoto</option>
              <option value="cdmx">Ciudad de México</option>
              <option value="guadalajara">Guadalajara</option>
              <option value="monterrey">Monterrey</option>
              <option value="barcelona">Barcelona</option>
            </select>

            {/* Nombre del select debe ser 'level' */}
            <select name="level" id="filter-experience-level" onChange={handleSelectChange}>
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