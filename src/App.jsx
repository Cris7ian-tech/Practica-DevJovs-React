import Header from './components/Header'
import Footer from './components/Footer' // Corregida la ruta
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import NotFoundPage from './pages/404'


function App() {
  const currentPath = window.location.pathname; //identificar path actual, en que page estoy
  
  let page = <NotFoundPage /> //page por defecto, si no encuentra ninguna page -> 404
  if (currentPath === "/") {
    page = <HomePage />
  } else if (currentPath === "/search") {
    page = <SearchPage />
  }


  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
}

export default App;
