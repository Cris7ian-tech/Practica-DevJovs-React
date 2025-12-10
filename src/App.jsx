import { useState } from 'react'

import Header from './components/Header'
import FiltroCentarl from './components/FiltroCentarl'
import Paginacion from './components/Paginacion'
import Footer from './components/Footer'


function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5

  const handlePageChange = (page) => {
    console.log(`Navegando a la página ${page}`);
    setCurrentPage(page);
  }
  
  return (
    <>
    <Header />
    <main>
      <FiltroCentarl />
      <Paginacion currentPage={currentPage} totalPages={5} onPageChange={handlePageChange}/>
    </main>
    <Footer />
    </>
  )
}

export default App
