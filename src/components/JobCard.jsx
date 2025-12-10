//Crear primer componente JobCard
//Importar a App.jsx
import { useState } from 'react'


function JobCard ( {data, titulo, empresa, ubicacion, descripcion} ) {
      const [isApplied, setIsApplied] = useState(false)
      
      function handleClick(){
        setIsApplied(!isApplied)
      }

      const text = isApplied ? "Aplicado" : "Aplicar";
      const buttonClass= isApplied ? "is-applied" : "";
      
      return (
        <article 
        className="job-listing-card"
        data-modalidad={data?.modalidad}
        data-technology={data?.technology}
        data-nivel={data?.nivel}
        >
          <div>
            <h3>{titulo}</h3>
            <small>{empresa} | {ubicacion}</small>
            <p>{descripcion}</p>
          </div>
          <button 
          disabled={isApplied}
          className={`button-apply-job ${buttonClass}`}
          onClick={handleClick}>
            {text}
          </button>
        </article>
      )
    }

export default JobCard