import { useState } from 'react'

import Header from './components/Header'
import FiltroCentarl from './components/FiltroCentarl'
import Paginacion from './components/Paginacion'
import Footer from './components/Footer'
import { JobListings } from "../src/components/JobListings.jsx" 
import allJobsData from "../src/data.json"




// Definimos la cantidad de trabajos a mostrar por página
const JOBS_PER_PAGE = 5;




function App() {

  const [textToFilter, setToFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  //1-Filtrado de trabajos por palabra clave
  const jobsWithTextFilter = textToFilter === "" 
  ? allJobsData : allJobsData.filter(job => {
    return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())  
  })

  // 2-Paginacion
  const totalJobs = jobsWithTextFilter.length;
  const totalPages = Math.ceil(totalJobs / JOBS_PER_PAGE);

  // 3- Cálculo del Subconjunto de Datos (Slicing)
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  // Obtenemos solo los trabajos para la página actual
  const jobsOnPage = jobsWithTextFilter.slice(startIndex, endIndex);
  
  const handlePageChange = (page) => {
    console.log(`Navegando a la página ${page}`);
    setCurrentPage(page);
  }

  const handleSearch = () => {
    
  }

  const handleTextFilter = (newTextToFilter) => {
    setToFilter(newTextToFilter)
    setCurrentPage(1)
  }






  
  return (
    <>
    <Header />
      <main>
        <FiltroCentarl onTextFilter={handleTextFilter}/>
        
        {/* Renderizamos el h2 y la lista de trabajos */}
        <section>
            <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>
            {/* ⬅️ Pasar solo los trabajos de la página actual */}
            <JobListings jobs={jobsOnPage} /> 

            {/* ⬅️ Renderizar la barra de paginación */}
            <Paginacion 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange}
            />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
