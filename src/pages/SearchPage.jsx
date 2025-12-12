
import { useEffect, useState } from 'react'
import Paginacion from '../components/Paginacion'
import FiltroCentral from '../components/FiltroCentral' 
import JobListings from '../components/JobListings' 
import allJobsData from '../data.json' 
// Definimos la cantidad de trabajos a mostrar por página
const JOBS_PER_PAGE = 5;

function SearchPage() {
  // Guardamos Filtros: Estado unificado para todos los criterios de filtrado
  const [filters, setFilters] = useState({
    text: "",
    technology: "",
    location: "",
    level: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  // 1- Funcion de Filtrado Maestra
  const getFilteredJobs = (jobs) => {
    let filtered = jobs;

    // A) Filtro por Texto
    if (filters.text) {
      const searchText = filters.text.toLowerCase();
      filtered = filtered.filter((job) =>
        job.titulo.toLowerCase().includes(searchText)
      );
    }

    //B) filtro por tecmologia
    if (filters.technology) {
      filtered = filtered.filter(
        (job) => job.data.technology === filters.technology
      );
    }

    // C) Filtro por Ubicacion
    if (filters.location) {
      filtered = filtered.filter(
        (job) => job.data.modalidad === filters.location
      );
    }

    // D) Filtro por Nivel
    if (filters.level) {
      filtered = filtered.filter((job) => job.data.nivel === filters.level);
    }

    return filtered;
  };

  // 2-  Obtenemos Lista final de trabajos Filtrados
  const jobsFiltered = getFilteredJobs(allJobsData);

  // 3- Paginacion y Slicing
  const totalJobs = jobsFiltered.length;
  const totalPages = Math.ceil(totalJobs / JOBS_PER_PAGE);

  // a) Cálculo del Subconjunto de Datos (Slicing)
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  // Obtenemos solo los trabajos para la página actual
  const jobsOnPage = jobsFiltered.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    console.log(`Navegando a la página ${page}`);
    setCurrentPage(page);
  };

  // 4- HANDLER UNIFICADO para todos los cambios de filtro
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
    setCurrentPage(1); // Reiniciar la página al cambiar el filtro
  };


// USE EFFECT -> operaciones que afectan a algo que esta fuera del componente
  useEffect(() => {
    document.title = `Resultados: ${jobsFiltered.length} - Page ${currentPage} - DevJovs`;
  }, [jobsFiltered ,currentPage]); //Aqui cambiamos titulo de la pestaña al ir a page /search

  // Pasamos funcion unificada al componente Filtro

  return (
    <>
      <main>
        <FiltroCentral onFilterChange={handleFilterChange} />

        {/* Renderizamos el h2 y la lista de trabajos */}
        <section>
          <h2 style={{ textAlign: "center" }}>
            Resultados de búsqueda ({totalJobs})
          </h2>
          {/* Pasar solo los trabajos de la página actual */}
          <JobListings jobs={jobsOnPage} />
          {totalJobs > 0 && ( // Solo mostrar paginación si hay trabajos
            <Paginacion
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </section>
      </main>
    </>
  );
}

export default SearchPage
