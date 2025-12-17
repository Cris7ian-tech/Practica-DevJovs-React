import { useEffect, useState, useMemo } from 'react'
import Paginacion from '../components/Paginacion'
import FiltroCentral from '../components/FiltroCentral' 
import JobListings from '../components/JobListings' 
import { useSearchParams } from 'react-router-dom';


// =========================================================
// FUNCIONES AUXILIARES (DEBEN IR FUERA DEL COMPONENTE)
// =========================================================

// 1 - Función de utilidad para eliminar acentos (DEBE IR AQUÍ, AL PRINCIPIO DEL ARCHIVO)
const normalizeString = (str) => {
    // Verificamos si str es null, undefined, o no es un string. 
    if (typeof str !== 'string' || !str) {
        return '';
    }
    // Aseguramos que solo se use .normalize() en un string válido
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

// 2- Funcion de Filtrado Maestra
const getFilteredJobs = (jobs, filters) => {
  let filtered = jobs;


  // A) Filtro por Texto
  if (filters.text) {
        const searchText = normalizeString(filters.text);
        
        filtered = filtered.filter((job) => {
            
            // Normalizamos todos los campos antes de buscar
            const matchInTitle = normalizeString(job.titulo).includes(searchText);
            const matchInDescription = normalizeString(job.descripcion).includes(searchText);
            const matchInCompany = normalizeString(job.empresa).includes(searchText);
            const matchInUbicacion = normalizeString(job.ubicacion).includes(searchText);
            
            return matchInTitle || matchInDescription || matchInCompany || matchInUbicacion;
        });
    }
  

  //B) filtro por tecmologia
  if (filters.technology) {
      // 1. Convertir el filtro a minúsculas
      const filterValue = filters.technology.toLowerCase();
      
      filtered = filtered.filter(
        // 2. Usar Array.includes() para ver si la tecnología está en el array del job
        (job) => job.data.technology.includes(filterValue)
      );
    }

  // C) Filtro por Ubicacion
  if (filters.location) {
    const filterValue = normalizeString(filters.location);
    filtered = filtered.filter(
      (job) => normalizeString(job.data.modalidad) === filterValue
      );
    }

  // D) Filtro por Nivel
  if (filters.level) {
    const filterValue = normalizeString(filters.level);
    filtered = filtered.filter(
        (job) => normalizeString(job.data.nivel) === filterValue
    );
  }
  
  return filtered;

};

//////////////////////////////////////////////////////////////////

// Definimos la cantidad de trabajos a mostrar por página
const JOBS_PER_PAGE = 5;

function SearchPage() {
  const [jobsData, setJobsData] = useState([]); // Donde guardamos los datos completos de la API
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  // Guardamos Filtros: Estado unificado para todos los criterios de filtrado
  const [filters, setFilters] = useState({
    text: searchParams.get("text") || "",
    technology: searchParams.get("technology") || "",
    location: searchParams.get("location") || "",
    level: searchParams.get("level") || "",
  });


  //EFECTO PARA EL FETCH (Se ejecuta solo al montar: [])
  useEffect(() => {
    async function fetchJobs() {
      try {
        //usamos setLoading(true) para indicar que estamos cargando los datos
        setLoading(true);
        const response = await fetch("https://jscamp-api.vercel.app/api/jobs");
        const json = await response.json();
        // Guardamos los datos completos en jobsData (que antes era allJobsData)
        setJobsData(json.data);
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  // Integrar useMemo
  //  Uso de useMemo con la función externa
    const { totalJobs, totalPages, jobsOnPage } = useMemo(() => {
        
        // ➡️ Llama a la función que definiste arriba, pasándole los estados:
        const filtered = getFilteredJobs(jobsData, filters); 
        
        // 3. Paginacion y Slicing (Esto ya lo tenías bien)
        const total = filtered.length;
        const totalPages = Math.ceil(total / JOBS_PER_PAGE);

        const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
        const endIndex = startIndex + JOBS_PER_PAGE;
        const jobsOnPage = filtered.slice(startIndex, endIndex);

        return { totalJobs: total, totalPages, jobsOnPage };

    }, [jobsData, filters, currentPage]);

    //  HANDLERS

    const handlePageChange = (page) => {
        console.log(`Navegando a la página ${page}`);
        setCurrentPage(page);
    };

    const handleFilterChange = (filterName, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
        setCurrentPage(1); // Reiniciar la página al cambiar el filtro
        
        const newSearchParams = new URLSearchParams(searchParams);

        if (value) {
            // Si hay valor, agregarlo a la URL
            newSearchParams.set(filterName, value);
        } else {
            // Si el valor es vacío (filtro deseleccionado), quitarlo de la URL
            newSearchParams.delete(filterName);
        }

        // Aplicar los nuevos parámetros a la URL
        setSearchParams(newSearchParams);
    };
    
    //  EFECTO SECUNDARIO (Título del documento)
    useEffect(() => {
        document.title = `Resultados: ${totalJobs} - Page ${currentPage} - DevJovs`;
    }, [totalJobs, currentPage]);


    //  RENDERIZADO CONDICIONAL
    if (loading) {
        return (
            <main>
                <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                    Cargando trabajos... ⏳
                </h2>
            </main>
        );
    }
    
    //  RENDERIZADO PRINCIPAL
    return (
        <>
            <main>
                <FiltroCentral onFilterChange={handleFilterChange}
                currentFilters={filters}
                />

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


export default SearchPage;

