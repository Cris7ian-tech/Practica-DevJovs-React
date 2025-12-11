import Header from './components/Header'
import Footer from './components/Footer' // Corregida la ruta
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import NotFoundPage from './pages/404'


function App() {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>
  );
}

export default App;
