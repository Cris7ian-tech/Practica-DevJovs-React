import Header from './components/Header'
import FiltroCentarl from './components/FiltroCentarl'
import Paginacion from './components/Paginacion'
import Footer from './components/Footer'


function App() {
  
  return (
    <>
    <Header />
    <main>
      <FiltroCentarl />
      <Paginacion />
    </main>
    <Footer />
    </>
  )
}

export default App
