import { useState } from 'react'

import Header from './components/Header'
import FiltroCentarl from './components/FiltroCentarl'
import Paginacion from './components/Paginacion'
import Footer from './components/Footer'
import { JobListings } from "../src/components/JobListings.jsx" 
import allJobsData from "../src/data.json"

// Definimos la cantidad de trabajos por página
const JOBS_PER_PAGE = 5;

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  

  // 1. Lógica de Paginación
  const totalJobs = allJobsData.length;
  const totalPages = Math.ceil(totalJobs / JOBS_PER_PAGE);

  // 2. Cálculo del Subconjunto de Datos (Slicing)
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  // Obtenemos solo los trabajos para la página actual
  const jobsOnPage = allJobsData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    console.log(`Navegando a la página ${page}`);
    setCurrentPage(page);
  }
  
  return (
    <>
    <Header />
      <main>
        <FiltroCentarl />
        
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
