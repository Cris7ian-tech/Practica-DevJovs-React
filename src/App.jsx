
import Header from './components/Header'
import Footer from './components/Footer' // Corregida las ruta
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage';
import { Routes, Route } from 'react-router-dom';

function App() {

  
  return (
    <>
    
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/search" element={<SearchPage />}/>
      </Routes>
      <Footer />
    
    </>
  );
}

export default App;
